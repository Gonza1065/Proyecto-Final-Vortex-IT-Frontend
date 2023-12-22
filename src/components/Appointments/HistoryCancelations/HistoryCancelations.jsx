import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../componentsCSS/Appointments/HistoryCancelations/HistoryCancelations.css";
import { CartContext } from "../../context/context";
export function HistoryCancelations() {
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
      <div className="title-history-cancelations">
        <h1>History Cancelations By Patients</h1>
      </div>
      <section className="patients">
        {patients.map((patient) => (
          <>
            <div className="patient">
              <h1>
                {patient.lastName}, {patient.name}
              </h1>
              <div className="see-appointments">
                <Button
                  to={`/cancelations-by-patient/${patient._id}`}
                  component={Link}
                >
                  See Appointments cancelled
                </Button>
              </div>
            </div>
          </>
        ))}
      </section>
    </>
  );
}
