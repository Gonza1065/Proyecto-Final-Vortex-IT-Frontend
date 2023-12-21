import Cookies from "js-cookie";
import { createContext } from "react";
export const CartContext = createContext();
export const Provider = ({ children }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("id");
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("id");
  };
  return (
    <>
      <CartContext.Provider value={{ token, role, userId, logout }}>
        {children}
      </CartContext.Provider>
    </>
  );
};
