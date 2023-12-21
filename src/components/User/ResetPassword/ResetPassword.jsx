import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../componentsCSS/User/ResetPassword/ResetPassword.css";
export function ResetPassword() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/users/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Password reset successfully") {
          setMessage(data.message);
          toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate("/login");
        } else {
          toast.error(message, {
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
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div>
        <h1>Reset Password</h1>
      </div>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="input"
          />
          <TextField
            label="Repeat Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="repeatNewPassword"
            value={formData.repeatNewPassword}
            onChange={handleInputChange}
            className="input"
          />
          <div>
            <Button type="submit">Confirm Password</Button>
          </div>
          {message && (
            <div className="reset-password-message">
              <h1>{message}</h1>
            </div>
          )}
        </form>
      </Container>
    </>
  );
}
