import React, { useEffect, useState } from 'react';
// Assuming MembershipModal is imported correctly and handles its own logic/styling
// import MembershipModal from '../../layouts/MembershipModal'; // Uncomment if needed

const HowToBecomeMember = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const sectionStyle = {
    padding: '40px 20px', // Generous padding for section
    background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)', // Light, calming gradient
    fontFamily: "'poppins', sans-serif", // Consistent font
    color: '#4a5568', // Soft dark gray for main text
    lineHeight: '1.4',
    overflow: 'hidden',
    position: 'relative', // Parent for absolute positioned background elements
    textAlign: 'center', // Center align text content
    minHeight: '600px',
  };

  const headingStyle = {
    fontSize: 'clamp(22px, 4.5vw, 36px)', // Larger, responsive title size
    fontWeight: 800, // Bolder
    color: '#002a2c', // Dark teal for headings
    marginBottom: '15px', // More space below title
    lineHeight: '1.3',
      fontFamily: "'poppins', sans-serif",
    opacity: animated ? 1 : 0, // Fade in
    transform: animated ? "translateY(0)" : "translateY(-20px)", // Slide in from top
    transition: "opacity 1s ease-out, transform 1s ease-out",
  };

  const subHeadingStyle = {
    fontSize: 'clamp(18px, 2.5vw, 19px)', // Responsive font size
    color: '#4a5568',
    maxWidth: '900px',
    fontFamily: 'poppins',
    margin: '0 auto 20px', // More space below subheading
    lineHeight: '1.4',
    fontWeight: '400',
    opacity: animated ? 1 : 0,
    transform: animated ? "translateY(0)" : "translateY(30px)", // Slide in from bottom
    transition: "opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s", // Staggered animation
  };

  const stepsContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // Always column for the main layout
    gap: '0px', // Increased space between step items for visual separation
    maxWidth: '800px', // Max width for the steps content
    margin: '0 auto',
     fontFamily: 'poppins',
    padding: '0 10px', // Padding for content within the container
    position: 'relative',
    zIndex: 1, // Ensure steps are above background elements
    textAlign: 'left', // Align text within steps to the left
  };

  // Line connector between steps (simulated with absolute positioning)
  const connectorLineStyle = {
    position: 'absolute',
     fontFamily: 'poppins',
    left: '40px', // Aligned with the center of the number circles (10px container padding + 30px half-width of number)
    top: '30px', // Start near the top of the first number
    bottom: '30px', // End near the bottom of the last number
    width: '2px', // Thinner line
    background: 'linear-gradient(to bottom, #007a7e, #004d4f)', // Gradient line
    zIndex: 0, // Behind the step items
    opacity: animated ? 0.7 : 0, // Fade in with animation
    transition: 'opacity 1s ease-out 0.8s',
  };

  const stepItemStyle = {
    display: 'flex',
     fontFamily: 'poppins',
    alignItems: 'flex-start', // Align icon and text at the top
    position: 'relative',
    padding: '15px 0', // Reduced vertical padding, no horizontal padding on the block itself
    // Removed background, boxShadow, borderRadius, borderLeft
    opacity: 0, // Hidden by default, animated in
    transform: 'translateY(50px)', // Slide up from bottom
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out', // Keep transitions
    zIndex: 1, // Ensure step items are above the connector line
  };

  const stepNumberStyle = {
    width: '60px', // Larger number circle
    height: '60px', // Larger number circle
    minWidth: '60px',
    borderRadius: '50%',
     fontFamily: 'poppins',
    background: 'linear-gradient(135deg, #007a7e, #004d4f)',
    color: '#ffffff',
    fontSize: '26px', // Larger font for numbers
    fontWeight: 'semibold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '30px', // More space between number and text
    boxShadow: '0 6px 20px rgba(0, 122, 126, 0.3)', // Softer shadow
    flexShrink: 0,
    transition: 'all 0.3s ease', // For hover effect
  };

  const stepContentStyle = {
    flexGrow: 1,
     fontFamily: 'poppins',
    paddingLeft: '10px', // Add some padding to the text content itself
    borderLeft: '2px solid rgba(0, 122, 126, 0.2)', // Subtle left border for content block
    paddingBottom: '10px', // Small padding at bottom of content
    paddingTop: '5px', // Small padding at top of content to align with number
  };

  const stepTitleStyle = {
    fontSize: 'clamp(22px, 2.8vw, 26px)', // Slightly larger title
    fontWeight: 700,
     fontFamily: 'poppins',
    color: '#002a2c',
    marginBottom: '8px', // Reduced margin
    lineHeight: '1.3',
  };

  const stepDescriptionStyle = {
    fontSize: 'clamp(16px, 2.2vw, 18px)',
    color: '#5a6778',
    lineHeight: '1.6',
     fontFamily: 'poppins',
  };

  const buttonContainerStyle = {
    marginTop: '60px',
     fontFamily: 'poppins',
    opacity: animated ? 1 : 0,
    transform: animated ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.8s ease-out 1.5s, transform 0.8s ease-out 1.5s",
  };

  return (
    <section style={sectionStyle}>
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "8%",
           fontFamily: 'poppins',
          width: "min(120px, 12vw)",
          height: "min(120px, 12vw)",
          backgroundColor: "rgba(0, 122, 126, 0.06)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "driftRotate1 15s infinite ease-in-out alternate",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
           fontFamily: 'poppins',
          width: "min(150px, 15vw)",
          height: "min(150px, 15vw)",
          backgroundColor: "rgba(0, 122, 126, 0.04)",
          borderRadius: "50%",
          filter: "blur(35px)",
          animation: "driftRotate2 18s infinite ease-in-out alternate-reverse",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "20%",
           fontFamily: 'poppins',
          width: "min(80px, 8vw)",
          height: "min(80px, 8vw)",
          backgroundColor: "rgba(0, 122, 126, 0.07)",
          borderRadius: "50%",
          filter: "blur(25px)",
          animation: "driftRotate3 12s infinite ease-in-out alternate",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>

      {/* New: Square/Diamond shape */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "15%",
           fontFamily: 'poppins',
          width: "min(100px, 10vw)",
          height: "min(100px, 10vw)",
          backgroundColor: "rgba(0, 122, 126, 0.03)",
          transform: "rotate(45deg)",
          filter: "blur(20px)",
          animation: "diagonalMove 14s infinite ease-in-out alternate",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>

      {/* New: Larger, more subtle blob shape (simulated with border-radius) */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "5%",
           fontFamily: 'poppins',
          width: "min(250px, 25vw)",
          height: "min(250px, 25vw)",
          backgroundColor: "rgba(0, 122, 126, 0.02)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          filter: "blur(40px)",
          animation: "pulseScale 20s infinite ease-in-out alternate",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>

      <div
        className="container"
        style={{
          maxWidth: '1250px',
          margin: '0 auto',
          padding: '0 10px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <h2 style={headingStyle}>
          How to Become a <span style={{ color: '#007a7e',  fontFamily: "'poppins', sans-serif" }}>Member</span>
        </h2>
        <p style={subHeadingStyle}>
          Joining Vaidya Bandhu is simple and straightforward. Follow these easy steps to unlock a year of exclusive healthcare benefits.
        </p>

        <div style={stepsContainerStyle}>
          {/* Connector Line (positioned relative to stepsContainer) */}
          <div style={connectorLineStyle}></div>

          {/* Step 1 */}
          <div
            style={{
              ...stepItemStyle,
              transitionDelay: '0.6s',
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(50px)",
            }}
            onMouseEnter={(e) => {
              // No box shadow on item, but number can still animate
              e.currentTarget.querySelector('div').style.transform = 'scale(1.1) rotate(5deg)'; // Number icon hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('div').style.transform = 'scale(1) rotate(0deg)'; // Number icon reset
            }}
          >
            <div style={stepNumberStyle}>1</div>
            <div style={stepContentStyle}>
              <h3 style={stepTitleStyle}>Step 1: Fill out the Membership Form</h3>
              <p style={stepDescriptionStyle}>
                Enter your name, address, phone number. PAN & Aadhaar are optional.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div
            style={{
              ...stepItemStyle,
              transitionDelay: '0.9s',
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(50px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('div').style.transform = 'scale(1.1) rotate(5deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('div').style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <div style={stepNumberStyle}>2</div>
            <div style={stepContentStyle}>
              <h3 style={stepTitleStyle}>Step 2: Make a One-Time Payment</h3>
              <p style={stepDescriptionStyle}>
                Pay just <strong style={{ color: '#007a7e' }}>&#8377;49</strong> to activate your membership and access all benefits for a full year. Renew it after a year.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            style={{
              ...stepItemStyle,
              transitionDelay: '1.2s',
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(50px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('div').style.transform = 'scale(1.1) rotate(5deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('div').style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <div style={stepNumberStyle}>3</div>
            <div style={stepContentStyle}>
              <h3 style={stepTitleStyle}>Step 3: Receive Your Membership Card</h3>
              <p style={stepDescriptionStyle}>
                Your personalized membership card will be delivered directly to your address, granting you access to all benefits.
              </p>
            </div>
          </div>
        </div>

        {/* Membership Modal Button (assuming it's a component that renders a button) */}
        <div style={buttonContainerStyle}>
          {/* Replace with your actual MembershipModal component */}
          {/* <MembershipModal /> */}
          {/* Placeholder button for preview */}
      
        </div>
      </div>
    </section>
  );
};

export default HowToBecomeMember;
