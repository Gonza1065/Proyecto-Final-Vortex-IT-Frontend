import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AddAppointment } from "./components/Appointments/AddAppointment/AddAppointment";
import { GetAppointments } from "./components/Appointments/GetAppointments/GetApointments";
import { GetAppointmentsByPatient } from "./components/Appointments/GetAppointmentsByPatient/GetAppointmentsByPatient";
import { GetAppointmentsByDoctor } from "./components/Appointments/GetAppoitmentsByDoctor/GetAppointmentsByDoctor";
import { HistoryCancelations } from "./components/Appointments/HistoryCancelations/HistoryCancelations";
import { SeeAppoitmentsAvailable } from "./components/Appointments/SeeAppointmentsAvailable/SeeAppointmentsAvailable";
import { SeeAppointmentsByDoctor } from "./components/Appointments/SeeAppointmentsByDoctor/SeeAppointmentsByDoctor";
import { SeeAppointmentsByPatient } from "./components/Appointments/SeeAppointmentsByPatient/SeeAppointmentsByPatient";
import { SeeHistoryCancelations } from "./components/Appointments/SeeHistoryCancelations/SeeHistoryCancelations";
import { UpdateAppointment } from "./components/Appointments/UpdateAppointment/UpdateAppointment";
import { UpdateInformation } from "./components/Appointments/UpdateInformation/UpdateInformation";
import { AddDoctor } from "./components/Doctors/AddDoctor/AddDoctor";
import { GetDoctors } from "./components/Doctors/GetDoctors/GetDoctors";
import { UpdateDoctor } from "./components/Doctors/UpdateDoctor/UpdateDoctor";
import { Home } from "./components/Home/Home";
import { GetSpecialties } from "./components/Specialty/GetSpecialties/GetSpecialties";
import { NotFound } from "./components/URLNotFound/NotFound";
import { ForgotPassword } from "./components/User/ForgotPassword/ForgotPassword";
import { Login } from "./components/User/Login/Login";
import { ResetPassword } from "./components/User/ResetPassword/ResetPassword";
import { Signup } from "./components/User/Signup/Signup";
import { CartContext } from "./components/context/context";
function App() {
  const { token } = useContext(CartContext);
  return (
    <>
      <Routes>
        {!token ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
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
            <Route
              path="/update-information/:id"
              element={<UpdateInformation />}
            />
            <Route
              path="/update-appointment/:id"
              element={<UpdateAppointment />}
            />
            <Route path="/get-appointments/:id" element={<GetAppointments />} />
            <Route
              path="/history-cancelations"
              element={<HistoryCancelations />}
            />
            <Route
              path="/cancelations-by-patient/:id"
              element={<SeeHistoryCancelations />}
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
