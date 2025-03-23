"use client";
import Image from "next/image";
import ProdBtn from "./ProdBtn";
import { useCart } from "../context/CartContext";

const ProdCard = (Items: {
  id: number;
  src: string;
  title: string;
  desc: string;
  price: number;
}) => {

  const { addToCart } = useCart();

  return (
    <div className="w-50 h-[350px] flex flex-col justify-between h-95 bg-white rounded shadow shadow-white-950 p-2 transform hover:translate-y-5 cursor-pointer duration-300">
      <div className="img w-[full] h-[35%] relative">
        <Image className="rounded object-cover" src={Items.src} alt="none" fill />
      </div>
      <div className="desc p-2">
        <h3 className="text-sky-500 text-xl font-bold">{Items.title}</h3>
        <p className="text-gray-500 text-md"> {Items.desc} </p>
        <p className="pt-2 text-green-500 font-bold "> ${Items.price} </p>
      </div>
      <div className="btn text-center flex gap-3 items-center justify-center">
        <ProdBtn name="add to cart" onClick={() => addToCart({ ...Items, id: Items.id.toString(), name: Items.title, image: Items.src })} />
      </div>
    </div>
  );
};

export default ProdCard;
