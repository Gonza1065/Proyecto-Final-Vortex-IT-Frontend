import { Button, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/UpdateAppointment/UpdateAppointment.css";
import { CartContext } from "../../context/context";
export function UpdateAppointment() {
  const [formData, setFormData] = useState({
    date: "",
  });
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const { token } = useContext(CartContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/appointment/update-appointment/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      navigate("/");
    } else {
      const data = await response.json();
      const { message } = data;
      setMessage(message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div className="title-update-appointment">
        <h1>Update Appointment</h1>
      </div>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="Date"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="input"
          />
          <div className="btn-update">
            <Button type="submit">Update Appointment</Button>
          </div>
          {message && (
            <div className="update-appointment-message">
              <h1>{message}</h1>
            </div>
          )}
        </form>
      </Container>
    </>
  );
}
