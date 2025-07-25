import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

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
    icon: "flaticon-hospital",
    title: "10%–40% Discount on Surgeries, Treatments, and Diagnostics",
    points: [
      "Access affordable surgeries and treatments across all medical departments.",
      "Connect with the best doctors/specialists to ensure high-quality care.",
      "Prioritizing your healing with ongoing post-recovery care.",
    ],
  },
  {
    icon: "flaticon-stethoscope",
    title: "Save 10% to 40% on Diagnostic Tests",
    points: [
      "Enjoy discounts on MRI, CT Scan, Blood Tests, and more.",
      "Access partnered diagnostic centers across Karnataka.",
      "Get accurate results with modern, high-quality testing facilities.",
    ],
  },
  {
    icon: "flaticon-stethoscope",
    title: "Get 10% Cashback on Your Medical Bills",
    points: [
      "Send your bill to Vaidya Bandhu via WhatsApp or Email. Cashback will be credited to your account within 7 working days.",
      "Receive 10% cashback directly credited to your bank account.",
      "Offer valid on surgeries, treatments, and diagnostic services.",
    ],
  },
  {
    icon: "flaticon-doctor",
    title: "Your One-Stop Healthcare Solution",
    points: [
      "Consult experts across 70+ departments ",
      "Find trusted doctors, hospitals, and labs, all in one place.",
      "Benefit from personalized medical support tailored to your needs.",
    ],
  },
  {
    icon: "flaticon-heart",
    title: "Get a Second Opinion from Experts",
    points: [
      "Unsure about a Surgery and treatment plan?",
      "Consult top specialists to confirm or explore better options.",
      "Avoid unnecessary surgeries and make confident healthcare decisions.",
    ],
  },
  {
    icon: "flaticon-clipboard",
    title: "Consult a Doctor – For Medical Advice",
    points: [
      "Get expert consultations from experienced doctors anytime.",
      "Discuss symptoms, clarify health concerns, and receive trusted medical guidance.",
      "Connect with experienced medical professionals at your convenience.",
    ],
  },
  {
    icon: "flaticon-hospital",
    title: "Free Surgeries for Underprivileged Patients",
    points: [
      "Providing life-saving treatments for those who can’t afford care.",
      "Partnered with doctors and hospitals committed to social impact.",
      "Continuous care for critical cases and post-surgery recovery support.",
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

  // Re-using the heading style from the previous version for consistency and underline
  const mainHeadingStyle = {
    fontSize: "38px",
    fontWeight: "800",
    color: "#004d4f",
    marginBottom: "20px", // Adjusted for spacing below heading
    position: "relative",
    display: "inline-block",
    paddingBottom: "10px", // Space for the underline
  };

  const mainHeadingUnderlineStyle = {
    content: '""', // This will be handled by a span
    position: "absolute",
    left: "50%",
    bottom: "0",
    transform: "translateX(-50%)",
    width: "80px",
    height: "4px",
    background: "#007a7e",
    borderRadius: "2px",
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
    padding: "26px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 12px 25px rgba(0, 122, 126, 0.1)",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    cursor: "pointer",
    height: "430px", // Fixed height for all cards
    transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Unified transition
    position: "relative",
    overflow: "hidden",
    borderBottom: "4px solid transparent", // Base for dynamic border
  };

  const cardEntranceAnimation = (idx) => ({
    opacity: animated ? 1 : 0,
    transform: animated
      ? "translateY(0) scale(1)"
      : "translateY(30px) scale(0.95)",
    // transitionDelay: `${idx * 0.1}s`, // Removed: Swiper handles slide transitions
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
    transition: "background-color 0.3s ease, transform 0.3s ease",
  };

  const iconStyle = {
    fontSize: "32px",
    color: "#007a7e",
  };

  const titleStyle = {
    fontSize: "22px",
    fontWeight: "700",
    color: "#003d3f",
    marginBottom: "15px",
    lineHeight: "1.3",
    transition: "transform 0.3s ease-out", // Added transition for bounce
  };

  const listStyle = {
    paddingLeft: "20px",
    marginBottom: "0",
    flexGrow: 1, // Allows the list to fill remaining space
    overflowY: "auto", // Add scroll if content is too long for fixed height
  };

  const listItemStyle = {
    fontSize: "15px",
    color: "#5a6778",
    lineHeight: "1.7",
    marginBottom: "10px",
    position: "relative",
  };

  return (
    <div style={sectionStyle}>
      {/* Re-integrated the original h2 with the underline span */}
      <h2 style={mainHeadingStyle}>
        Our Services
        {/* <span style={mainHeadingUnderlineStyle}></span> */}
      </h2>

      <p style={subHeadingStyle}>
        Vaidya Bandhu offers dependable healthcare services, including expert doctor consultations and
        big discounts on treatments, tests, and surgeries. Making quality healthcare simple, ethical,
        accessible, and affordable for everyone, everywhere, anytime.
      </p>

      {/* Swiper Carousel Integration */}
      <Swiper
        modules={[Pagination, Autoplay]} // Removed Navigation module
        spaceBetween={30} // Gap between slides
        slidesPerView={1} // Default to 1 slide on small screens
        centeredSlides={false} // Align slides to the left
        loop={true} // Enable infinite loop
        autoplay={{
          delay: 3000, // Autoplay delay in ms
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        pagination={{ clickable: true }} // Enable clickable pagination dots
        navigation={false} // Explicitly disable navigation arrows
        style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '50px' }} // Container for Swiper
        breakpoints={{
          // When window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {services.map((service, idx) => (
          <SwiperSlide key={idx}>
          
              <div
                style={{
                  ...cardBaseStyle,
                  ...cardEntranceAnimation(idx),
                  // Hover effects
                  ...(hoveredCard === idx && {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 25px 50px rgba(0, 122, 126, 0.35)",
                    background: "linear-gradient(135deg, #f0ffff 0%, #ffffff 100%)",
                    borderBottom: "4px solid #007a7e",
                  }),
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  style={{
                    ...iconContainerStyle,
                    ...(hoveredCard === idx && {
                      transform: "scale(1.1)",
                      backgroundColor: "#CCF5F5",
                    }),
                  }}
                >
                  <i className={service.icon} style={iconStyle}></i>
                </div>
                <h4
                  style={{
                    ...titleStyle,
                    ...(hoveredCard === idx && {
                      transform: "translateY(-3px)",
                      color: "#005f62",
                    }),
                  }}
                >
                  {service.title}
                </h4>
                <ul style={listStyle}>
                  {service.points.map((point, pIdx) => (
                    <li style={listItemStyle} key={pIdx}>
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
         
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServicesPreview;