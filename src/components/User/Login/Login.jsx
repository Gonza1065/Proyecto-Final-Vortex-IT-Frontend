import { Button, Container, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../componentsCSS/User/Login/Login.css";
export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("All fields are required");
    }
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const data = await response.json();
      const { role, _id } = data.existingUser;
      const { token } = data;
      Cookies.set("token", token);
      Cookies.set("role", role);
      Cookies.set("id", _id);
      navigate("/");
      toast.success("Login Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
        <h1>Login</h1>
      </div>
      <Container className="container-form">
        <form action="" onSubmit={handleSubmit}>
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
          <div className="btn-login-signup">
            <Button type="submit">Login</Button>
            <Button
              component={Link}
              className="question-already-account"
              to="/signup"
            >
              You don´t have already an account?
            </Button>
            <Button
              component={Link}
              className="question-already-account"
              to="/forgot-password"
            >
              Did you forget the password?
            </Button>
          </div>
          {message && (
            <div className="login-message">
              <h1>{message}</h1>
            </div>
          )}
        </form>
        <ToastContainer />
      </Container>
    </>
  );
}
