import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/SeeHistoryCancelations/SeeHistoryCancelations.css";
import { CartContext } from "../../context/context";
export function SeeHistoryCancelations() {
  const [appointmentsCancelled, setAppointmentsCancelled] = useState([]);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const { token } = useContext(CartContext);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/appointment/all-cancelations-by-patient/${id}`,
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
          setAppointmentsCancelled(data);
        }
      })
      .catch((err) => console.log(err));
  }, [id, token]);
  return (
    <>
      <div className="title-history-cancelations">
        <h1>History Cancelations</h1>
      </div>
      <section className="appointments-cancelled">
        {appointmentsCancelled.map((appointment) => (
          <>
            <div className="patient">
              <h1>
                Patient: <strong>{appointment.patient.lastName}</strong>,{" "}
                <strong>{appointment.patient.name}</strong>
              </h1>
              <h1>
                Date:{" "}
                <strong>
                  {appointment.day}/{appointment.month}, {appointment.date}{" "}
                </strong>{" "}
                hrs.
              </h1>
              <h1>
                Status: <strong>{appointment.status}</strong>
              </h1>
              <h1>
                Doctor:{" "}
                <strong>
                  {appointment.doctor.lastName}, {appointment.doctor.name}
                </strong>
              </h1>
              <h1>
                Specialty:{" "}
                <strong>{appointment.doctor.specialty.specialty}</strong>
              </h1>
            </div>
          </>
        ))}
      </section>
      {message && (
        <div className="see-history-cancelations-message">
          <h1>{message}</h1>
        </div>
      )}
    </>
  );
}
