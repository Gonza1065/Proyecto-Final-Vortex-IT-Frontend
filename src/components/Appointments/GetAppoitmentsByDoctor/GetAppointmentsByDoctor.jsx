import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../componentsCSS/Appointments/GetAppointmentsByDoctor/GetAppointmentsByDoctor.css";
import { CartContext } from "../../context/context";
export function GetAppointmentsByDoctor() {
  const [doctors, setDoctors] = useState([]);
  const { token } = useContext(CartContext);
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors", {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  }, [token]);
  return (
    <>
      <div className="title-get-appointments-by-doctor">
        <h1>Get Appointments By Doctor</h1>
      </div>
      <article className="doctors">
        {doctors.map((doctor) => (
          <>
            <div className="doctor">
              <h1>
                Doctor:{" "}
                <strong>
                  {doctor.lastName}, {doctor.name}
                </strong>
              </h1>
              <h1>
                Specialty: <strong>{doctor.specialty.specialty}</strong>
              </h1>
              <div className="see-appointments">
                <Button
                  to={`/see-appointments-by-doctor/${doctor._id}`}
                  component={Link}
                >
                  See Appointments
                </Button>
              </div>
            </div>
          </>
        ))}
      </article>
    </>
  );
}
