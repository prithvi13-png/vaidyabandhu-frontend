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
        padding: "40px 20px",
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
        fontFamily: "'Poppins', sans-serif",
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
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "0",
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
            display: "flex", // This will be overridden on mobile
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            marginTop: "10px",
          }}
        >
          {/* Image Column */}
          <div
            style={{
              flex: "1 1 400px",
              maxWidth: "50%",
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
                maxWidth: "100%",
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0 15px 40px rgba(0, 122, 126, 0.15)",
                transition: baseTransition,
              }}
            />
          </div>

          {/* Content Column */}
          <div
            style={{
              flex: "1 1 500px",
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
                paddingTop: "25px",
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
                    marginBottom: "20px",
                    fontSize: "clamp(17px, 2.2vw, 19px)",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#4a5568",
                    display: "flex",
                    alignItems: "flex-start",
                    backgroundColor: "#FFFFFF",
                    padding: "20px 30px 20px 40px",
                    borderRadius: "15px",
                    boxShadow: itemsVisible[index]
                      ? "0 8px 20px rgba(0, 122, 126, 0.08)"
                      : "none",
                    borderLeft: `6px solid #007a7e`,
                    transition: `transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.6s ease-out`,
                    opacity: itemsVisible[index] ? 1 : 0,
                    transform: itemsVisible[index] ? "translateY(0)" : "translateY(30px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
                    e.currentTarget.style.boxShadow = "0 18px 40px rgba(0, 122, 126, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 122, 126, 0.08)";
                  }}
                >
                  <span
                    style={{
                      marginRight: "20px",
                      color: "#007a7e",
                      fontSize: "1.8rem",
                      lineHeight: "1",
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  >
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Responsive CSS: Remove flex on mobile */}
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

          /* MOBILE: Remove flex layout and stack elements */
          @media (max-width: 768px) {
            .who-flex-wrap {
              display: block !important; /* Removes flex behavior */
            }
            .who-flex-wrap > div {
              display: block !important;
              max-width: 100% !important;
              margin: 0 auto 20px !important;
              flex: none !important;
            }
            .who-flex-wrap > div:last-child {
              margin-top: 30px !important; /* Space between image and list */
            }
            h2 {
              text-align: center !important;
            }
          }

          /* Extra small devices */
          @media (max-width: 480px) {
            .who-flex-wrap {
              padding: 0 10px;
            }
            .who-flex-wrap > div {
              margin-bottom: 25px !important;
            }
            ul li {
              padding: 14px 16px !important;
              margin-bottom: 12px !important;
              font-size: 15px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default WhoCanBenefit;