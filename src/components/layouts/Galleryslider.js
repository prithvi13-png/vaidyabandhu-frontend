import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

// Slider settings
const settings = {
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: false,
  centerMode: true,
  centerPadding: 0,
  responsive: [
    {
      breakpoint: 991,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 767,
      settings: { slidesToShow: 2 }
    }
  ]
};

// Local images (placed in public/assets/img/home-1/)
const staticImages = [
  { id: 1, image: "assets/img/home-1/376x430.jpg" },
  { id: 2, image: "assets/img/home-1/376x430-0.jpg" },
  { id: 3, image: "assets/img/home-1/376x430-1.jpg" },
  { id: 4, image: "assets/img/home-1/376x430-2.jpg" },
  { id: 5, image: "assets/img/home-1/376x430-3.jpg" },
  { id: 6, image: "assets/img/home-1/376x430-4.jpg" }
];

class Galleryslider extends Component {
  render() {
    return (
      <div className="sigma_instagram style-1 insta-images">
        <Slider {...settings} className="sigma_instagram-slider">
          {staticImages.map((item) => (
            <Link to="/doctor-grid" key={item.id}>
              <img src={process.env.PUBLIC_URL + '/' + item.image} alt={`Gallery ${item.id}`} />
            </Link>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Galleryslider;
