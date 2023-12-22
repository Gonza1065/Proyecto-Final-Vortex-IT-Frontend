import Cookies from "js-cookie";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
export const CartContext = createContext();
export const Provider = ({ children }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("id");
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("id");
    navigate("/login");
  };
  return (
    <>
      <CartContext.Provider value={{ token, role, userId, logout }}>
        {children}
      </CartContext.Provider>
    </>
  );
};
