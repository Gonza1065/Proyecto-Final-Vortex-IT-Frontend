import { Button, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../componentsCSS/Doctors/AddDoctor/AddDoctor.css";
import { CartContext } from "../../context/context";
export function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    specialty: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.lastName || !formData.specialty) {
      setMessage("All fields are required");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/doctors/add-doctor",
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
      <div className="title-add-doctor">
        <h1>Add Doctor</h1>
      </div>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            type="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            type="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="input"
          />
          <TextField
            label="Specialty"
            variant="outlined"
            fullWidth
            margin="normal"
            type="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            className="input"
          />
          <div className="btn-create">
            <Button type="submit">Add Doctor</Button>
          </div>
          {message && (
            <div className="add-doctor-message">
              <h1>{message}</h1>
            </div>
          )}
        </form>
      </Container>
    </>
  );
}
