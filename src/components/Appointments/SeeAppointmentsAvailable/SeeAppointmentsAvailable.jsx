import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/SeeAppointmentsAvailable/SeeAppointmentsAvailable.css";
import { CartContext } from "../../context/context";
export function SeeAppoitmentsAvailable() {
  const { id } = useParams();
  const { token } = useContext(CartContext);
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
            {appointmentsAvailable.map((appointment) => (
              <>
                <div key={appointment.id}>
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
                </div>
              </>
            ))}
          </article>
        )}
      </div>
      <div></div>
    </>
  );
}
