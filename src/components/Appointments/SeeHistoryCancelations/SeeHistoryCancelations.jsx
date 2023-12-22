import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/SeeHistoryCancelations/SeeHistoryCancelations.css";
import { CartContext } from "../../context/context";
export function SeeHistoryCancelations() {
  const [appointmentsCancelled, setAppointmentsCancelled] = useState([]);
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
      .then((data) => setAppointmentsCancelled(data))
      .catch((err) => console.log(err));
  }, [id, token]);
  return (
    <>
      <div>
        <h1>History Cancelations</h1>
      </div>
      <section className="appointments-cancelled">
        {appointmentsCancelled.map((appointment) => (
          <>
            <div className="patient">
              <h1>
                Patient: <strong>{appointment.patient.name}</strong>
              </h1>
            </div>
          </>
        ))}
      </section>
    </>
  );
}
