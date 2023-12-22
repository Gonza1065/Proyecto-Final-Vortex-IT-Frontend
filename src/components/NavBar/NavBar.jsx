import { AppBar, Button, Toolbar } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../../componentsCSS/NavBar/NavBar.css";
import { CartContext } from "../context/context";
export function NavBar() {
  const { role, logout, userId } = useContext(CartContext);
  return (
    <>
      <AppBar>
        <Toolbar className="header-nav-bar">
          {role === "admin" ? (
            <>
              <Button color="inherit" component={Link} to="/get-doctors">
                Get Doctors
              </Button>
              <Button color="inherit" component={Link} to="/add-doctor">
                Add Doctor
              </Button>
              <Button color="inherit" component={Link} to="/add-appointment">
                Add Appointment
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/get-appointments-by-doctor"
              >
                Get Appointments By Doctor
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/get-appointments-by-patient"
              >
                Get Appointments By Patient
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/history-cancelations"
              >
                History Cancelations By Patient
              </Button>
              <Button
                color="inherit"
                component={Link}
                onClick={logout}
                to="/login"
              >
                Logout
              </Button>
            </>
          ) : role === "patient" ? (
            <>
              <Button color="inherit" component={Link} to="/get-doctors">
                Get Doctors
              </Button>
              <Button color="inherit" component={Link} to="/get-specialties">
                Get Specialties
              </Button>
              <Button
                color="inherit"
                component={Link}
                to={`/get-appointments/${userId}`}
              >
                Get Appointments
              </Button>
              <Button
                color="inherit"
                component={Link}
                onClick={logout}
                to="/login"
              >
                Logout
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </>
  );
}
