import Image from "next/image";
import React from "react";

const Info = () => {
  return (
    <section className="flex flex-col md:flex-row pt-10 pb-10 md:p-0 bg-gray-100 h-fit md:h-150">
      <div className="image w-full md:w-[50%] flex items-center justify-center">
        <Image src="/user1.png" alt="none" width={200} height={200} />
      </div>
      <div className="text w-full md:w-[50%] mt-5 md:m-0 flex items-center justify-center flex-col p-5">
        <h1 className="text-3xl font-bold text-sky-600 mb-5 text-center">Costmize Your Own Profile</h1>
        <p className="text-lg text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          error cumque voluptas culpa fuga magni quos, sed, provident corrupti
          rem rerum facilis at nihil blanditiis praesentium officiis molestiae
          et necessitatibus.
        </p>
      </div>
    </section>
  );
};

export default Info;
