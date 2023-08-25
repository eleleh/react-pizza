import React from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <ProgressBar borderColor="#fe5f1e" barColor="#fe5f1e"/>;
  }
  return (
    <div className="fullPizza__container">
      <img src={pizza.imageUrl} alt="" />
      <div className="fullPizza__desc_and_btn">
        <div className="fullPizza__description">
          <h2>{pizza.title}</h2>
          <h4>{pizza.price.toFixed(2)} €</h4>
        </div>

        <Link to="/">
          <button className="button button--outline button--add go-back-btn">
            <span> Zurück</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
