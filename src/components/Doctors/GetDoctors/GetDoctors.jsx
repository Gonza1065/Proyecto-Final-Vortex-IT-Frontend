import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../componentsCSS/Doctors/GetDoctors/GetDoctors.css";
import { CartContext } from "../../context/context";
export function GetDoctors() {
  const { token, role } = useContext(CartContext);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors", {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <div className="title-doctors-registered">
        <h1>Doctors Registered</h1>
      </div>
      <article className="doctors">
        {doctors.map((doctor) => (
          <div key={doctor._id}>
            <h1>
              {doctor.lastName}, {doctor.name}
            </h1>
            <h3 className="doctor-specialty">
              <strong>{doctor.specialty.specialty}</strong>
            </h3>
            {role === "patient" && (
              <Button to={`/see-appointments/${doctor._id}`} component={Link}>
                See Appointments Available
              </Button>
            )}
            {role === "admin" && (
              <Button to={`/update-doctor/${doctor._id}`} component={Link}>
                Update Doctor
              </Button>
            )}
          </div>
        ))}
      </article>
    </>
  );
}
