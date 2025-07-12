import React, { useEffect, useState } from 'react';

const MembershipCardBenefits = () => {
  const [animated, setAnimated] = useState(false);
  const [hoveredBenefitIndex, setHoveredBenefitIndex] = useState(null); // State to track hovered benefit item

  useEffect(() => {
    // Trigger animation after component mounts with a slight delay
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    "10% to 40% discount on surgeries, treatments, and diagnostic tests.",
    "10% to 40% discounts on surgeries, treatments, and diagnostics.",
    "Valid across Karnataka at our partner hospitals and diagnostic centers.",
    "One-time payment of ₹49 – No hidden charges.",
    "Card delivered to your address after registration.",
    "Easy renewal after 1 year (If card is not used for 1 year, it will auto-renew).",
  ];

  // Placeholder image for the membership card
  const membershipCardImage = "assets/img/mm.png";

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)", // Light, inviting gradient
        textAlign: "center", // Overall text alignment for the section
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "min(120px, 12vw)",
          height: "min(120px, 12vw)",
          backgroundColor: "rgba(0, 122, 126, 0.05)",
          borderRadius: "50%",
          filter: "blur(25px)",
          animation: "floatShape1 10s infinite ease-in-out",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>
         <h2
            style={{
              fontSize: "clamp(22px, 5vw, 36px)",
              fontWeight: "800",
              color: "#004d4f",
              marginBottom: "5px",
              lineHeight: "1.2",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            ₹49 Membership Card – <span style={{ color: "#007a7e" }}>Unlock Healthcare Discounts!</span>
          </h2>

          {/* Introductory Paragraph */}
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "#4a5568",
              lineHeight: "1.4",
              fontWeight: "400",
              marginBottom: "10px", // Adjusted margin
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
            }}
          >
            To make affordable healthcare accessible to all, we offer a<br/> ₹49 membership card, valid for 1 year.
          </p>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "min(150px, 15vw)",
          height: "min(150px, 15vw)",
          backgroundColor: "rgba(0, 122, 126, 0.03)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "floatShape2 12s infinite ease-in-out",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          width: "90%",
          maxWidth: "1200px", // Increased max width for content to accommodate image
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "flex", // Use flexbox for main content layout
          flexWrap: "wrap", // Allow items to wrap on smaller screens
          justifyContent: "space-between", // Distribute space between image and content
          alignItems: "center", // Center items vertically
          gap: "30px", // Gap between image and text content
        }}
      >
        {/* Membership Card Image Section (Left Side) */}
        <div
          style={{
            flex: "1 1 400px", // Allow image section to grow/shrink, base width 400px
            maxWidth: "500px", // Max width for the image container
            textAlign: "center", // Center image within its container
            opacity: animated ? 1 : 0,
            transform: animated ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
            transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
            order: 1, // Ensure it's the first item in the flex container
          }}
        >
        <img
  src={membershipCardImage}
  alt="Vaidya Bandhu Membership Card"
  style={{
    width: "100%",                // Let it scale up to container width
    maxWidth: "500px",            // Increased max width
    height: "auto",               // Maintain aspect ratio
    borderRadius: "15px",
    boxShadow: "0 15px 30px rgba(0, 122, 126, 0.2)",
    border: "3px solid #007a7e",
    display: "block",             // Remove inline gap
    margin: "0 auto",             // Center if needed
  }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/500x300/CCCCCC/666666?text=Card+Image+Error";
  }}
/>

        </div>

        {/* Text Content Section (Right Side) */}
        <div
          style={{
            flex: "1 1 500px", // Allow text section to grow/shrink, base width 500px
            maxWidth: "600px", // Max width for the text content
            textAlign: "left", // Align text left within this section
            order: 2, // Ensure it's the second item in the flex container
          }}
        >
          {/* Main Heading */}
       

          {/* Benefits Section - Clean List Layout */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              textAlign: "left",
              // Max width for benefits list within the text content section
              maxWidth: "100%",
            }}
          >
            {/* <h3
              style={{
                fontSize: "clamp(24px, 3.5vw, 22px)",
                fontWeight: "600",
                color: "#004d4f",
                marginBottom: "5px",
                textAlign: "left", // Align this heading left
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s",
              }}
            >
              Benefits of the Membership Card:
            </h3> */}
            {benefits.map((benefit, index) => (
              <div
                key={index}
                style={{
                      marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 6px", // Reduced vertical padding, removed horizontal
                  borderBottom: "1px solid rgba(0, 122, 126, 0.1)", // Subtle separator
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${0.6 + index * 0.1}s`, // Staggered entrance animation
                  transition: `opacity 0.8s ease-out ${0.6 + index * 0.1}s, transform 0.8s ease-out ${0.6 + index * 0.1}s, background 0.3s ease-in-out, transform 0.3s ease-in-out`, // Added background and transform for hover
                  cursor: "pointer",
                  background: hoveredBenefitIndex === index ? "rgba(0, 122, 126, 0.05)" : "transparent",
                  borderRadius: "8px",
                  ...(hoveredBenefitIndex === index && {
                    transform: "translateX(5px)", // Slight slide on hover
                  }),
                }}
                onMouseEnter={() => setHoveredBenefitIndex(index)}
                onMouseLeave={() => setHoveredBenefitIndex(null)}
              >
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    background: "#007a7e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "15px",
                    boxShadow: "0 2px 8px rgba(0, 122, 126, 0.2)",
                    flexShrink: 0,
                    transition: "transform 0.3s ease-in-out",
                    ...(hoveredBenefitIndex === index && {
                      transform: "scale(1.1)", // Checkmark scales on hover
                    }),
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "18px",
                      lineHeight: "1",
                    }}
                  >
                    ✔
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "clamp(16px, 2vw, 18px)",
                    color: "#4a5568",
                    lineHeight: "1.4",
                    margin: 0,
                  }}
                >
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes for the floating background shapes */}
      <style>
        {`
          @keyframes floatShape1 {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(20px, 20px) rotate(5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes floatShape2 {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-20px, -20px) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }

          /* Responsive adjustments using media queries */
          @media (max-width: 992px) { /* Adjust for tablet/smaller desktop */
            div[style*="width: 90%"] { /* Main content wrapper */
              flex-direction: column !important; /* Stack image and text vertically */
              gap: 50px !important; /* Gap when stacked */
            }
            div[style*="flex: 1 1 400px"] { /* Image section */
              max-width: 80% !important; /* Wider image on smaller screens */
              order: 1 !important; /* Keep image first when stacked */
            }
            div[style*="flex: 1 1 500px"] { /* Text content section */
              max-width: 95% !important; /* Wider text content */
              order: 2 !important; /* Keep text second when stacked */
            }
            h2 {
              text-align: center !important; /* Center heading when stacked */
            }
            p[style*="font-size: clamp(16px, 2.5vw, 20px)"] {
              text-align: center !important; /* Center intro paragraph when stacked */
            }
            h3 {
              text-align: center !important; /* Center benefits heading when stacked */
            }
          }

          @media (max-width: 768px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 60px 15px !important;
            }
            div[style*="width: 90%"] { /* Main content wrapper */
              width: 95% !important;
            }
            div[style*="flex-direction: column"] { /* Benefits section gap */
              gap: 15px !important;
            }
            div[style*="width: 35px"] { /* Checkmark container size */
              width: 30px !important;
              height: 30px !important;
            }
            span[style*="font-size: 20px"] { /* Checkmark size */
              font-size: 18px !important;
            }
            div[style*="padding: 15px 0"] { /* Benefit items padding */
              padding: 12px 15px !important;
            }
          }

          @media (max-width: 480px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 40px 10px !important;
            }
            div[style*="width: 90%"] { /* Main content wrapper */
              width: 100% !important;
              padding: 0 10px;
              box-sizing: border-box;
            }
            div[style*="flex-direction: column"] { /* Benefits section gap */
              gap: 10px !important;
            }
            div[style*="width: 35px"] { /* Checkmark container size */
              width: 28px !important;
              height: 28px !important;
            }
            span[style*="font-size: 20px"] { /* Checkmark size */
              font-size: 16px !important;
            }
            div[style*="padding: 15px 20px"] { /* Benefit items padding */
              padding: 10px 12px !important;
            }
            div[style*="flex: 1 1 400px"] { /* Image section */
              max-width: 90% !important; /* Even wider image on mobile */
            }
          }
        `}
      </style>
    </div>
  );
};

export default MembershipCardBenefits;
