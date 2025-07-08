import React, { useEffect, useState } from 'react'; // Fixed: Changed '=>' to 'from'

const HowToBecomeMember = () => {
  const [animated, setAnimated] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredHeading, setHoveredHeading] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Unified, smoother transition for hover effects and animations
  const baseTransition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";

  return (
    <section
      style={{
        padding: '40px 20px', /* Generous padding for section */
        background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)', /* Light, calming gradient */
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
          top: "15%",
          left: "10%",
          width: "min(100px, 10vw)",
          height: "min(100px, 10vw)",
          backgroundColor: "rgba(0, 122, 126, 0.05)", // Teal accent with transparency
          borderRadius: "50%",
          filter: "blur(20px)",
          animation: "floatShape1 10s infinite ease-in-out",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "min(130px, 13vw)",
          height: "min(130px, 13vw)",
          backgroundColor: "rgba(0, 122, 126, 0.03)", // Lighter teal accent with transparency
          borderRadius: "50%",
          filter: "blur(25px)",
          animation: "floatShape2 12s infinite ease-in-out",
          zIndex: 0,
        }}
      ></div>

      <div
        className="container"
        style={{
          maxWidth: '1250px', /* Optimal width for text content */
          margin: '0 auto',
          padding: '0 10px',
          position: 'relative', // Ensures content is above background elements
          zIndex: 1,
          textAlign: 'center', // Center align content
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(22px, 4.5vw, 38px)', /* Larger, responsive title size */
            fontWeight: 800, // Bolder
            color: '#004d4f', /* Dark teal for headings */
            position: 'relative',
            paddingBottom: '20px', // More space for underline
            marginBottom: '15px', // More space below title
            transition: baseTransition,
          }}
          onMouseEnter={() => setHoveredHeading(true)}
          onMouseLeave={() => setHoveredHeading(false)}
        >
          How to Become a <span style={{ color: '#007a7e' }}>Member</span>
          {/* Custom double underline effect for elegance */}
        
        </h2>

        <div
          style={{
            backgroundColor: '#FFFFFF', /* Pure white background for content card */
            borderRadius: '20px', /* More rounded corners */
            boxShadow: '0 12px 35px rgba(0, 77, 79, 0.12)', // Soft shadow
            padding: '40px', /* Generous padding inside the card */
            opacity: animated ? 1 : 0,
            transform: animated ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s`,
          }}
        >
          <p
            style={{
              fontSize: 'clamp(18px, 2.2vw, 20px)', /* Slightly larger font for main content */
              color: '#4a5568',
              marginBottom: '25px',
              lineHeight: '1.7',
            }}
          >
            To become a member, simply fill out the membership form with your details
            (<strong style={{ color: '#007a7e' }}>name, address, phone number</strong>; PAN & Aadhaar - optional),
            make a payment of <strong style={{ color: '#007a7e' }}>&#8377;49</strong>, and your membership card will be
            delivered to your address. Your membership is valid for <strong style={{ color: '#007a7e' }}>1 year</strong>,
            and upon expiration, you can easily renew it.
          </p>

          <a
            href="/appointment" // Link to the appointment/membership page
            style={{
              background: hoveredButton ? '#004d4f' : '#007a7e', // Darker teal on hover
              color: '#ffffff',
              border: 'none',
              padding: '15px 35px', // Larger padding for a prominent button
              borderRadius: '10px', // More rounded button
              cursor: 'pointer',
              fontSize: 'clamp(18px, 2vw, 20px)', // Responsive button text size
              fontWeight: '700', // Bolder text
              textDecoration: 'none', // Remove underline
              display: 'inline-block', // Allows padding and transforms
         // Space above the button
              boxShadow: hoveredButton ? '0 10px 25px rgba(0, 122, 126, 0.4)' : '0 5px 15px rgba(0, 122, 126, 0.2)', // Enhanced shadow on hover
              transition: baseTransition,
              transform: hoveredButton ? 'translateY(-3px)' : 'translateY(0)', // Lift on hover
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            Get Membership
          </a>
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

          /* Responsive adjustments */
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
            div[style*="padding: 40px"] { /* Content card padding */
              padding: 30px !important;
            }
            p[style*="font-size: clamp(18px, 2.2vw, 20px)"] { /* Paragraph font size */
              font-size: clamp(16px, 2.8vw, 18px) !important;
            }
            a[href="/appointment"] { /* Button padding and font size */
              padding: 12px 25px !important;
              font-size: clamp(16px, 2.5vw, 18px) !important;
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
            div[style*="padding: 40px"] { /* Content card padding */
              padding: 20px !important;
            }
            p[style*="font-size: clamp(18px, 2.2vw, 20px)"] { /* Paragraph font size */
              font-size: clamp(15px, 3.5vw, 17px) !important;
            }
            a[href="/appointment"] { /* Button padding and font size */
              padding: 10px 20px !important;
              font-size: clamp(15px, 3vw, 17px) !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HowToBecomeMember;
