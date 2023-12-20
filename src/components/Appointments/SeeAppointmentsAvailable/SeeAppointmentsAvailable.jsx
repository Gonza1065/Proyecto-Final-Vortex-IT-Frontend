import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../../componentsCSS/Appointments/SeeAppointmentsAvailable/SeeAppointmentsAvailable.css";
import { CartContext } from "../../context/context";
export function SeeAppoitmentsAvailable() {
  const { id } = useParams();
  const { token, userId } = useContext(CartContext);
  const [appointmentsAvailable, setAppointmentsAvailable] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${id}`, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setAppointmentsAvailable(data);
        }
      })
      .catch((err) => console.log(err));
  }, [id, token]);
  const appointmentId = appointmentsAvailable.map(
    (appointment) => appointment._id
  );
  const requestData = {
    userId: userId,
    appointmentId: appointmentId,
  };
  const handleClickReserveAppointment = async () => {
    const response = await fetch(
      "http://localhost:5000/api/appointment/reserve-appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(requestData),
      }
    );
    if (response.ok) {
      setAppointmentsAvailable((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === requestData.appointmentId
            ? { ...appointment, status: "reserved" }
            : appointment
        )
      );
      toast.success("Reserve Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Failed to Reserve Appointment", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="title-appointments-available">
        <h1>Appointments Available</h1>
      </div>
      {appointmentsAvailable.map((appointment) => (
        <>
          <div className="subtitle-specialty" key={appointment.doctorId._id}>
            <h1>{appointment.doctorId.specialty.specialty}</h1>
          </div>
        </>
      ))}
      <div>
        {message ? (
          <h1 className="appointments-message">{message}</h1>
        ) : (
          <article className="appointments-available">
            {appointmentsAvailable.map((appointment, index) => (
              <>
                <div key={`${appointment.id}-${index}`}>
                  <div>
                    <h2 className="appointment-status">
                      Status: <strong>{appointment.status}</strong>
                    </h2>
                  </div>
                  <div>
                    <h2 className="appointment-date">
                      Date: <strong>{appointment.date}</strong>
                    </h2>
                  </div>
                  <Button
                    color="white"
                    component={Link}
                    onClick={handleClickReserveAppointment}
                  >
                    Reserve Appointment
                  </Button>
                </div>
              </>
            ))}
          </article>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
