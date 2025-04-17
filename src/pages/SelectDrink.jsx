// src/pages/SelectDrink.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 0,
    name: "Эспрессо",
    price: 100,
    description: "Крепкий черный кофе."
  },
  {
    id: 1,
    name: "Капучино",
    price: 150,
    description: "Кофе с молочной пенкой."
  },
  {
    id: 2,
    name: "Латте",
    price: 170,
    description: "Нежный кофе с молоком."
  }
];

export default function SelectDrink() {
  const navigate = useNavigate();

  const handleSelect = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/payment");
  };

  return (
    <div className="w-[1024px] h-[768px] bg-[#f7f3ef] p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Выберите напиток</h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleSelect(product)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold">{product.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
} 