import React from "react";

type CategoriesProps = {
  categorieId: number;
  onClickCategory: (i: number) => void;
};
export const categories = [
  "Alle",
  "Fleisch",
  "Vegetaria",
  "Grill",
  "Scharf",
  "Mix",
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categorieId, onClickCategory }) => {
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
);
