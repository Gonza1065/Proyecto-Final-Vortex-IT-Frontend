import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../componentsCSS/Appointments/GetAppointmentsByPatient/GetAppointmentsByPatient.css";
import { CartContext } from "../../context/context";
export function GetAppointmentsByPatient() {
  const [patients, setPatients] = useState([]);
  const { token } = useContext(CartContext);
  useEffect(() => {
    fetch("http://localhost:5000/api/users/patients", {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => console.log(err));
  }, [token]);
  return (
    <>
      <div className="title-patients">
        <h1>Patients</h1>
      </div>
      <article className="patients">
        {patients.map((patient) => (
          <>
            <div className="patient">
              <h1 key={patient._id}>
                {patient.lastName}, {patient.name}
              </h1>
              <Button
                to={`/see-appointments-by-patient/${patient._id}`}
                component={Link}
              >
                See Appointments
              </Button>
            </div>
          </>
        ))}
      </article>
    </>
  );
}
