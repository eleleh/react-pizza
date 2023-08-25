import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
  const summe = items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
  return Number(summe.toFixed(2));
};
