import React from "react";
import Button from "../Button";
import Image from "next/image";
import Motion from "../Motion";

const Landing = () => {
  return (
    <section className="container mt-10 md:m-auto flex flex-col md:flex-row justify-center align-center h-fit md:h-200 text-center p-3">
      <div className="text w-full md:w-[50%] flex flex-col justify-center text-center md:text-start pr-5 pl-5 m-auto md:m-0">
        <Motion dim="y">
          <h1 className="c-sky-400 font-bold text-3xl mb-3 text-sky-600">
            Welcome To Used Items Store
          </h1>
          <p className="text-lg font-bold">Buy And Sell Your Products Safty </p>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia porro
            quas repudiandae maiores, culpa facilis consectetur reprehenderit
            fugiat ipsam minima quae perferendis excepturi, eum dicta, itaque
            qui? Eveniet, ut architecto.
          </p>
          <Button name="Brows Products" path="/products" />
        </Motion>
      </div>
      <Motion
        dim="y"
        className="image w-[50%] flex justify-center items-center m-auto mt-5 md:m-0"
      >
        <div id="img" className="">
          <Image src="/landing.png" alt="none" width={400} height={400} />
        </div>
      </Motion>
    </section>
  );
};
export default Landing;
