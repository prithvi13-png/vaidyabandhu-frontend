import React, { useState, useEffect } from 'react';

const WhoCanBenefit = () => {
  const [itemsVisible, setItemsVisible] = useState({}); // State to manage visibility of each item

  useEffect(() => {
    // Trigger animation for each item with a delay
    const timers = [];
    [
      'Patients who need affordable treatments & surgeries',
      'Families looking for trusted doctors & hospitals',
      'Needy individuals requiring free medical support',
      'Anyone who wants guidance for the best healthcare options',
    ].forEach((item, index) => {
      const timer = setTimeout(() => {
        setItemsVisible(prev => ({ ...prev, [index]: true }));
      }, index * 150); // Staggered delay for each item
      timers.push(timer);
    });

    return () => {
      // Clear timers on component unmount
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section
      style={{
        top: '10px',
        padding: '40px 10px', // Increased vertical padding for more presence
        backgroundColor: '#FDF7F0', /* Very light, warm off-white background */
        fontFamily: 'Georgia, serif', /* A slightly more classic, warm font */
        color: '#4A4A4A', /* Soft dark gray for main text */
        lineHeight: '1.4', /* Enhanced line spacing for readability */
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)', /* Slightly more prominent, softer shadow for the whole section */
      }}
    >
      <div
        className="container" /* Assuming 'container' is a global utility class */
        style={{
          maxWidth: '850px', // Slightly wider for a more spacious feel
          margin: '0 auto',
          padding: '0 25px', // Increased horizontal padding
        }}
      >
        <h2
          style={{
            fontSize: '2.0rem', // Larger, more impactful title
            fontWeight: 700,
            marginBottom: '1.5rem', // More space below title
            color: '#8B4513', // Rich, warm brown for headings
            position: 'relative', // For the custom underline
            paddingBottom: '15px', // Space for the custom underline
            textAlign: 'center',
          }}
        >
          Who Can Benefit?
          {/* Custom double underline effect for elegance */}
          <span
            style={{
              content: '""',
              position: 'absolute',
              bottom: '10px', // Position first line
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px', // Wider first line
              height: '3px',
              backgroundColor: '#D4A373', // Warm underline color
              borderRadius: '2px',
            }}
          ></span>
          <span
            style={{
              content: '""',
              position: 'absolute',
              bottom: '0', // Position second line
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px', // Shorter second line
              height: '3px',
              backgroundColor: '#C05621', // Complementary color for second line
              borderRadius: '2px',
            }}
          ></span>
        </h2>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '20px' }}> {/* Increased margin-top for more separation */}
          {[
            'Patients who need affordable treatments & surgeries',
            'Families looking for trusted doctors & hospitals',
            'Needy individuals requiring free medical support',
            'Anyone who wants guidance for the best healthcare options',
          ].map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: '25px', // Increased spacing for list items
                fontSize: '1.2rem', // Slightly larger font for list items
                color: '#4A4A4A', // Consistent text color
                display: 'flex',
                alignItems: 'flex-start', // Align checkmark to the top of the text
                backgroundColor: '#FFFFFF', // Pure white background for each item card
                padding: '15px 20px', // More ample padding for a substantial card effect
                borderRadius: '15px', // More rounded corners for a softer look
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)', // More prominent, soft shadow
                borderLeft: `6px solid ${index % 2 === 0 ? '#C05621' : '#D4A373'}`, // Alternating border color for visual interest
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, opacity 0.5s ease-out, transform 0.5s ease-out', // Added transition for animation
                opacity: itemsVisible[index] ? 1 : 0, // Fade in effect
                transform: itemsVisible[index] ? 'translateY(0)' : 'translateY(20px)', // Slide up effect
              }}
              // Add simple hover effect for interactivity
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
              }}
            >
              <span style={{ marginRight: '20px', color: '#2E8B57', fontSize: '1.8rem', lineHeight: '1', flexShrink: 0 }}>✔</span> {/* Larger, green checkmark */}
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhoCanBenefit;
