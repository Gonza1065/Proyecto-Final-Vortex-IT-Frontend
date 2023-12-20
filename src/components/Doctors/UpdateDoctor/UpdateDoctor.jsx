import { Button, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../componentsCSS/Doctors/UpdateDoctor/UpdateDoctor.css";
import { CartContext } from "../../context/context";
export function UpdateDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
  });
  const { id } = useParams();
  const { token } = useContext(CartContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/update-doctor/${id}`,
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
        navigate("/get-doctors");
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
      <div className="title-update-doctor">
        <h1>Update Doctor</h1>
      </div>
      <Container>
        <form action="" onSubmit={handleSubmit}>
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
          <div className="btn-update">
            <Button type="submit">Update Doctor</Button>
          </div>
        </form>
      </Container>
    </>
  );
}
