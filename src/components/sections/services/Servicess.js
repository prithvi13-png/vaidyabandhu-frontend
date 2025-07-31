import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const services = [
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
    icon: "flaticon-doctor",
    title: "10% to 40% Discount on Surgeries & Treatments",
    points: [
      "Affordable medical procedures across all major departments.",
      "Best hospitals & specialists to ensure quality care.",
      "Seamless treatment process – from consultation to recovery.",
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
    fontFamily: "Poppins ",
  };

  const headingStyle = {
    fontSize: "48px",
    fontWeight: "800",
    color: "#004d4f",
    marginBottom: "20px",
    position: "relative",
    display: "inline-block",
  };

  const subHeadingStyle = {
    fontSize: "18px",
    color: "#4a5568",
    maxWidth: "800px",
    margin: "0 auto 60px",
    lineHeight: "1.7",
    fontWeight: "300",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive columns
    justifyContent: "center",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
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
    // Ensure all cards are the same fixed size
    width: "100%", // Takes full width of grid cell
    height: "400px", // Fixed height for all cards
    transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Unified transition
    position: "relative",
    overflow: "hidden",
    borderBottom: "4px solid transparent", // Base for dynamic border
  };

  const cardEntranceAnimation = (idx) => ({
    opacity: animated ? 1 : 0,
    transform: animated ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
    transitionDelay: `${idx * 0.1}s`, // Staggered delay for entrance
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
      <h2 style={headingStyle}>
        Our Services
        <span style={{
          content: '""',
          position: "absolute",
          left: "50%",
          bottom: "-10px",
          transform: "translateX(-50%)",
          width: "80px",
          height: "4px",
          background: "#007a7e",
          borderRadius: "2px",
        }}></span>
      </h2>
      <p style={subHeadingStyle}>
        At Vaidya Bandhu, we are committed to providing a wide range of medical services designed to meet your every need.
        From expert consultations to significant savings on treatments, discover how we make healthcare accessible.
      </p>

      <div style={gridStyle}>
        {services.map((service, idx) => (
          <Link
            to={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            key={idx}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                ...cardBaseStyle,
                ...cardEntranceAnimation(idx),
                // Hover effects
                ...(hoveredCard === idx && {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 25px 50px rgba(0, 122, 126, 0.35)", // Stronger shadow
                  background: "linear-gradient(135deg, #f0ffff 0%, #ffffff 100%)", // Subtle background shift
                  borderBottom: "4px solid #007a7e", // Primary color border
                }),
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                style={{
                  ...iconContainerStyle,
                  ...(hoveredCard === idx && {
                    transform: "scale(1.1)", // Icon slightly grows
                    backgroundColor: "#CCF5F5", // Lighter background for icon
                  }),
                }}
              >
                <i className={service.icon} style={iconStyle}></i>
              </div>
              <h4
                style={{
                  ...titleStyle,
                  ...(hoveredCard === idx && {
                    transform: "translateY(-3px)", // Title "bounces" up slightly
                  }),
                }}
              >
                {service.title}
              </h4>
              <ul style={listStyle}>
                {service.points.map((point, pIdx) => (
                  <li style={listItemStyle} key={pIdx}>
                    <span style={{ marginRight: "8px", color: "#007a7e", fontWeight: "bold" }}>•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesPreview;