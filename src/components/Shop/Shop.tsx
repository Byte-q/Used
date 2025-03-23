import Image from "next/image";
import React from "react";

const Shop = () => {
  return (
    <div className="flex flex-col md:flex-row h-fit md:h-200 mt-10 mb-10 md: m-0 justify-center items-center">
      <div className="text w-full md:w-[50%] h-full flex flex-col justify-center items-center p-5">
        <h1 className="text-sky-600 text-center text-3xl font-bold mb-5">
          Do It All From Your Phone
        </h1>
        <p className="text-center text-lg ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
          repellat rerum architecto accusantium quaerat optio iure deleniti
          nulla deserunt nostrum eveniet nemo ex doloribus, repellendus
          voluptatibus, blanditiis iusto. Dolore, consequuntur.
        </p>
      </div>
      <div className="image w-full md:w-[50%] h-full flex items-center">
        <Image
          className="text-center m-auto"
          src="/shop.png"
          alt="none"
          width={500}
          height={400}
        />
      </div>
    </div>
  );
};

export default Shop;
