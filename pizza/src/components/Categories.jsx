import React from "react";

export function Categories({ categorieId, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categorieId === index ? "active" : ""}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
