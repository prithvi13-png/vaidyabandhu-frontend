import React, { useState, useEffect } from "react";

const WhoCanBenefit = () => {
  const [itemsVisible, setItemsVisible] = useState({});
  const [animated, setAnimated] = useState(false);
  const [hoveredHeading, setHoveredHeading] = useState(false);

  useEffect(() => {
    const sectionTimer = setTimeout(() => setAnimated(true), 200);
    const itemTimers = [];
    const items = [
      "Patients who need affordable treatments & surgeries",
      "Families looking for trusted doctors & hospitals",
      "Needy individuals requiring free medical support",
      "Anyone who wants guidance for the best healthcare options",
    ];
    items.forEach((_, index) => {
      const timer = setTimeout(() => {
        setItemsVisible((prev) => ({ ...prev, [index]: true }));
      }, 600 + index * 150);
      itemTimers.push(timer);
    });
    return () => {
      clearTimeout(sectionTimer);
      itemTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const baseTransition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  return (
    <section
      style={{
        padding: "60px 20px",
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
        fontFamily: "Poppins",
        color: "#4a5568",
        lineHeight: "1.4",
        overflow: "hidden",
        position: "relative",
        opacity: animated ? 1 : 0,
        transform: animated ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
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
          zIndex: 0,
        }}
      ></div>
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
          zIndex: 0,
        }}
      ></div>

      <div
        className="container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 34px)",
            fontWeight: 800,
            color: "#004d4f",
            position: "relative",
            paddingBottom: "10px",
            textAlign: "center",
            fontFamily: "Poppins",
            marginBottom: "40px",
            transition: baseTransition,
          }}
          onMouseEnter={() => setHoveredHeading(true)}
          onMouseLeave={() => setHoveredHeading(false)}
        >
          Who Can{" "}
          <span style={{ color: "#007a7e" }}>Benefit</span>?
        </h2>

        <div
          className="who-flex-wrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            marginTop: "0",
          }}
        >
          {/* Image Column */}
          <div
            className="image-column"
            style={{
              flex: "0 0 45%",
              maxWidth: "45%",
              textAlign: "center",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(-50px)",
              transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
            }}
          >
            <img
              src="https://placehold.co/600x400/007a7e/ffffff?text=People+Benefiting"
              alt="People benefiting from healthcare"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0 15px 40px rgba(0, 122, 126, 0.15)",
                transition: baseTransition,
              }}
            />
          </div>

          {/* Content Column */}
          <div
            className="content-column"
            style={{
              flex: "0 0 50%",
              maxWidth: "50%",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(50px)",
              transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                "Patients who need affordable treatments & surgeries",
                "Families looking for trusted doctors & hospitals",
                "Needy individuals requiring free medical support",
                "Anyone who wants guidance for the best healthcare options",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "clamp(16px, 2.2vw, 18px)",
                    fontFamily: "Poppins",
                    color: "#4a5568",
                    display: "flex",
                    alignItems: "flex-start",
                    backgroundColor: "#FFFFFF",
                    padding: "18px 25px",
                    borderRadius: "12px",
                    boxShadow: itemsVisible[index]
                      ? "0 6px 18px rgba(0, 122, 126, 0.08)"
                      : "none",
                    borderLeft: `4px solid #007a7e`,
                    transition: `transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.6s ease-out`,
                    opacity: itemsVisible[index] ? 1 : 0,
                    transform: itemsVisible[index] ? "translateY(0)" : "translateY(30px)",
                    lineHeight: "1.5",
                    minHeight: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 122, 126, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 122, 126, 0.08)";
                  }}
                >
                  <span
                    style={{
                      marginRight: "16px",
                      color: "#007a7e",
                      fontSize: "1.4rem",
                      lineHeight: "1",
                      flexShrink: 0,
                      marginTop: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ flex: 1 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
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

          /* Desktop - maintain side by side layout */
          @media (min-width: 769px) {
            .who-flex-wrap {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
              justify-content: space-between !important;
              gap: 40px !important;
            }
            
            .image-column {
              flex: 0 0 45% !important;
              max-width: 45% !important;
            }
            
            .content-column {
              flex: 0 0 50% !important;
              max-width: 50% !important;
            }
            
            .content-column ul li {
              padding: 24px 35px !important;
              font-size: clamp(17px, 1.8vw, 19px) !important;
              margin-bottom: 0 !important;
            }
            
            .content-column ul {
              gap: 20px !important;
            }
            
            .content-column ul li span:first-child {
              margin-right: 20px !important;
              font-size: 1.5rem !important;
            }
          }

          /* Tablet and mobile adjustments */
          @media (max-width: 768px) {
            .who-flex-wrap {
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              gap: 30px !important;
            }
            
            .image-column {
              flex: none !important;
              max-width: 100% !important;
              order: 1;
            }
            
            .content-column {
              flex: none !important;
              max-width: 100% !important;
              order: 2;
            }
            
            .content-column ul {
              gap: 14px !important;
            }
            
            .content-column ul li {
              padding: 16px 20px !important;
              font-size: clamp(15px, 3vw, 17px) !important;
            }
            
            .content-column ul li span:first-child {
              margin-right: 14px !important;
              font-size: 1.2rem !important;
            }
            
            h2 {
              margin-bottom: 30px !important;
            }
          }

          /* Extra small devices */
          @media (max-width: 480px) {
            section {
              padding: 40px 15px !important;
            }
            
            .who-flex-wrap {
              gap: 25px !important;
            }
            
            .content-column ul {
              gap: 12px !important;
            }
            
            .content-column ul li {
              padding: 14px 18px !important;
              font-size: 14px !important;
              border-left-width: 3px !important;
            }
            
            .content-column ul li span:first-child {
              margin-right: 12px !important;
              font-size: 1.1rem !important;
            }
            
            h2 {
              font-size: clamp(28px, 6vw, 32px) !important;
              margin-bottom: 25px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default WhoCanBenefit;