import { AppBar, Button, Toolbar } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../../componentsCSS/NavBar/NavBar.css";
import { CartContext } from "../context/context";
export function NavBar() {
  const { role, logout } = useContext(CartContext);
  return (
    <>
      <AppBar>
        <Toolbar className="header-nav-bar">
          {role === "admin" ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/get-doctors"
                className="link-nav-bar"
              >
                Get Doctors
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/add-doctor"
                className="link-nav-bar"
              >
                Add Doctor
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/add-appointment"
                className="link-nav-bar"
              >
                Add Appointment
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/updated-appointment/:id"
                className="link-nav-bar"
              >
                Updated Appointment
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/delete-appointment/:id"
                className="link-nav-bar"
              >
                Delete Appointment
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/get-appointments-by-doctor"
                className="link-nav-bar"
              >
                Get Appointments By Doctor
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/get-appointments-by-patient"
                className="link-nav-bar"
              >
                Get Appointments By Patient
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/history-cancelations-by-patient/:id"
                className="link-nav-bar"
              >
                History Cancelations By Patient
              </Button>
              <Button
                color="inherit"
                component={Link}
                className="link-nav-bar"
                onClick={logout}
                to="/login"
              >
                Logout
              </Button>
            </>
          ) : role === "patient" ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/get-doctors"
                className="link-nav-bar"
              >
                Get Doctors
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/get-specialties"
                className="link-nav-bar"
              >
                Get Specialties
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/cancel-appointment"
                className="link-nav-bar"
              >
                Cancel Appointment
              </Button>
              <Button
                color="inherit"
                component={Link}
                className="link-nav-bar"
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
