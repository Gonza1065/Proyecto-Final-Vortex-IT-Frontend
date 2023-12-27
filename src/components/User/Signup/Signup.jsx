import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../componentsCSS/User/Signup/Signup.css";
export function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setMessage("All fields are required");
      return;
    }
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      navigate("/login");
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
      <div className="logo-img">
        <img
          src="https://res.cloudinary.com/dn2vrx9eu/image/upload/v1703090010/Doctors-logos_transparent_ktfpet.png"
          alt=""
        />
      </div>
      <div className="title-signup-login">
        <h1>Signup</h1>
      </div>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
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
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="input"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input"
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="input"
          />
          <div className="btn-login-signup">
            <Button type="submit">Signup</Button>
            <Button
              component={Link}
              className="question-already-account"
              to="/login"
            >
              Do you have already account?
            </Button>
          </div>
          {message && (
            <div className="signup-message">
              <h1>{message}</h1>
            </div>
          )}
        </form>
      </Container>
    </>
  );
}
