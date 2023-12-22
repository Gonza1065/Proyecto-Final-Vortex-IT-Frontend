import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/SeeAppointmentsByDoctor/SeeAppointmentsByDoctor.css";
import { CartContext } from "../../context/context";
export function SeeAppointmentsByDoctor() {
  const [appointmentsByDoctor, setAppointmentsByDoctor] = useState([]);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const { token } = useContext(CartContext);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/appointment/get-appointments-by-doctor/${id}`,
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
          setAppointmentsByDoctor(data);
        }
      })
      .catch((err) => console.log(err));
  }, [id, token]);
  return (
    <>
      <div className="title-see-appointments-by-doctor">
        <h1>See Appointments By Doctor</h1>
      </div>
      <article className="appointments-by-doctor">
        {appointmentsByDoctor.map((appointment) => (
          <div key={appointment._id}>
            {appointment.status === "available" ? (
              <div className="appointment">
                <div className="information-doctor">
                  <h1>
                    Doctor:{" "}
                    <strong>
                      {appointment.doctor.lastName}, {appointment.doctor.name}
                    </strong>
                  </h1>
                </div>
                <div className="information-appointment">
                  <h1>
                    Date:{" "}
                    <strong>
                      {appointment.day}/{appointment.month}
                    </strong>
                    <strong>, {appointment.date}</strong> hrs.
                  </h1>
                  <h1>
                    Status: <strong>{appointment.status}</strong>
                  </h1>
                </div>
                <div>
                  <Button
                    component={Link}
                    to={`/update-information/${appointment._id}`}
                  >
                    Update Information
                  </Button>
                </div>
              </div>
            ) : appointment.status === "reserved" ? (
              <div className="appointment">
                <div className="information-doctor">
                  <h1>
                    Doctor:{" "}
                    <strong>
                      {appointment.doctor.lastName}, {appointment.doctor.name}
                    </strong>
                  </h1>
                </div>
                <div className="information-appointment">
                  <h1>
                    Date:{" "}
                    <strong>
                      {appointment.day}/{appointment.month}
                    </strong>
                    <strong>, {appointment.date}</strong> hrs.
                  </h1>
                  <h1>
                    Status: <strong>{appointment.status}</strong>
                  </h1>
                </div>
                <div className="information-patient">
                  <h1>
                    Patient:{" "}
                    <strong>
                      {appointment.patient.lastName}, {appointment.patient.name}
                    </strong>
                  </h1>
                </div>
              </div>
            ) : (
              appointment.status === "cancelled" && (
                <>
                  <div className="appointment">
                    <div className="information-doctor">
                      <h1>
                        Doctor:{" "}
                        <strong>
                          {appointment.doctor.lastName},{" "}
                          {appointment.doctor.name}
                        </strong>
                      </h1>
                    </div>
                    <div className="information-appointment">
                      <h1>
                        Date:{" "}
                        <strong>
                          {appointment.day}/{appointment.month}
                        </strong>
                        <strong>, {appointment.date}</strong> hrs.
                      </h1>
                      <h1>
                        Status: <strong>{appointment.status}</strong>
                      </h1>
                    </div>
                    <div className="information-patient">
                      <h1>
                        Patient:{" "}
                        <strong>
                          {appointment.patient.lastName},{" "}
                          {appointment.patient.name}
                        </strong>
                      </h1>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        ))}
      </article>
      {message && (
        <div className="see-appointments-by-doctor-message">
          <h1>{message}</h1>
        </div>
      )}
    </>
  );
}
