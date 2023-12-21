import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AddAppointment } from "./components/Appointments/AddAppointment/AddAppointment";
import { GetAppointmentsByPatient } from "./components/Appointments/GetAppointmentsByPatient/GetAppointmentsByPatient";
import { GetAppointmentsByDoctor } from "./components/Appointments/GetAppoitmentsByDoctor/GetAppointmentsByDoctor";
import { SeeAppoitmentsAvailable } from "./components/Appointments/SeeAppointmentsAvailable/SeeAppointmentsAvailable";
import { SeeAppointmentsByDoctor } from "./components/Appointments/SeeAppointmentsByDoctor/SeeAppointmentsByDoctor";
import { SeeAppointmentsByPatient } from "./components/Appointments/SeeAppointmentsByPatient/SeeAppointmentsByPatient";
import { AddDoctor } from "./components/Doctors/AddDoctor/AddDoctor";
import { GetDoctors } from "./components/Doctors/GetDoctors/GetDoctors";
import { UpdateDoctor } from "./components/Doctors/UpdateDoctor/UpdateDoctor";
import { Home } from "./components/Home/Home";
import { GetSpecialties } from "./components/Specialty/GetSpecialties/GetSpecialties";
import { ForgotPassword } from "./components/User/ForgotPassword/ForgotPassword";
import { Login } from "./components/User/Login/Login";
import { ResetPassword } from "./components/User/ResetPassword/ResetPassword";
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
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
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
              <Route path="/update-doctor/:id" element={<UpdateDoctor />} />
              <Route path="/get-specialties" element={<GetSpecialties />} />
              <Route
                path="/get-appointments-by-patient"
                element={<GetAppointmentsByPatient />}
              />
              <Route
                path="/see-appointments-by-patient/:id"
                element={<SeeAppointmentsByPatient />}
              />
              <Route path="/add-appointment" element={<AddAppointment />} />
              <Route
                path="/get-appointments-by-doctor"
                element={<GetAppointmentsByDoctor />}
              />
              <Route
                path="/see-appointments-by-doctor/:id"
                element={<SeeAppointmentsByDoctor />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
