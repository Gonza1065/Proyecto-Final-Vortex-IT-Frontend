import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/SeeAppointmentsByPatient/SeeAppointmentsByPatient.css";
import { CartContext } from "../../context/context";
export function SeeAppointmentsByPatient() {
  const [usersPatients, setUsersPatients] = useState([]);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const { token } = useContext(CartContext);
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
          setUsersPatients(data);
        }
      })
      .catch((err) => console.log(err));
  }, [id, token]);
  return (
    <>
      <div className="title-appointments-by-patient">
        <h1>See Appointments By Patient</h1>
      </div>
      <article className="appointments-by-patient">
        {usersPatients.map((patient) => (
          <>
            <div className="patient">
              <h3>
                Patient: <strong>{patient.patient.lastName}</strong>,
                <strong> {patient.patient.name}</strong>
              </h3>
              <h3>
                Date: <strong>{patient.date}</strong>
              </h3>
              <h3>
                Doctor:{" "}
                <strong>
                  {patient.doctor.lastName}, {patient.doctor.name}
                </strong>
              </h3>
              <h3>
                Specialty:{" "}
                <strong>{patient.doctor.specialty.specialty}</strong>
              </h3>
            </div>
          </>
        ))}
      </article>
      {message && (
        <div className="error-message-appointments-by-patient">
          <h1>{message}</h1>
        </div>
      )}
    </>
  );
}
