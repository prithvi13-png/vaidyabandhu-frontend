import React, { useEffect, useState, useRef } from "react";

const faqs = [
  {
    question: "What is Vaidya Bandhu?",
    answer:
      "Vaidya Bandhu is a healthcare foundation that connects patients to highly experienced doctors and healthcare professionals. We offer 10% to 40% discounts on surgeries, treatments, and diagnostic services, along with free medical advice available. Our mission is to make healthcare affordable and accessible to everyone, while maintaining the highest standards of care.",
  },
  {
    question: "How do I become a member of Vaidya Bandhu?",
    answer:
      "To become a member, simply fill out the membership form with your name, address, and contact details. PAN and Aadhaar are optional. Once you pay the ₹49 membership fee, your membership card will be sent to your address, which is valid for 1 year. After 1 year, you will need to renew your membership.",
  },
  {
    question:
      "How can I avail 10% to 40% discount on surgeries, treatments, and diagnostics?",
    answer:
      "Once you become a member, you can avail of the discounts by calling or emailing Vaidya Bandhu to book your appointments. Your membership card will be required for confirmation and to apply the discount.",
  },
  {
    question:
      "Are there any specific doctors or treatments covered by Vaidya Bandhu?",
    answer:
      "Vaidya Bandhu covers a wide range of specialties, including Orthopedics, Cardiology, Neurology, Urology, Gastroenterology, and many more. Our doctors specialize in various treatments and surgeries, and our membership gives you access to affordable healthcare services in all these departments.",
  },
  {
    question: "Can I use my membership at partner diagnostic centers?",
    answer:
      "Yes, our membership is valid at partner diagnostic centers across Karnataka. By showing your membership card, you can receive discounts on diagnostic services such as X-rays, MRIs, CT scans, and blood tests.",
  },
  {
    question: "What if I need emergency medical assistance?",
    answer:
      "Vaidya Bandhu offers free medical advice. If you need urgent help, you can reach out to us immediately, and our health warriors (doctors and partners) will guide you through the necessary steps and provide assistance.",
  },
  {
    question: "Can I consult with a doctor online through Vaidya Bandhu?",
    answer:
      "Yes, we provide online consultations with experienced doctors. You can book an appointment via phone or email and get professional advice from the comfort of your home.",
  },
  {
    question: "Are the treatments and surgeries covered by insurance?",
    answer:
      "We recommend checking with your insurance provider regarding coverage. While Vaidya Bandhu offers affordable care, the specific coverage for treatments and surgeries will depend on your insurance policy.",
  },
  {
    question: "How can I contact Vaidya Bandhu for further inquiries?",
    answer:
      "You can reach us via email or phone. Our contact details are available on the ‘Contact Us’ page of our website. We are here to assist you with any questions you may have!",
  },
  {
    question: "Where is Vaidya Bandhu located?",
    answer:
      "Vaidya Bandhu currently operates across Karnataka with a network of doctors, healthcare centers, and partner diagnostic services. We are expanding our services and aim to reach more locations soon.",
  },
];

const FAQSection = () => {
  const [animated, setAnimated] = useState(false);
  // State to manage which FAQ item is open. Initialize the first one (index 0) as open.
  const [openFAQIndex, setOpenFAQIndex] = useState(0);
  // State to manage hover effect on question headers
  const [hoveredQuestionIndex, setHoveredQuestionIndex] = useState(null);

  // Ref to measure the actual height of the answer content (still useful for initial height calculation for transition)
  const answerRefs = useRef(faqs.map(() => React.createRef()));

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)", // Light, calming gradient
        textAlign: "center",
        overflow: "hidden",
        fontFamily: "Poppins",
        position: "relative",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "min(120px, 12vw)",
          height: "min(120px, 12vw)",
          backgroundColor: "rgba(0, 122, 126, 0.05)",
          borderRadius: "50%",
          filter: "blur(25px)",
          animation: "floatShape1 10s infinite ease-in-out",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "min(150px, 15vw)",
          height: "min(150px, 15vw)",
          backgroundColor: "rgba(0, 122, 126, 0.03)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "floatShape2 12s infinite ease-in-out",
          opacity: animated ? 1 : 0,
          transition: "opacity 1s ease-out",
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          width: "90%",
          maxWidth: "1200px", // Max width for content
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main Heading */}
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 34px)",
            fontWeight: "800",
            fontFamily: "poppins",
            color: "#004d4f",
            marginBottom: "10px",
            lineHeight: "1.3",
            fontFamily: "Poppins",
            opacity: animated ? 1 : 0,
            transform: animated ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          Frequently Asked <span style={{ color: "#007a7e" }}>Questions</span>
        </h2>

        {/* Subtitle/Intro Paragraph */}
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "#4a5568",
            lineHeight: "1.3",
            fontWeight: "500",
            marginBottom: "30px",
            fontFamily: "Poppins",
            opacity: animated ? 1 : 0,
            transform: animated ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
          }}
        >
          Find quick answers to common questions about Vaidya Bandhu's services,
          membership, and benefits.
        </p>

        {/* FAQ List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px", // Space between FAQ items
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openFAQIndex === index;

            return (
              <div
                key={index}
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow:
                    hoveredQuestionIndex === index
                      ? "0 12px 16px rgba(0, 122, 126, 0.12)"
                      : "0 8px 20px rgba(0, 122, 126, 0.07)", // Enhanced shadow on hover
                  overflow: "hidden", // Important for height transition
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease-out ${0.4 + index * 0.08}s`, // Staggered entrance
                }}
                onMouseEnter={() => setHoveredQuestionIndex(index)}
                onMouseLeave={() => setHoveredQuestionIndex(null)}
              >
                {/* Question Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 25px",
                    cursor: "pointer",
                    background: isOpen
                      ? "#e6fffa"
                      : hoveredQuestionIndex === index
                      ? "#f0fafa"
                      : "#ffffff", // Highlight open and hovered
                    borderBottom: isOpen ? "2px solid #007a7e" : "none", // Thicker border when open
                    transition: "background 0.3s ease, border-bottom 0.3s ease",
                  }}
                  onClick={() => toggleFAQ(index)}
                >
                  <h4
                    style={{
                      fontSize: "clamp(18px, 2.5vw, 20px)",
                      fontWeight: "600",
                      color: "#004d4f",
                      fontFamily: "poppins",
                      margin: 0,
                      flexGrow: 1,
                      textAlign: "left",
                    }}
                  >
                    {faq.question}
                  </h4>
                  <span
                    style={{
                      fontSize: "16px", // Slightly larger arrow
                      color: "#007a7e",
                      fontFamily: "poppins",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      marginLeft: "15px",
                      flexShrink: 0,
                    }}
                  >
                    {/* Using a more modern arrow icon (could be SVG or FontAwesome if available) */}
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Answer Content */}
                <div
                  style={{
                    // When open, set to a very large height to ensure all content is visible.
                    // When closed, set to 0. This allows smooth transition.
                    maxHeight: isOpen ? "9999px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s ease-in-out",
                    padding: isOpen ? "0 25px 20px" : "0 25px", // Adjust padding when open
                    position: "relative",
                  }}
                >
                <p
  ref={answerRefs.current[index]}
  style={{
    fontSize: "clamp(15px, 2vw, 17px)",
    color: "#5a6778",
    lineHeight: "1.3",
    margin: 0,
    paddingTop: "15px",
    textAlign: "left", // <-- add this line
  }}
>
  {faq.answer}
</p>

                </div>
              </div>
            );
          })}
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

          /* Responsive adjustments using media queries */
          @media (max-width: 768px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 60px 15px !important;
            }
            div[style*="width: 90%"] { /* Main content wrapper */
              width: 95% !important;
            }
            div[style*="padding: 20px 25px"] { /* Question header padding */
              padding: 18px 20px !important;
            }
            h4 { /* Question font size */
              font-size: clamp(16px, 2.8vw, 20px) !important;
            }
            span[style*="font-size: 16px"] { /* Arrow size */
              font-size: 24px !important;
            }
            p[style*="font-size: clamp(15px, 2vw, 17px)"] { /* Answer text size */
              font-size: clamp(14px, 1.8vw, 16px) !important;
            }
          }
            

          @media (max-width: 480px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 40px 10px !important;
            }
            div[style*="width: 90%"] { /* Main content wrapper */
              width: 100% !important;
              padding: 0 10px;
              box-sizing: border-box;
            }
            div[style*="padding: 20px 25px"] { /* Question header padding */
              padding: 15px !important;
            }
            h4 { /* Question font size */
              font-size: clamp(16px, 3.5vw, 18px) !important;
            }
            span[style*="font-size: 16px"] { /* Arrow size */
              font-size: 20px !important;
            }
            p[style*="font-size: clamp(15px, 2vw, 17px)"] { /* Answer text size */
              font-size: clamp(13px, 2.5vw, 15px) !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FAQSection;
