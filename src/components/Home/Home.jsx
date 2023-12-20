import "../../componentsCSS/Home/Home.css";
import { NavBar } from "../NavBar/NavBar";
export function Home() {
  return (
    <>
      <NavBar />
      <div className="logo-img-home">
        <img
          src="https://res.cloudinary.com/dn2vrx9eu/image/upload/v1703090010/Doctors-logos_transparent_ktfpet.png"
          alt=""
        />
      </div>
      <div className="welcome-message">
        <h3>Reserve your appointment with us!</h3>
      </div>
    </>
  );
}
