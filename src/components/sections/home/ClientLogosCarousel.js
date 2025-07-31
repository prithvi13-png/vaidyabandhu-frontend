import React, { useEffect, useState } from "react";

// Sample client logos data - replace with your actual logo paths
const clientLogos = [
  { id: 1, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+A" },
  { id: 2, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+B" },
  { id: 3, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+C" },
  { id: 4, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+D" },
  { id: 5, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+E" },
  { id: 6, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+F" },
  { id: 7, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+G" },
  { id: 8, src: "https://placehold.co/150x80/E0F7FA/007A7E?text=Client+H" },
];

const ClientLogosCarousel = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Duplicate logos to create a seamless infinite scroll effect
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)", // Light, calming gradient
        textAlign: "center",
        overflow: "hidden", // Hide overflowing content for the carousel effect
        fontFamily: "Poppins",
        position: "relative",
      }}
    >
      {/* Section Heading */}
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
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", // Fading edges
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", // For Webkit browsers
        }}
      >
        <div
          className="logo-carousel-track"
          style={{
            display: "flex",
            whiteSpace: "nowrap", // Keep all logos on one line
            animation: "scrollLogos 30s linear infinite", // Animation for scrolling
            opacity: animated ? 1 : 0,
            transition: "opacity 1s ease-out 0.4s", // Fade in the carousel
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index} // Use index here as IDs are duplicated for seamless loop
              style={{
                flexShrink: 0, // Prevent items from shrinking
                width: "180px", // Fixed width for each logo container
                height: "100px", // Fixed height for each logo container
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 20px", // Spacing between logos
                filter: "grayscale(100%)", // Grayscale by default
                transition:
                  "filter 0.3s ease-in-out, transform 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0%)"; // Colorize on hover
                e.currentTarget.style.transform = "scale(1.1)"; // Slight scale on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(100%)"; // Revert to grayscale
                e.currentTarget.style.transform = "scale(1)"; // Revert scale
              }}
            >
              <img
                src={logo.src}
                alt={`Client Logo ${logo.id}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", // Ensure image fits without distortion
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x80/CCCCCC/666666?text=Logo+Error";
                }} // Fallback for broken images
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
              transform: translateX(-50%); /* Scrolls half the duplicated list length */
            }
          }

          /* Pause animation on hover for the entire track */
          .logo-carousel-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default ClientLogosCarousel;
