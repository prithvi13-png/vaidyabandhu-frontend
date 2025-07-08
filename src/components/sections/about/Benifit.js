import React, { useState, useEffect } from 'react';

const WhoCanBenefit = () => {
  const [itemsVisible, setItemsVisible] = useState({}); // State to manage visibility of each item
  const [animated, setAnimated] = useState(false); // State for overall section animation
  const [hoveredHeading, setHoveredHeading] = useState(false); // State for heading underline hover

  useEffect(() => {
    // Trigger overall section animation
    const sectionTimer = setTimeout(() => setAnimated(true), 200);

    // Trigger animation for each list item with a staggered delay
    const itemTimers = [];
    [
      'Patients who need affordable treatments & surgeries',
      'Families looking for trusted doctors & hospitals',
      'Needy individuals requiring free medical support',
      'Anyone who wants guidance for the best healthcare options',
    ].forEach((item, index) => {
      const timer = setTimeout(() => {
        setItemsVisible(prev => ({ ...prev, [index]: true }));
      }, 600 + index * 150); // Staggered delay for each item, after section animation starts
      itemTimers.push(timer);
    });

    return () => {
      // Clear all timers on component unmount
      clearTimeout(sectionTimer);
      itemTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const baseTransition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Smoother transition

  return (
    <section
      style={{
        padding: '40px 20px', /* Generous padding for section */
        background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)', /* Light, inviting gradient */
        fontFamily: "'Inter', sans-serif", /* Consistent font */
        color: '#4a5568', /* Soft dark gray for main text */
        lineHeight: '1.4',
        overflow: 'hidden',
        position: 'relative', // For absolute positioned background elements
        opacity: animated ? 1 : 0, // Section fade-in
        transform: animated ? "translateY(0)" : "translateY(30px)", // Section slide-up
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
          maxWidth: '1200px', // Adjusted max-width for two columns
          margin: '0 auto',
          padding: '0 10px',
          position: 'relative', // Ensures content is above background elements
          zIndex: 1,
        }}
      >
        {/* Centered H2 Title */}
        <h2
          style={{
            fontSize: 'clamp(32px, 4.5vw, 38px)', /* Larger, responsive title size */
            fontWeight: 800, // Bolder
            color: '#004d4f', /* Dark teal for headings */
            position: 'relative',
            paddingBottom: '10px', // More space for underline
            textAlign: 'center', // Centered title
            marginBottom: '40px', // More space below title
            transition: baseTransition,
          }}
          onMouseEnter={() => setHoveredHeading(true)}
          onMouseLeave={() => setHoveredHeading(false)}
        >
          Who Can <span style={{ color: '#007a7e' }}>Benefit</span>?
          {/* Custom double underline effect for elegance */}
        </h2>

        <div
          style={{
            display: 'flex', // Use flexbox for columns
            flexWrap: 'wrap', // Allow wrapping on smaller screens
            alignItems: 'center', // Vertically align items
            gap: '30px', // Gap between columns
          }}
        >
          {/* Left Column: Image */}
          <div
            style={{
              flex: '1 1 400px', // Flexible width, minimum 400px
              maxWidth: '50%', // Max 50% width on larger screens
              textAlign: 'center',
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(-50px)", // Slide in from left
              transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
            }}
          >
            <img
              src="https://placehold.co/500x500/007a7e/ffffff?text=Who+Can+Benefit" // Placeholder image
              alt="People benefiting from healthcare"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '20px', // Rounded corners for the image
                boxShadow: '0 15px 40px rgba(0, 122, 126, 0.15)', // Soft shadow
                transition: baseTransition,
                ...(animated && { transform: 'scale(1)' }), // Ensure it's not scaled down initially
              }}
            />
          </div>

          {/* Right Column: Content */}
          <div
            style={{
              flex: '1 1 500px', // Flexible width, minimum 500px
              maxWidth: '50%', // Max 50% width on larger screens
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(50px)", // Slide in from right
              transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Patients who need affordable treatments & surgeries',
                'Families looking for trusted doctors & hospitals',
                'Needy individuals requiring free medical support',
                'Anyone who wants guidance for the best healthcare options',
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: '20px', // Increased spacing for list items
                    fontSize: 'clamp(17px, 2.2vw, 19px)', // Larger, responsive font for list items
                    color: '#4a5568', // Consistent text color
                    display: 'flex',
                    alignItems: 'flex-start', // Align checkmark to the top of the text
                    backgroundColor: '#FFFFFF', // Pure white background for each item card
                    padding: '20px 30px', // More ample padding for a substantial card effect
                    borderRadius: '15px', // More rounded corners for a softer look
                    boxShadow: itemsVisible[index] ? '0 8px 20px rgba(0, 122, 126, 0.08)' : 'none', // Initial shadow
                    borderLeft: `6px solid #007a7e`, // Consistent accent border
                    transition: `transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.6s ease-out, transform 0.6s ease-out`, // Added transition for animation
                    opacity: itemsVisible[index] ? 1 : 0, // Fade in effect
                    transform: itemsVisible[index] ? 'translateY(0)' : 'translateY(30px)', // Slide up effect
                  }}
                  // Add simple hover effect for interactivity
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; // Lift and slightly scale
                    e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 122, 126, 0.2)'; // More prominent shadow on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 122, 126, 0.08)';
                  }}
                >
                  <span style={{ marginRight: '20px', color: '#007a7e', fontSize: '1.8rem', lineHeight: '1', flexShrink: 0 }}>✔</span> {/* Larger, teal checkmark */}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Keyframes for floating background shapes */}
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

          /* Responsive adjustments */
          @media (max-width: 992px) {
            div[style*="display: flex"][style*="flex-wrap: wrap"] { /* Main container */
              flex-direction: column !important; /* Stack columns */
              gap: 50px !important; /* Adjust gap when stacked */
            }
            div[style*="flex: 1 1 400px"], div[style*="flex: 1 1 500px"] { /* Columns */
              max-width: 100% !important; /* Take full width when stacked */
              text-align: center !important; /* Center image and content */
            }
            h2[style*="text-align: center"] { /* Section title */
              text-align: center !important; /* Ensure it's centered when stacked */
            }
            h2 span[style*="left: 50%"] { /* Underline position */
                left: 50% !important;
                transform: translateX(-50%) !important;
            }
          }

          @media (max-width: 768px) {
            section[style*="padding: 80px 20px"] { /* Main section padding */
              padding: 60px 15px !important;
            }
            h2[style*="font-size: clamp(32px, 4.5vw, 40px)"] { /* Section title */
              font-size: clamp(28px, 5.5vw, 36px) !important;
              padding-bottom: 15px !important;
              margin-bottom: 30px !important;
            }
            h2 span[style*="bottom: 12px"] { /* Underline position */
                bottom: 8px !important;
            }
            h2 span[style*="bottom: 0"] { /* Underline position */
                bottom: -2px !important;
            }
            ul li { /* List item */
              padding: 15px 20px !important;
              margin-bottom: 20px !important;
              font-size: clamp(16px, 2.8vw, 18px) !important;
            }
            ul li span { /* Checkmark */
              font-size: 1.6rem !important;
              margin-right: 15px !important;
            }
          }

          @media (max-width: 480px) {
            section[style*="padding: 80px 20px"] { /* Main section padding */
              padding: 40px 10px !important;
            }
            h2[style*="font-size: clamp(32px, 4.5vw, 40px)"] { /* Section title */
              font-size: clamp(24px, 7vw, 30px) !important;
              padding-bottom: 12px !important;
              margin-bottom: 25px !important;
            }
            h2 span[style*="bottom: 12px"] { /* Underline position */
                bottom: 6px !important;
                width: 70px !important;
            }
            h2 span[style*="bottom: 0"] { /* Underline position */
                bottom: -4px !important;
                width: 40px !important;
            }
            ul li { /* List item */
              padding: 12px 15px !important;
              margin-bottom: 15px !important;
              font-size: clamp(15px, 3.5vw, 17px) !important;
            }
            ul li span { /* Checkmark */
              font-size: 1.4rem !important;
              margin-right: 10px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default WhoCanBenefit;
