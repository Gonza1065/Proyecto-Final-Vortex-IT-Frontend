import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/GetAppointments/GetAppointments.css";
import { CartContext } from "../../context/context";
export function GetAppointments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState(null);
  const { token, userId } = useContext(CartContext);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/appointment/get-appointments-by-patients/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setAppointments(data);
        }
      })
      .catch((err) => console.log(err));
  }, [id, token]);
  const handleClickCancelAppointment = async (appointmentId) => {
    const requestBody = {
      appointmentId: appointmentId,
      userId: userId,
    };
    const response = await fetch(
      "http://localhost:5000/api/appointment/cancel-appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(requestBody),
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
      <div className="title-get-appointments">
        <h1>Get Appointments</h1>
      </div>
      <section>
        {message ? (
          <div className="appointments-message">
            <h1>{message}</h1>
          </div>
        ) : (
          <article className="appointments">
            {appointments.map((appointment) => (
              <>
                <div className="information">
                  {appointment.status === "reserved" ? (
                    <>
                      <div className="information-appointment">
                        <h1>
                          Date:{" "}
                          <strong>
                            {appointment.day}/{appointment.month}
                          </strong>
                          <strong>, {appointment.date}</strong>
                        </h1>
                        <h1>
                          Status: <strong>{appointment.status}</strong>
                        </h1>
                      </div>
                      <div className="information-patient">
                        <h1>
                          Patient:{" "}
                          <strong>
                            {appointment.patient.name},{" "}
                            {appointment.patient.lastName}
                          </strong>
                        </h1>
                      </div>
                      <div className="information-doctor">
                        <h1>
                          Doctor:{" "}
                          <strong>
                            {appointment.doctor.name},{" "}
                            {appointment.doctor.lastName}
                          </strong>
                        </h1>
                        <h1>
                          Specialty:{" "}
                          <strong>
                            {appointment.doctor.specialty.specialty}
                          </strong>
                        </h1>
                        <div>
                          <Button
                            onClick={() =>
                              handleClickCancelAppointment(appointment._id)
                            }
                          >
                            Cancel Appointment
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    appointment.status === "cancelled" && (
                      <>
                        <div className="information-appointment">
                          <h1>
                            Date: <strong>{appointment.date}</strong>
                          </h1>
                          <h1>
                            Status: <strong>{appointment.status}</strong>
                          </h1>
                        </div>
                        <div className="information-patient">
                          <h1>
                            Patient:{" "}
                            <strong>
                              {appointment.patient.name},{" "}
                              {appointment.patient.lastName}
                            </strong>
                          </h1>
                        </div>
                        <div className="information-doctor">
                          <h1>
                            Doctor:{" "}
                            <strong>
                              {appointment.doctor.name},{" "}
                              {appointment.doctor.lastName}
                            </strong>
                          </h1>
                          <h1>
                            Specialty:{" "}
                            <strong>
                              {appointment.doctor.specialty.specialty}
                            </strong>
                          </h1>
                        </div>
                      </>
                    )
                  )}
                </div>{" "}
              </>
            ))}
          </article>
        )}
      </section>
    </>
  );
}
