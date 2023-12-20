import Cookies from "js-cookie";
import { createContext } from "react";
export const CartContext = createContext();
export const Provider = ({ children }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  return (
    <>
      <CartContext.Provider value={{ token, role }}>
        {children}
      </CartContext.Provider>
    </>
  );
};
