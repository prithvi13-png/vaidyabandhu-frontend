import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react'; // Icons for buttons and benefits

// Dummy data for the banner (now only one item needed for a static page)
const dummyBannerData = [
  {
    id: 1,
    // Using a direct placeholder image URL for static environment
    image: "assets/img/ban1.jpeg",
    title: "India’s First & No.1 Comprehensive Healthcare Network Under One Roof", // Main title
    benefits: [
      "10% to 40% discounts on surgeries, treatments, and diagnostics",
      "10% CASHBACK BENEFIT - Submit bill/invoice within 7 days via WhatsApp/email - Get 10% cashback credited to your account",
      "Free surgeries for the needy through our social impact programs",
      "Free medical guidance from 9 AM to 6 PM via our helpline",
      "Personal support in choosing the right doctor, hospital, or diagnostic service"
    ]
  }
];

const Banner = () => {
  const [animated, setAnimated] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null); // State for button hover effect

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const baseTransition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Smoother transition curve

  // Since it's a static page, we only need the first item
  const item = dummyBannerData[0];

  return (
    <div className="sigma_banner style-8" style={{ overflow: 'hidden', position: 'relative' }}>
      <div
        className="banner-slider-inner secondary-overlay"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundPosition: "center center", // Centered background
          backgroundSize: "cover",
          minHeight: '500px', // Increased min height for more presence
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          // filter: 'brightness(1.2)', // Slightly dim the background image for text clarity
        }}
      >
        {/* Enhanced Overlay with subtle gradient */}
        {/* <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%)', // Radial gradient for depth
            zIndex: 2,
          }}
        ></div> */}

        <div className="sigma_banner-text text-center" style={{ position: 'relative', zIndex: 3 }}>
          <div className="container" style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 15px' }}>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                {/* Main Title */}
                <h1
                  className="title text-white"
                  style={{
                    color: "#ffffff",
                    fontWeight: "700", // Extra bold
                    fontSize: "clamp(2.8rem, 4.5vw, 2.2rem)", // Larger, more dynamic font size
                    marginBottom: '20px',
                    letterSpacing: '1px', // Added letter spacing
                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)', // Text shadow for depth
                    opacity: animated ? 1 : 0,
                    transform: animated ? "translateY(0)" : "translateY(-30px)",
                    transition: `opacity 1s ease-out, transform 1s ease-out`,
                  }}
                >
                  {item.title}
                </h1>

                {/* Subtitle - now more of a tag-line */}
                <h5
                  className="text-white"
                  style={{
                    color: "#e0f7fa", // Light teal for subtitle
                    fontWeight: "600",
                    fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)", // Slightly larger subtitle
                    marginBottom: '35px', // Increased margin below subtitle
                    textShadow: '1px 1px 5px rgba(0,0,0,0.3)',
                    opacity: animated ? 1 : 0,
                    transform: animated ? "translateY(0)" : "translateY(-15px)",
                    transition: `opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s`,
                  }}
                >
                  {item.subtitle}
                </h5>

                {/* Benefits List */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 auto 40px auto', // Increased margin
                    textAlign: 'left',
                    maxWidth: '750px', // Slightly wider for benefits
                  }}
                >
                  {item.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        color: '#e0f7fa',
                        fontSize: 'clamp(1.1rem, 1.9vw, 1.3rem)', // Slightly larger font for benefits
                        marginBottom: '12px', // Increased spacing between benefits
                        lineHeight: '1.5',
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(20px)",
                        transition: `opacity 0.8s ease-out ${0.6 + idx * 0.1}s, transform 0.8s ease-out ${0.6 + idx * 0.1}s`,
                        // Removed hover effect styles for list items
                      }}
                      // Removed onMouseEnter and onMouseLeave handlers from here
                    >
                      <CheckCircle size={22} style={{ marginRight: '12px', flexShrink: 0, color: '#34d399' }} /> {/* Slightly larger checkmark */}
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Banner Links */}
                <div
                  className="banner-links"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '25px', // More space between buttons
                    flexWrap: 'wrap',
                    opacity: animated ? 1 : 0,
                    transform: animated ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 1s ease-out 1.5s, transform 1s ease-out 1.5s`,
                  }}
                >
                  <a
                    href="/doctor-list"
                    className="sigma_btn"
                    style={{
                      background: 'linear-gradient(to right, #007a7e, #004d4f)', // Teal gradient
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px 20px', // Larger padding
                      borderRadius: '10px', // More rounded
                      cursor: 'pointer',
                      fontSize: '17px', // Slightly larger font
                      fontWeight: '600',
                      boxShadow: hoveredButton === 'findDoctor' ? '0 8px 20px rgba(0, 122, 126, 0.4)' : '0 4px 10px rgba(0, 122, 126, 0.2)',
                      transition: baseTransition,
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      transform: hoveredButton === 'findDoctor' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)', // Lift and scale on hover
                    }}
                    onMouseEnter={() => setHoveredButton('findDoctor')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Find A Doctor
                    <ArrowRight size={20} style={{ marginLeft: '12px' }} /> {/* Slightly larger arrow */}
                  </a>
                  <a
                    href="/about"
                    className="sigma_btn light"
                    style={{
                      background: hoveredButton === 'readMore' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)', // More pronounced hover
                      color: '#ffffff',
                      border: hoveredButton === 'readMore' ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.5)',
                      padding: '14px 30px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '17px',
                      fontWeight: '700',
                      boxShadow: hoveredButton === 'readMore' ? '0 8px 20px rgba(0, 0, 0, 0.2)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
                      transition: baseTransition,
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      transform: hoveredButton === 'readMore' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)', // Lift and scale on hover
                    }}
                    onMouseEnter={() => setHoveredButton('readMore')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Read More
                    <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles for responsiveness */}
      <style>
        {`
          @media (max-width: 992px) {
            .sigma_banner-text h1 {
              font-size: clamp(2.2rem, 5vw, 3.5rem) !important;
            }
            .sigma_banner-text h5 {
              font-size: clamp(1.4rem, 3.5vw, 2rem) !important;
            }
            .sigma_banner-text ul li {
              font-size: clamp(1rem, 2.2vw, 1.2rem) !important;
            }
          }

          @media (max-width: 768px) {
            .banner-slider-inner {
              min-height: 480px !important;
              padding: 40px 15px !important;
            }
            .sigma_banner-text h1 { /* Main title */
              font-size: clamp(2rem, 6vw, 3rem) !important;
              margin-bottom: 10px !important;
            }
            .sigma_banner-text h5 { /* Subtitle */
              font-size: clamp(1.2rem, 4.5vw, 1.8rem) !important;
              margin-bottom: 20px !important;
            }
            .sigma_banner-text ul li {
              font-size: clamp(0.9rem, 3vw, 1.1rem) !important;
              margin-bottom: 8px !important;
            }
            .sigma_banner-text ul {
                margin-bottom: 25px !important;
            }
            .banner-links {
              flex-direction: column !important;
              gap: 15px !important;
            }
            .banner-links a {
              width: 100% !important;
              justify-content: center !important;
              padding: 12px 25px !important;
              font-size: 16px !important;
            }
            .banner-links a svg {
                margin-left: 10px !important;
                width: 18px !important;
                height: 18px !important;
            }
          }

          @media (max-width: 480px) {
            .banner-slider-inner {
              min-height: 400px !important;
              padding: 30px 10px !important;
            }
            .sigma_banner-text h1 { /* Main title */
              font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
            }
            .sigma_banner-text h5 { /* Subtitle */
              font-size: clamp(1rem, 5.5vw, 1.5rem) !important;
            }
            .sigma_banner-text ul li {
              font-size: clamp(0.8rem, 3.5vw, 1rem) !important;
              margin-bottom: 6px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Banner;
