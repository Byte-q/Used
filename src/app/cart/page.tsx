"use client";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import Button from "../../components/Button";

const CartPage = () => {

// Removed duplicate handleCheckout declaration

  const { cart, removeFromCart, decreaseQuantity, increaseQuantity, totalPrice } = useCart();


  return (
    <div className="p-6">
      <div className="head flex justify-between">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <Button name="Home" path="/" />
      </div>
      {cart.length === 0 ? (
        <p className="text-gray-600 mt-4">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col h-60 md:h-[114px] items-center p-4 border-b relative"
          >
            <div className="h-full w-40 relative">
              <Image src={item.image} alt="none" fill className="rounded" />
            </div>
            <section className="flex justify-between w-full items-center p-4">
              <div>
                <h3 className="text-lg text-sky-500">{item.name}</h3>
                <p>price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md"
                >
                  +
                </button>
              </div>
              <button
                className="text-red-500 cursor-pointer"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </section>
          </div>
        ))
      )}
      {cart.length !== 0 ? (
        <section className="mt-6 p-4 flex items-center border-t justify-between">
          <div className="text-xl font-semibold">
            Total Price:{" "}
            <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="text-red-500 cursor-pointer"
          >
            Checkout
          </button>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartPage;

