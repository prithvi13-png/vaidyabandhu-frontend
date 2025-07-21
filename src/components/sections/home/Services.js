import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Removed 'swiper/css/navigation' as we are removing navigation arrows

// Import required modules (e.g., Pagination, Autoplay)
import { Pagination, Autoplay } from 'swiper/modules'; // Removed Navigation module

const services = [
  {
    icon: "flaticon-stethoscope",
    title: "Get 10% cashback ",
    points: [
      "Submit your hospital or medical bills within 7 days via WhatsApp or email.",
      "Receive 10% cashback directly credited to your bank.",
      "Valid on surgeries, treatments, and diagnostic services from our partner network.",
    ],
  },
  {
    icon: "flaticon-doctor",
    title: "10% to 40% Discount on Surgeries & Treatments",
    points: [
      "Affordable medical procedures across all major departments.",
      "Best hospitals & specialists to ensure quality care.",
      "Seamless treatment process – from consultation to recovery.",
    ],
  },
  {
    icon: "flaticon-stethoscope",
    title: "Consult a Doctor – Free Medical Advice",
    points: [
      "Get expert guidance from highly experienced doctors anytime.",
      "Clarify doubts, discuss symptoms, and get the right medical advice.",
      "Avoid unnecessary hospital visits with trusted online consultations.",
    ],
  },
  {
    icon: "flaticon-heart",
    title: "Free Surgeries for the Needy",
    points: [
      "Helping underprivileged patients get life-saving treatments.",
      "Partnered with hospitals & doctors willing to support critical cases.",
      "Support programs for ongoing treatments and recovery.",
    ],
  },
  {
    icon: "flaticon-clipboard",
    title: "Discounts on Diagnostic Tests",
    points: [
      "10% to 40% savings on MRI, CT Scan, Blood Tests, etc.",
      "Partnered diagnostic centers across Karnataka.",
      "Accurate results with advanced testing facilities.",
    ],
  },
  {
    icon: "flaticon-hospital",
    title: "One-Stop Healthcare Solution",
    points: [
      "All departments – Cardiology, Orthopedics, Cancer, and more.",
      "Trusted doctors, hospitals, and diagnostics in one place.",
      "Personalized healthcare support for every patient.",
    ],
  },
  {
    icon: "flaticon-hospital",
    title: "Second Opinions from Experts",
    points: [
      "Not sure about a diagnosis? Get a second opinion.",
      "Avoid unnecessary surgeries or wrong treatments.",
      "Consult top doctors across specializations.",
    ],
  },
];

const ServicesPreview = () => {
  const [animated, setAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const sectionStyle = {
    padding: "40px 20px",
    background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
    textAlign: "center",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
  };

  const subHeadingStyle = {
    fontSize: "clamp(16px, 2.5vw, 20px)",
    color: "#4a5568",
    maxWidth: "800px",
    margin: "0 auto 60px",
    lineHeight: "1.4",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
  };

  const cardBaseStyle = {
    padding: "30px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 12px 25px rgba(0, 122, 126, 0.1)",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    cursor: "pointer",
    height: "400px",
    transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    position: "relative",
    overflow: "hidden",
    borderBottom: "4px solid transparent",
  };

  const cardEntranceAnimation = (idx) => ({
    opacity: animated ? 1 : 0,
    transform: animated
      ? "translateY(0) scale(1)"
      : "translateY(30px) scale(0.95)",
    // Swiper handles slide transitions, so individual card entrance delay is removed here
  });

  const iconContainerStyle = {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "#e6fffa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0, 122, 126, 0.15)",
    transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease", // Added box-shadow transition
  };

  const iconStyle = {
    fontSize: "32px",
    color: "#007a7e",
    transition: "transform 0.3s ease-out", // Added transform transition for icon
  };

  const titleStyle = {
    fontSize: "22px",
    fontWeight: "700",
    color: "#003d3f",
    marginBottom: "15px",
    lineHeight: "1.3",
    transition: "transform 0.3s ease-out, color 0.3s ease-out", // Added color transition
  };

  const listStyle = {
    paddingLeft: "20px",
    marginBottom: "0",
    flexGrow: 1,
    overflowY: "auto",
  };

  const listItemStyle = {
    fontSize: "15px",
    color: "#5a6778",
    lineHeight: "1.7",
    marginBottom: "10px",
    position: "relative",
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out", // Added transition for list items
  };

  return (
    <div style={sectionStyle}>
      <h2
        style={{
          fontSize: "clamp(24px, 4vw, 32px)",
          fontWeight: 800,
          color: "#004d4f",
          textAlign: "center",
          marginBottom: "8px",
          lineHeight: "1.3",
        }}
      >
        Our <span style={{ color: "#007a7e" }}>Services</span>
      </h2>

      <p style={subHeadingStyle}>
        At Vaidya Bandhu, we are committed to providing a wide range of medical
        services designed to meet your every need. From expert consultations to
        significant savings on treatments, discover how we make healthcare
        accessible.
      </p>

      {/* Swiper Carousel Integration */}
      <Swiper
        modules={[Pagination, Autoplay]} // Removed Navigation module
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false} // Explicitly disable navigation arrows
        style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '50px' }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {services.map((service, idx) => (
          <SwiperSlide key={idx}>
            <Link
              to={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  ...cardBaseStyle,
                  ...cardEntranceAnimation(idx),
                  // Hover effects
                  ...(hoveredCard === idx && {
                    transform: "translateY(-10px) scale(1.02)", // More pronounced lift
                    boxShadow: "0 30px 60px rgba(0, 122, 126, 0.45)", // Stronger, wider shadow
                    background: "linear-gradient(135deg, #f0ffff 0%, #ffffff 100%)",
                    borderBottom: "6px solid #007a7e", // Primary color border
                  }),
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  style={{
                    ...iconContainerStyle,
                    ...(hoveredCard === idx && {
                      transform: "scale(1.15) rotate(5deg)", // Icon grows and rotates
                      backgroundColor: "#CCF5F5",
                      boxShadow: "0 8px 20px rgba(0, 122, 126, 0.25)", // Enhanced icon shadow on hover
                    }),
                  }}
                >
                  <i className={service.icon} style={iconStyle}></i>
                </div>
                <h4
                  style={{
                    ...titleStyle,
                    ...(hoveredCard === idx && {
                      transform: "translateY(-5px)",
                      color: "#005f62",
                    }),
                  }}
                >
                  {service.title}
                </h4>
                <ul style={listStyle}>
                  {service.points.map((point, pIdx) => (
                    <li
                      style={{
                        ...listItemStyle,
                        // Staggered fade/slide in for list items on card load
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: `${idx * 0.1 + pIdx * 0.05}s`, // Staggered delay per item
                      }}
                      key={pIdx}
                    >
                      <span
                        style={{
                          marginRight: "8px",
                          color: "#007a7e",
                          fontWeight: "bold",
                        }}
                      >
                        •
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServicesPreview;