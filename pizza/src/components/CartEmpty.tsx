import React from "react";
import cartEmpty from '../assets/empty-cart.svg';
import { Link } from "react-router-dom";
export const CartEmpty:React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
      Ups! Es ist leer hier! <span>😕</span>
      </h2>
      <p>
      Der Mindestbestellwert bei einer Lieferung beträgt 16,00 €
      </p>
      <img src={cartEmpty} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Zurück</span>
      </Link>
    </div>
  );
};
