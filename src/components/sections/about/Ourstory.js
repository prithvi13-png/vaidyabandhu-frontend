import React from 'react';

const OurStory = () => {
  return (
    <section
      style={{
        padding: '5px 5px', /* Increased vertical padding for more impact */
        background: 'linear-gradient(to bottom, #FDF7F0, #F8F0E8)', /* Subtle warm gradient background */
        fontFamily: 'Lora, serif', /* Elegant serif font */
        color: '#4A4A4A', /* Soft dark gray for main text */
        lineHeight: '1.8', /* Enhanced line spacing */
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)', /* More prominent, soft shadow for the whole section */
      }}
    >
      <div
        className="container" /* Assuming 'container' is a global utility class */
        style={{
          maxWidth: '1200px', /* Wider max-width for a more spacious feel */
          margin: '0 auto',
          padding: '0 10px', /* Increased horizontal padding */
        }}
      >
        <div className="row gy-10"> {/* Even more increased vertical gutter between sections */}
          {/* Our Story Section */}
          <div
            className="col-12"
            style={{
              marginBottom: '40px', /* More space after the section */
              marginTop: '50px', /* More space before the first section */
              padding: '20px', /* Increased padding within the card */
              backgroundColor: '#FFFFFF', /* Pure white background for a crisp look */
              borderRadius: '20px', /* Even more rounded corners for a modern, soft feel */
              border: '1px solid #F0E0D0', /* Very subtle, light warm border */
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)', /* Deeper, softer shadow for the card */
            }}
          >
            <h2
              style={{
                fontSize: '2.1rem', /* Larger, more impactful title */
                fontWeight: 700,
                marginBottom: '2.5rem', /* More space below title */
                color: '#8B4513', /* Rich, warm brown for headings */
                position: 'relative', /* For the pseudo-element underline */
                paddingBottom: '25px', /* Space for the custom underline */
                textAlign: 'center',
              }}
            >
              Our Story
              {/* Custom underline effect: double line */}
              <span
                style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '10px', /* Position first line */
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px', /* Wider underline */
                  height: '3px',
                  backgroundColor: '#D4A373', /* Warm underline color */
                  borderRadius: '2px',
                }}
              ></span>
              <span
                style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '0', /* Position second line */
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px', /* Shorter second line */
                  height: '3px',
                  backgroundColor: '#C05621', /* Complementary color for second line */
                  borderRadius: '2px',
                }}
              ></span>
            </h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.25rem', color: '#4A4A4A' }}> 
              Healthcare is a basic necessity, yet millions of people struggle to afford quality medical care.
              High treatment costs, lack of guidance, and financial stress prevent many from getting the care they need.
            </p>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.25rem', color: '#4A4A4A' }}>
              Understanding these challenges, <strong style={{ color: '#C05621' }}>Vaidya Bandhu was created to bridge the gap between patients and affordable healthcare.</strong>
              Our goal is simple: No one should suffer due to financial limitations.
            </p>
          </div>

          {/* Our Vision Section */}
          <div
            className="col-12"
            style={{
              marginBottom: '40px',
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #F0E0D0',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h2
              style={{
                fontSize: '2.1rem',
                fontWeight: 700,
                marginBottom: '2.5rem',
                color: '#8B4513',
                position: 'relative',
                paddingBottom: '25px',
                textAlign: 'center',
              }}
            >
              Our Vision
              <span
                style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '3px',
                  backgroundColor: '#D4A373',
                  borderRadius: '2px',
                }}
              ></span>
              <span
                style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#C05621',
                  borderRadius: '2px',
                }}
              ></span>
            </h2>
            <p
              style={{
                fontWeight: 600,
                color: '#C05621',
                fontSize: '1.5rem', /* Even larger font size for vision statement */
                textAlign: 'center',
                padding: '20px', /* More padding for emphasis */
                backgroundColor: '#FDF7F0', /* Background matches main section for a subtle highlight */
                borderRadius: '15px', /* More rounded corners */
                border: '3px solid #D4A373', /* Solid border matching primary accent */
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)', /* More prominent shadow */
              }}
            >
              To create a nationwide ecosystem where patients are respected, doctors are honoured, and care comes before commerce.
            </p>
          </div>

          {/* Our Mission Section */}
          <div
            className="col-12"
            style={{
              padding: '40px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #F0E0D0',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h2
              style={{
                fontSize: '2.1rem',
                fontWeight: 700,
                marginBottom: '2.5rem',
                color: '#8B4513',
                position: 'relative',
                paddingBottom: '25px',
                textAlign: 'center',
              }}
            >
              Our Mission
              <span
                style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '3px',
                  backgroundColor: '#D4A373',
                  borderRadius: '2px',
                }}
              ></span>
              <span
                style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#C05621',
                  borderRadius: '2px',
                }}
              ></span>
            </h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.25rem', color: '#4A4A4A' }}>
              To empower patients with timely medical guidance, trusted hospital access, and compassionate support throughout their healthcare journey.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Provide 10 - 40% discounts on surgeries, treatments, and diagnostics.',
                'Offer free medical guidance to help people make informed decisions.',
                'Connect patients with top doctors in every medical department.',
                'Support underprivileged patients by arranging free surgeries.',
                'Expand our network of hospitals & diagnostic centers across India.',
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: '20px', /* Increased spacing for list items */
                    fontSize: '1.25rem', /* Larger font for list items */
                    color: '#4A4A4A',
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '10px 25px', /* More padding for list items */
                    backgroundColor: '#FDF7F0', /* Background for each list item */
                    borderRadius: '12px', /* More rounded corners for list items */
                    border: '1px solid #D4A373', /* Consistent border for list items */
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)', /* More visible shadow for list items */
                  }}
                >
                  <span style={{ marginRight: '20px', color: '#2E8B57', fontSize: '1.8rem', lineHeight: '1', flexShrink: 0 }}>✔</span> {/* Larger checkmark */}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
