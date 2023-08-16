import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const navigate = useNavigate()
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://64d24f20f8d60b174361d90f.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Pizza nicht gefunden");
        navigate('/')
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return "Laden";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p></p>
      <h4>{pizza.price} €</h4>
    </div>
  );
};

export default FullPizza;
