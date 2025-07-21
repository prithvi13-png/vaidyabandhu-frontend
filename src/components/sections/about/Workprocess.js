import React, { Component } from "react";
import MembershipModal from "../../layouts/MembershipModal";
import workprocessblock from "../../../data/workprocess.json";
import "../../../assets/css/about.css";

// Updated dummy workprocess data with 3 steps and new content
const dummyWorkprocess = [
  {
    title: "Get Your <br/>₹49 Membership Card",
    points: [
      "Fill out the membership form (Name, Address, Phone Number; PAN & Aadhaar optional).",
      "Pay ₹49 (valid for 1 year).",
      "Receive your membership card at your doorstep.",
    ],
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3135/3135768.png", // ID card icon
  },
  {
    title: "Access Quality Healthcare <br/>at Affordable Rates",
    points: [
      "Call or Email Us – Tell us your medical concern.",
      "Consult Top Doctors – We connect you with the best specialists.",
      "Avail 10% to 40% Discounts – On surgeries, treatments, and diagnostics.",
      "Visit Partner Hospitals & Diagnostic Centers – Use your membership card to get benefits.",
    ],
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3209/3209265.png", // Doctor and hospital icon
  },
  {
    title: "Get Complete <br/>Healthcare Support",
    points: [
      "Free Medical Advice – Talk to our experts anytime.",
      "Best Treatment Plans – We help you choose the right hospital and doctor.",
      "Priority Support for Critical Cases – Quick access to necessary treatments.",
    ],
    imageUrl: "https://cdn-icons-png.flaticon.com/128/2991/2991158.png", // Support/help icon
  },
];

class Workprocess extends Component {
  render() {
    return (
      <div
        className="section about-section"
        style={{
          padding: "40px 20px",
          background: "linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)", // Light, calming gradient
          fontFamily: "'Inter', sans-serif",
          color: "#4a5568",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "min(100px, 10vw)",
            height: "min(100px, 10vw)",
            backgroundColor: "rgba(0, 122, 126, 0.05)",
            borderRadius: "50%",
            filter: "blur(20px)",
            animation: "floatShape1 10s infinite ease-in-out",
            opacity: 1,
            transition: "opacity 1s ease-out",
            zIndex: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            width: "min(130px, 13vw)",
            height: "min(130px, 13vw)",
            backgroundColor: "rgba(0, 122, 126, 0.03)",
            borderRadius: "50%",
            filter: "blur(25px)",
            animation: "floatShape2 12s infinite ease-in-out",
            opacity: 1,
            transition: "opacity 1s ease-out",
            zIndex: 0,
          }}
        ></div>

        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              // display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "30px",
              gap: "20px", // Gap for responsive wrapping
            }}
          >
            <div style={{ flex: "1 1 300px", textAlign: "center" }}>
              {" "}
              {/* col-lg-5 equivalent */}
              <div
                className="section-title"
                style={{
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                  display: "inline-block", // Ensures the title doesn't stretch full width
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(36px, 5vw, 38px)",
                    fontWeight: "800",
                    color: "#004d4f",
                    marginBottom: "0",
                    lineHeight: "1.2",
                    textAlign: "center",
                  }}
                >
                  How it Works?
                </h3>
              </div>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              {" "}
              {/* col-lg-4 equivalent */}
              <p
                style={{
                  fontSize: "clamp(16px, 2.5vw, 18px)",
                  color: "#4a5568",
                  lineHeight: "1.4",
                  marginBottom: "0",
                  opacity: 1,
                  transform: "translateY(0)",
                  transition:
                    "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                }}
              >
                At Vaidya Bandhu, we make quality healthcare simple, affordable,
                and accessible. Here’s how you can benefit from our services
              </p>
            </div>
            <div style={{ flex: "1 1 auto", textAlign: "right" }}>
              {" "}
              {/* col-lg-3 equivalent */}
              <MembershipModal />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Adjusted minmax to potentially fit more on a row
              gap: "30px",
            }}
          >
            {dummyWorkprocess.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 8px 20px rgba(0, 122, 126, 0.08)",
                  overflow: "hidden",
                  padding: "30px",
                  textAlign: "left",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: 1,
                  transform: "translateY(0)",
                  transitionDelay: `${0.4 + i * 0.1}s`, // Staggered animation
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#e6fffa", // Icon background changes on hover
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    boxShadow: "0 4px 12px rgba(0, 122, 126, 0.15)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    flexShrink: 0,
                  }}
                >
                  {/* Replaced span with img for step icon */}
                  <img
                    src={item.imageUrl}
                    alt={`Step ${i + 1}`}
                    style={{
                      width: "100%", // Image fills the circular div
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover", // Ensures the image covers the area without distortion
                      transition:
                        "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/60x60/CCCCCC/666666?text=${
                        i + 1
                      }`;
                    }}
                  />
                </div>
                <h5
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 22px)",
                    fontWeight: "700",
                    color: "#004d4f",
                    marginBottom: "15px",
                    lineHeight: "1.3",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "0",
                    marginTop: "0",
                    flexGrow: 1,
                    color: "#5a6778",
                    fontSize: "clamp(15px, 1.8vw, 16px)",
                    lineHeight: "1.3", // Tightest line spacing
                  }}
                >
                  {item.points.map((point, j) => (
                    <li
                      key={j}
                      style={{
                        margin: "0", // No margin at all
                        listStyle: "disc",
                      }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <span
                  className="steps"
                  style={{
                    fontSize: "clamp(28px, 4vw, 36px)",
                    fontWeight: "800",
                    color: "rgba(0, 77, 79, 0.1)", // Faded step number
                    position: "absolute",
                    bottom: "15px",
                    right: "20px",
                    zIndex: 0,
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  Step {i + 1}
                </span>
                <span
                  className="pulsive-dot"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: "#007a7e",
                    boxShadow: "0 0 0 0 rgba(0, 122, 126, 0.7)",
                    animation: "pulse 2s infinite",
                    zIndex: 1,
                    display: "none", // Show only on hover
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Keyframes for animations */}
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
          @keyframes pulse {
            0% {
              transform: scale(0.9);
              box-shadow: 0 0 0 0 rgba(0, 122, 126, 0.7);
            }
            70% {
              transform: scale(1.2);
              box-shadow: 0 0 0 15px rgba(0, 122, 126, 0);
            }
            100% {
              transform: scale(0.9);
              box-shadow: 0 0 0 0 rgba(0, 122, 126, 0);
            }
          }

          /* Responsive adjustments */
          @media (max-width: 992px) {
            div[style*="flex: 1 1 300px"] { /* Header columns */
                flex-basis: 100% !important;
                text-align: center !important;
            }
            div[style*="flex: 1 1 auto"] { /* Button column */
                text-align: center !important;
            }
            h3[style*="font-size: clamp(36px, 5vw, 48px)"] { /* How it Works title */
                font-size: clamp(32px, 6vw, 40px) !important;
            }
            p[style*="font-size: clamp(16px, 2.5vw, 18px)"] { /* Intro paragraph */
                font-size: clamp(15px, 2.8vw, 17px) !important;
            }
            a[href="/appointment"] { /* Get Membership button */
                font-size: 16px !important;
                padding: 10px 20px !important;
            }
          }

          @media (max-width: 768px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 60px 15px !important;
            }
            h3[style*="font-size: clamp(36px, 5vw, 48px)"] { /* How it Works title */
                font-size: clamp(28px, 7vw, 36px) !important;
            }
            p[style*="font-size: clamp(16px, 2.5vw, 18px)"] { /* Intro paragraph */
                font-size: clamp(14px, 3vw, 16px) !important;
            }
            div[style*="padding: 30px"] { /* Card padding */
              padding: 25px !important;
            }
            div[style*="width: 60px"] { /* Icon circle */
                width: 50px !important;
                height: 50px !important;
                margin-bottom: 15px !important;
            }
            img[alt^="Step"] { /* Image inside icon circle */
                width: 100% !important;
                height: 100% !important;
            }
            h5[style*="font-size: clamp(20px, 2.5vw, 24px)"] { /* Step title */
                font-size: clamp(18px, 3vw, 22px) !important;
            }
            ul[style*="font-size: clamp(15px, 1.8vw, 16px)"] { /* List items */
                font-size: clamp(14px, 2.5vw, 15px) !important;
            }
            span.steps { /* Faded step text */
                font-size: clamp(24px, 5vw, 32px) !important;
                bottom: 10px !important;
                right: 15px !important;
            }
            span.pulsive-dot { /* Pulsing dot */
                width: 12px !important;
                height: 12px !important;
                top: 15px !important;
                right: 15px !important;
            }
          }

          @media (max-width: 480px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 40px 10px !important;
            }
            div[style*="padding: 30px"] { /* Card padding */
              padding: 20px !important;
            }
            div[style*="width: 60px"] { /* Icon circle */
                width: 45px !important;
                height: 45px !important;
                margin-bottom: 8px !important;
            }
            img[alt^="Step"] { /* Image inside icon circle */
                width: 100% !important;
                height: 100% !important;
            }
            h5[style*="font-size: clamp(20px, 2.5vw, 24px)"] { /* Step title */
                font-size: clamp(16px, 4vw, 20px) !important;
                margin-bottom: 6px !important;
                line-height: 1.2 !important;
            }
            ul[style*="font-size: clamp(15px, 1.8vw, 16px)"] { /* List items */
                font-size: clamp(13px, 3vw, 14px) !important;
                line-height: 1.1 !important;
                padding-left: 12px !important;
            }
            ul[style*="font-size: clamp(15px, 1.8vw, 16px)"] li {
                margin-bottom: 2px !important;
            }
            span.steps { /* Faded step text */
                font-size: clamp(20px, 6vw, 28px) !important;
                bottom: 8px !important;
                right: 10px !important;
            }
            span.pulsive-dot { /* Pulsing dot */
                width: 10px !important;
                height: 10px !important;
                top: 10px !important;
                right: 10px !important;
            }
          }
        `}
        </style>
      </div>
    );
  }
}

export default Workprocess;
