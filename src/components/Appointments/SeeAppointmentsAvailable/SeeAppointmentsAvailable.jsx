import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../../../componentsCSS/Appointments/SeeAppointmentsAvailable/SeeAppointmentsAvailable.css";
import { CartContext } from "../../context/context";
export function SeeAppoitmentsAvailable() {
  const navigate = useNavigate();
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
      navigate("/");
    } else {
      const data = await response.json();
      const { message } = data;
      setMessage(message);
    }
  };

  return (
    <>
      <div className="title-appointments-available">
        <h1>Appointments Available</h1>
      </div>

      <div>
        {message ? (
          <h1 className="appointments-message">{message}</h1>
        ) : (
          <article className="appointments-available">
            {appointmentsAvailable.map((appointment) => (
              <>
                <div key={`${appointment.id}`}>
                  <div>
                    <h2 className="appointment-status">
                      Status: <strong>{appointment.status}</strong>
                    </h2>
                  </div>
                  <div>
                    <h2 className="appointment-date">
                      Date:{" "}
                      <strong>
                        {appointment.day}/{appointment.month}
                      </strong>
                      <strong>, {appointment.date}</strong> hrs.
                    </h2>
                  </div>
                  <Button
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
