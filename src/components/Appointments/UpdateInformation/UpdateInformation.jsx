import { Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../componentsCSS/Appointments/UpdateInformation/UpdateInformation.css";
import { CartContext } from "../../context/context";
export function UpdateInformation() {
  const { id } = useParams();
  const { token } = useContext(CartContext);
  const navigate = useNavigate();
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointment/delete-appointment/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="title-update-information">
        <h1>Update Information</h1>
      </div>
      <div>
        <Button onClick={handleDeleteClick}>Delete Appointment</Button>
        <Button to={`/update-appointment/${id}`} component={Link}>
          Update Appointment
        </Button>
      </div>
    </>
  );
}
