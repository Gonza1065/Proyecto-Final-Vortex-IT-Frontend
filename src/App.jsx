import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SeeAppoitmentsAvailable } from "./components/Appointments/SeeAppointmentsAvailable/SeeAppointmentsAvailable";
import { AddDoctor } from "./components/Doctors/AddDoctor/AddDoctor";
import { GetDoctors } from "./components/Doctors/GetDoctors/GetDoctors";
import { Home } from "./components/Home/Home";
import { Login } from "./components/User/Login/Login";
import { Signup } from "./components/User/Signup/Signup";
import { CartContext } from "./components/context/context";
function App() {
  const { token } = useContext(CartContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/get-doctors" element={<GetDoctors />} />
              <Route
                path="/see-appointments/:id"
                element={<SeeAppoitmentsAvailable />}
              />
              <Route path="/add-doctor" element={<AddDoctor />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
