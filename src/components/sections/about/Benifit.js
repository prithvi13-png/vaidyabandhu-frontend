import React, { useState, useEffect } from "react";

const WhoCanBenefit = () => {
  const [itemsVisible, setItemsVisible] = useState({});
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const sectionTimer = setTimeout(() => setAnimated(true), 200);
    const itemTimers = [];
    [
      "Patients who need affordable treatments & surgeries",
      "Families looking for trusted doctors & hospitals",
      "Needy individuals requiring free medical support",
      "Anyone who wants guidance for the best healthcare options",
    ].forEach((item, index) => {
      const timer = setTimeout(() => {
        setItemsVisible((prev) => ({ ...prev, [index]: true }));
      }, 600 + index * 150);
      itemTimers.push(timer);
    });

    return () => {
      clearTimeout(sectionTimer);
      itemTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <section
      style={{
        padding: "30px 20px 20px",
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
        fontFamily: "'Inter', sans-serif",
        color: "#4a5568",
        lineHeight: "1.4",
        overflow: "hidden",
        position: "relative",
        opacity: animated ? 1 : 0,
        transform: animated ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
      }}
    >
      {/* Decorative background shapes */}
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
      />
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
      />

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
        <h2 className="benefit-heading">
          Who Can <span className="highlight">Benefit</span>?
        </h2>

        <div className="who-flex-wrap">
          {/* Image */}
          <div
            className="benefit-image"
            style={{
              maxWidth: "45%",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(-50px)",
              transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
            }}
          >
            <img
              src="assets/img/ms.jpg"
              alt="People benefiting from healthcare"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0 15px 40px rgba(0, 122, 126, 0.15)",
              }}
            />
          </div>

          {/* Text Content */}
          <div
            className="benefit-text"
            style={{
              // flex: "1 1 500px",
              maxWidth: "50%",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(50px)",
              transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Patients who need affordable treatments & surgeries",
                "Families looking for trusted doctors & hospitals",
                "Needy individuals requiring free medical support",
                "Anyone who wants guidance for the best healthcare options",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "15px",
                    padding: "15px 25px 15px 30px",
                    fontSize: "clamp(17px, 2.2vw, 19px)",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "15px",
                    borderLeft: "6px solid #007a7e",
                    transition: "all 0.3s ease",
                    opacity: itemsVisible[index] ? 1 : 0,
                    transform: itemsVisible[index]
                      ? "translateY(0)"
                      : "translateY(30px)",
                  }}
                >
                  <span
                    style={{
                      marginRight: "15px",
                      color: "#007a7e",
                      fontSize: "1.6rem",
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

          .who-flex-wrap {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 20px;
            justify-content: center;
          }

          @media (max-width: 992px) {
            .who-flex-wrap {
              flex-direction: column;
              gap: 20px !important;
            }
            .benefit-image, 
            .benefit-text {
              max-width: 100% !important;
              width: 100%;
            }
            .benefit-image {
              padding: 0;
            }
            .benefit-image img {
              max-width: 100%;
              margin: 0 auto;
            }
          }

          @media (max-width: 768px) {
            section {
              padding: 30px 15px 15px !important;
            }
            li {
              margin-bottom: 12px !important;
              padding: 12px 20px !important;
            }
          }
/* Base (Desktop + Mobile) */
.benefit-heading {
  font-size: clamp(32px, 4.5vw, 38px);
  font-weight: 800;
  color: #004d4f;
  text-align: center;
  margin-bottom: 15px;
}

.highlight {
  color: #007a7e;
}

/* ✅ Mobile only */
@media (max-width: 480px) {
  section {
    padding: 25px 10px 10px !important;
  }

  .benefit-heading {
    font-size: 32px !important;
  }

  li {
    padding: 10px 14px !important;
    font-size: clamp(16px, 4.5vw, 18px) !important;
  }

  .benefit-container {
    gap: 20px !important;
  }
}



        `}
      </style>
    </section>
  );
};

export default WhoCanBenefit;
