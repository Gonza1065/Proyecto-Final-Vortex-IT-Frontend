import { Button, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../componentsCSS/Appointments/AddAppointment/AddAppointment.css";
import { CartContext } from "../../context/context";
export function AddAppointment() {
  const [formData, setFormData] = useState({
    doctorSpecialty: "",
    date: "",
    day: "",
    month: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(CartContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.doctorSpecialty ||
      !formData.date ||
      !formData.day ||
      !formData.month
    ) {
      setMessage("All fields are required");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointment/add-appointment",
        {
          method: "POST",
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
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div className="title-add-appointment">
        <h1>Add Appointment</h1>
      </div>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="Specialty"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            name="doctorSpecialty"
            value={formData.doctorSpecialty}
            onChange={handleInputChange}
            className="input"
          />
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
          <TextField
            label="Day"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            name="day"
            value={formData.day}
            onChange={handleInputChange}
            className="input"
          />
          <TextField
            label="Month"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            className="input"
          />
          <div className="btn-create">
            <Button type="submit">Add Appointment</Button>
          </div>
          {message && (
            <div className="add-appointment-message">
              <h1>{message}</h1>
            </div>
          )}
        </form>
      </Container>
    </>
  );
}
