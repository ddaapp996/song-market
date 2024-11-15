// file: src/components/Banner.js
import React from "react";
import { Carousel } from "antd";

const Banner = ({ banners }) => {
  return (
    <Carousel autoplay>
      {banners.map((banner) => (
        <div key={banner._id}>
          <img
            src={(process.env.REACT_APP_API_URL || 'http://localhost:5000') + banner.imageUrl}
            alt={banner.title}
            className="w-full h-auto xl:h-[65vh] object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white text-xl font-bold">
            {banner.title}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
