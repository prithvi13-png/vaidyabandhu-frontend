// components/HospitalCarousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
  "/assets/images/hospital1.png",
  "/assets/images/hospital2.jpg",
  "/assets/images/hospital3.jpeg",
  "/assets/images/hospital6.png",
  "/assets/images/hospital5.png",
  "/assets/images/hospital1.png", // repeated to loop
];

const HospitalCarousel = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    arrows: false,
    dots: false,
    pauseOnHover: false,
  };

  return (
    <div className="bg-[#E6FAF8] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {logos.map((src, index) => (
            <div key={index} className="px-4">
              <img
                src={src}
                alt={`Hospital Logo ${index + 1}`}
                className="mx-auto h-24 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HospitalCarousel;
