"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide} from "swiper/react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";


const SwiperCards = ({items, paginationImages}: {
    items: {src: string, card: ReactNode}[];
    paginationImages: boolean;
} ) => {
  return (
    <div className="flex flex-col gap-4">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {items.map(({ card }, i) => (
          <SwiperSlide key={i}>
            <div>{card}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      {paginationImages && items.map(({ src }, i) => (
        <div key={i} className="w-40 h-40 relative">
            <Image src={src} alt="none" fill className="object-cover"/>
        </div>
      ))}
    </div>
  );
};

export default SwiperCards;
