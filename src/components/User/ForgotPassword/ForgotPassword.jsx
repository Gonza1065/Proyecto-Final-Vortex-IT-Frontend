import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import "../../../componentsCSS/User/ForgotPassword/ForgotPassword.css";
export function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            console.log(data);
            setMessage(data.message);
            toast.success(message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
        .catch((err) => console.log(err));
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
      <div className="title-forgot-password">
        <h1>Forgot Password</h1>
      </div>
      <div>
        <Container>
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
            <div>
              <Button type="submit">
                Send email for recuperate the password
              </Button>
              {message && (
                <div className="forgot-password-message">
                  <h1>{message}</h1>
                </div>
              )}
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
