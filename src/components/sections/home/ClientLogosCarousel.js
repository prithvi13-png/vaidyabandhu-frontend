import React, { useEffect, useState } from "react";

// Sample client logos data - replace with your actual logo paths
const clientLogos = [
  { id: 1, src: "/assets/img/h1.png" },
  { id: 2, src: "/assets/img/h2.png" },
  { id: 3, src: "/assets/img/h3.png" },
  { id: 4, src: "/assets/img/h4.png" },
  { id: 5, src: "/assets/img/h5.png" },
  { id: 6, src: "/assets/img/h6.png" },
  { id: 7, src: "/assets/img/h7.png" },
  { id: 8, src: "/assets/img/h8.png" },
  { id: 9, src: "/assets/img/h9.png" },
  { id: 10, src: "/assets/img/h10.png" },
];

const ClientLogosCarousel = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)",
        textAlign: "center",
        overflow: "hidden",
        fontFamily: "Poppins",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontSize: "34px",
          fontWeight: "800",
          color: "#004d4f",
          marginBottom: "10px",
          fontFamily: "Poppins",
          position: "relative",
          display: "inline-block",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        Our Valued -{" "}
        <span style={{ color: "#007a7e" }}>
          United by Trust, Guided by Care.
        </span>
      </h2>
      <p
        style={{
          fontSize: "clamp(16px, 2.5vw, 22px)",
          color: "#4a5568",
          lineHeight: "1.3",
          fontWeight: "400",
          fontFamily: "Poppins",
          maxWidth: "1100px",
          margin: "0 auto 40px",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(30px)",
          transition:
            "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
        }}
      >
        At Vaidya Bandhu, our trusted bonds with caring doctors, leading
        hospitals, and diagnostic centers ensure ethical, affordable, and
        high-quality healthcare, delivered through seamless consultations,
        discounted diagnostics, cost-effective Surgeries, and treatments.
      </p>

      {/* Carousel Container */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="logo-carousel-track"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "scrollLogos 30s linear infinite",
            opacity: animated ? 1 : 0,
            transition: "opacity 1s ease-out 0.4s",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              style={{
                flexShrink: 0,
                width: "180px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 20px",
              }}
            >
              <img
                src={logo.src}
                alt={`Client Logo ${logo.id}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x80/CCCCCC/666666?text=Logo+Error";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes for the scrolling animation */}
     <style>
  {`
    @keyframes scrollLogos {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .logo-carousel-track {
      animation: scrollLogos 30s linear infinite;
    }

    /* Speed up on smaller screens */
    @media (max-width: 768px) {
      .logo-carousel-track {
        animation-duration: 15s;
      }
    }

    @media (max-width: 480px) {
      .logo-carousel-track {
        animation-duration: 6s;
      }
    }

    .logo-carousel-track:hover {
      animation-play-state: paused;
    }
  `}
</style>

    </div>
  );
};

export default ClientLogosCarousel;
