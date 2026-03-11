import { useContext } from "react";
import { CartContext } from "../context/CartsContext";

export const useCart = () => {
    const c = useContext(CartContext);
    if (!c) throw new Error('dededede'); return c;
};
