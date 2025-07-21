import React, { useState, useEffect } from "react";
import "../../../assets/css/about.css";

const baseTransition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";

const OurStory = () => {
  const [animated, setAnimated] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="about-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about-section-title text-center">
              <span className="subtitle">Our Story</span>
              <h2>Leading the Way in Holistic Healthcare</h2>
              <p
                style={{
                  fontSize: "clamp(16px, 2.5vw, 20px)", // Responsive font size
                  color: "#4a5568", // Same color
                  lineHeight: "1.7", // Matched line height
                  fontWeight: "400",
                  marginBottom: "10px",
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s",
                }}
              >
                At Vaidyabandhu, we blend ancient wisdom with modern healthcare
                practices to provide comprehensive wellness solutions. Our
                journey began with a vision to make authentic Ayurvedic
                treatments accessible to all.
              </p>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{ display: "flex", flexDirection: "column", gap: "40px" }}
        >
          {" "}
          {/* Increased gap */}
          {/* Our Story Section */}
          <div
            className={`about-story-card ${animated ? "animated" : ""} ${
              hoveredSection === "story" ? "hovered" : ""
            }`}
            style={{
              padding: "30px" /* Increased padding within the card */,
              backgroundColor:
                "#FFFFFF" /* Pure white background for a crisp look */,
              borderRadius: "20px" /* More rounded corners */,
              border:
                "1px solid rgba(0, 77, 79, 0.1)" /* Subtle border matching dark primary */,
              opacity: animated ? 1 : 0,
              transform: animated
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.98)", // More pronounced entrance
              transitionDelay: "0.2s",
            }}
            onMouseEnter={() => setHoveredSection("story")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2
              style={{
                fontSize:
                  "clamp(24px, 4.5vw, 38px)" /* Larger, responsive title size */,
                fontWeight: 800, // Bolder
                color: "#004d4f" /* Dark teal for headings */,
                position: "relative",
                paddingBottom: "10px", // More space for underline
                textAlign: "center",
                marginBottom: "10px", // More space below title
              }}
            >
              Our <span style={{ color: "#007a7e" }}>Story</span>
              {/* Custom underline effect: double line */}
            </h2>
            <p
              style={{
                fontSize: "clamp(17px, 2.2vw, 19px)",
                color: "#4a5568",
                marginBottom: "20px",
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s`,
              }}
            >
              Healthcare is a basic necessity, yet millions of people struggle
              to afford quality medical care. High treatment costs, lack of
              guidance, and financial stress prevent many from getting the care
              they need.
            </p>
            <p
              style={{
                fontSize: "clamp(17px, 2.2vw, 19px)",
                color: "#4a5568",
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s`,
              }}
            >
              Understanding these challenges,{" "}
              <strong style={{ color: "#007a7e" }}>
                Vaidya Bandhu was created to bridge the gap between patients and
                affordable healthcare.
              </strong>
              Our goal is simple: No one should suffer due to financial
              limitations.
            </p>
          </div>
          {/* Our Vision Section */}
          <div
            style={{
              padding: "40px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid rgba(0, 77, 79, 0.1)",
              boxShadow:
                hoveredSection === "vision"
                  ? "0 25px 60px rgba(0, 77, 79, 0.25)"
                  : "0 12px 35px rgba(0, 77, 79, 0.12)",
              transition: baseTransition,
              opacity: animated ? 1 : 0,
              transform: animated
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.98)",
              transitionDelay: "0.4s",
            }}
            onMouseEnter={() => setHoveredSection("vision")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2
              style={{
                fontSize: "clamp(32px, 4.5vw, 38px)",
                fontWeight: 800,
                color: "#004d4f",
                position: "relative",
                paddingBottom: "10px",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              Our <span style={{ color: "#007a7e" }}>Vision</span>
            </h2>
            <p
              style={{
                fontWeight: 600,
                color: "#007a7e", // Bright teal accent for vision statement
                fontSize:
                  "clamp(20px, 3vw, 22px)" /* Larger font size for vision statement */,
                textAlign: "center",
                padding: "10px 20px" /* More padding for emphasis */,
                backgroundColor:
                  "rgba(0, 122, 126, 0.05)" /* Subtle background highlight */,
                borderRadius: "18px", // Slightly more rounded
                border:
                  "1px solid #007a7e" /* Solid border matching primary accent */,
                boxShadow:
                  "0 10px 25px rgba(0, 122, 126, 0.15)" /* More prominent shadow */,
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s`,
              }}
            >
              To create a nationwide ecosystem where patients are respected,
              doctors are honoured, and care comes before commerce.
            </p>
          </div>
          {/* Our Mission Section */}
          <div
            style={{
              padding: "40px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid rgba(0, 77, 79, 0.1)",
              boxShadow:
                hoveredSection === "mission"
                  ? "0 25px 60px rgba(0, 77, 79, 0.25)"
                  : "0 12px 35px rgba(0, 77, 79, 0.12)",
              transition: baseTransition,
              opacity: animated ? 1 : 0,
              transform: animated
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.98)",
              transitionDelay: "0.6s",
            }}
            onMouseEnter={() => setHoveredSection("mission")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2
              style={{
                fontSize: "clamp(32px, 4.5vw, 38px)",
                fontWeight: 800,
                color: "#004d4f",
                position: "relative",
                paddingBottom: "10px",
                textAlign: "center", // Centered title for mission
                marginBottom: "10px",
              }}
            >
              Our <span style={{ color: "#007a7e" }}>Mission</span>
            </h2>
            <p
              style={{
                marginBottom: "25px",
                fontSize: "clamp(17px, 2.2vw, 19px)",
                color: "#4a5568",
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto 25px",
              }}
            >
              To empower patients with timely medical guidance, trusted hospital
              access, and compassionate support throughout their healthcare
              journey.
            </p>

            {/* Mission Content: Image Left, Text Right */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap", // Allow wrapping on smaller screens
                alignItems: "center", // Vertically align items
                gap: "30px", // Gap between image and text
              }}
            >
              {/* Left Column: Image for Mission */}
              <div
                style={{
                  flex: "1 1 300px", // Flexible width, minimum 300px
                  maxWidth: "40%", // Max 40% width on larger screens
                  textAlign: "center",
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateX(0)" : "translateX(-50px)", // Slide in from left
                  transition: `opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s`,
                }}
              >
                <img
                  src="assets/img/cvv.jpeg"
                  alt="Our Mission"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "800px", // You can adjust this value as needed
                    objectFit: "contain", // Ensures full image is shown without cropping
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0, 122, 126, 0.1)",
                    transition: baseTransition,
                  }}
                />
              </div>

              {/* Right Column: Mission Text Content */}
              <div
                style={{
                  flex: "1 1 400px", // Flexible width, minimum 400px
                  maxWidth: "60%", // Max 60% width on larger screens
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateX(0)" : "translateX(50px)", // Slide in from right
                  transition: `opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s`,
                }}
              >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Provide 10 - 40% discounts on surgeries, treatments, and diagnostics.",
                    "Offer free medical guidance to help people make informed decisions.",
                    "10% CASHBACK BENEFIT - Submit bill/invoice within 7 days via WhatsApp/email  - Get 10% cashback credited to your account.",
                    "Connect patients with top doctors in every medical department.",
                    "Support underprivileged patients by arranging free surgeries.",
                    "Expand our network of hospitals & diagnostic centers across India.",
                  ].map((item, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "15px" /* Spacing for list items */,
                        fontSize:
                          "clamp(13px, 1.8vw, 15px)" /* Font for list items */,
                        color: "#4a5568",
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "15px 25px" /* Padding for list items */,
                        backgroundColor:
                          "rgba(0, 122, 126, 0.03)" /* Subtle teal background for each list item */,
                        borderRadius:
                          "12px" /* Rounded corners for list items */,
                        border:
                          "1px solid rgba(0, 122, 126, 0.1)" /* Consistent border */,
                        boxShadow:
                          "0 4px 12px rgba(0, 77, 79, 0.06)" /* Subtle shadow */,
                        opacity: animated ? 1 : 0,
                        transform: animated
                          ? "translateY(0)"
                          : "translateY(15px)",
                        transition: `opacity 0.8s ease-out ${
                          1.0 + index * 0.1
                        }s, transform 0.8s ease-out ${1.0 + index * 0.1}s`, // Staggered list item animation
                      }}
                    >
                      <span
                        style={{
                          marginRight: "18px",
                          color: "#007a7e",
                          fontSize: "1.6rem",
                          lineHeight: "1",
                          flexShrink: 0,
                        }}
                      >
                        ✔
                      </span>{" "}
                      {/* Accent color checkmark */}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for the floating background shapes */}
      <style>
        {`
          @keyframes floatShape1 {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(25px, 25px) rotate(7deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes floatShape2 {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-25px, -25px) rotate(-7deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }

          /* Responsive adjustments */
          @media (max-width: 992px) {
            .row[style*="flex-direction: column"] > div { /* All main section cards */
                padding: 30px !important; /* Adjust card padding */
            }
            h2[style*="font-size: clamp(24px, 4.5vw, 40px)"] { /* Section titles */
              font-size: clamp(28px, 5.5vw, 36px) !important;
              padding-bottom: 15px !important;
            }
            h2 span[style*="bottom: 12px"] { /* Underline position */
                bottom: 8px !important;
            }
            h2 span[style*="bottom: 0"] { /* Underline position */
                bottom: -2px !important;
            }
            p[style*="font-size: clamp(17px, 2.2vw, 19px)"],
            p[style*="font-size: clamp(20px, 3vw, 24px)"],
            li[style*="font-size: clamp(16px, 2vw, 18px)"] { /* Paragraphs and list items */
              font-size: clamp(16px, 2.8vw, 18px) !important;
            }
            li span[style*="font-size: 1.6rem"] { /* Checkmark size */
              font-size: 1.4rem !important;
              margin-right: 12px !important;
            }
            ul li { /* List item spacing */
              margin-bottom: 12px !important;
            }
            div[style*="gap: 60px"] { /* Gap between sections */
                gap: 40px !important;
            }

            /* Mission section specific adjustments for stacking */
            div[style*="display: flex"][style*="flex-wrap: wrap"][style*="gap: 30px"] { /* Mission's inner flex container */
                flex-direction: column !important; /* Stack image and text */
                gap: 30px !important; /* Adjust gap when stacked */
            }
            div[style*="flex: 1 1 300px"][style*="max-width: 40%"], /* Mission image column */
            div[style*="flex: 1 1 400px"][style*="max-width: 60%"] { /* Mission content column */
                max-width: 100% !important; /* Take full width when stacked */
                text-align: center !important; /* Center image and content */
            }
            div[style*="flex: 1 1 400px"] p, div[style*="flex: 1 1 400px"] ul { /* Mission content alignment */
                text-align: left !important; /* Keep text aligned left within its container */
            }
          }

@media (max-width: 480px) {
  /* Reduce top & bottom spacing for the section */
  .leadership-section {
    padding-top: 100px !important;
    padding-bottom: 20px !important;
  }

  /* Reduce inner white card padding and margin */
  div[style*="padding: 40px"] {
    padding: 15px !important;
    margin-top: 30px !important;
    margin-bottom: 10px !important;
  }

  /* Reduce gap between stacked items */
  div[style*="flex-direction: column"][style*="gap: 40px"] {
    gap: 0 !important;
  }

  /* Adjust image size */
  img[style*="width: 150px"] {
    width: 100px !important;
    height: 100px !important;
  }

  /* Reduce heading font size */
  h2[style*="font-size"] {
    font-size: 18px !important;
  }

  /* Optional: Center-align image if needed */
  img {
    display: block !important;
    margin: 0 auto !important;
  }

  /* ✅ New: Reduce mission list item font size on mobile */
  .mission-list-item {
    font-size: 13px !important;
  }

  /* Optional: Reduce ✔ icon size in list */
  .mission-list-item span {
    font-size: 1.2rem !important;
    margin-right: 10px !important;
  }
}



        `}
      </style>
    </section>
  );
};

export default OurStory;
