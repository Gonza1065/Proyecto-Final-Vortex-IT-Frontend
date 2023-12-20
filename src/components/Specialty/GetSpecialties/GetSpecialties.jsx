import { useContext, useEffect, useState } from "react";
import "../../../componentsCSS/Specialty/GetSpecialties/GetSpecialties.css";
import { CartContext } from "../../context/context";
export function GetSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [message, setMessage] = useState(null);
  const { token } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/specialty", {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setSpecialties(data);
        }
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <div className="title-specialties">
        <h1>Specialties</h1>
      </div>
      <div className="error-message">
        <h1>{message}</h1>
      </div>
      <div className="specialties">
        {specialties.map((specialty) => (
          <>
            <div>
              <h1>{specialty.specialty}</h1>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
