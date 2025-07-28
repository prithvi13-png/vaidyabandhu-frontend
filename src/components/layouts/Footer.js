import React, { useEffect, useState } from 'react';
import FloatingCallButton from './helpline';

// Dummy serviceblock data as we cannot access local JSON files
const dummyServiceblock = [
    { "title": "Consult a Doctor", path: "/services/consult-doctor" },
    { "title": "Surgeries & Treatments", path: "/services/surgeries-treatments" },
    { "title": "Free Surgeries", path: "/services/free-surgeries" },
    { "title": "Diagnostic Tests", path: "/services/diagnostic-tests" },
    { "title": "One-Stop Solution", path: "/services/one-stop-solution" }
];

const Footer = () => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => setAnimated(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const baseTransition = "all 0.3s ease-in-out";

    return (
        <footer
            style={{
                background: "linear-gradient(135deg, #003d3f 0%, #001a1b 100%)", // Dark, inviting gradient
                paddingTop: "60px", // Adjusted padding
                paddingBottom: "0",
                fontFamily: "'poppins', sans-serif",
                color: "#a0aec0", // Default light text color for dark background
                overflow: "hidden",
                position: "relative",
                borderTopLeftRadius: "40px", // Added top-left border radius
                borderTopRightRadius: "40px", // Added top-right border radius
            }}
        >
            <FloatingCallButton />
            {/* Decorative background elements (optional, but consistent with previous components) */}
            <div
                style={{
                    position: "absolute",
                    top: "5%",
                    left: "0%",
                     fontFamily: "'poppins', sans-serif",
                    width: "min(100px, 10vw)",
                    height: "min(100px, 10vw)",
                    backgroundColor: "rgba(0, 122, 126, 0.1)", // Slightly more visible on dark
                    borderRadius: "50%",
                    filter: "blur(20px)",
                    animation: "floatShape3 8s infinite ease-in-out",
                    zIndex: 0,
                }}
            ></div>
            <div
                style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "0%",
                     fontFamily: "'poppins', sans-serif",
                    width: "min(120px, 12vw)",
                    height: "min(120px, 12vw)",
                    backgroundColor: "rgba(0, 122, 126, 0.08)", // Slightly more visible on dark
                    borderRadius: "50%",
                    filter: "blur(25px)",
                    animation: "floatShape4 10s infinite ease-in-out",
                    zIndex: 0,
                }}
            ></div>


            <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", fontFamily: "'poppins', sans-serif", position: "relative", zIndex: 1 }}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        gap: "30px",
                        marginBottom: "60px",
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(30px)",
                        transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
                    }}
                >
                    {/* Address Info */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "15px",
                             fontFamily: "'poppins', sans-serif",
                            textAlign: "left",
                            flex: "1 1 280px", // Responsive sizing
                            maxWidth: "350px",
                        }}
                    >
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                 fontFamily: "'poppins', sans-serif",
                                background: "#007a7e", // Accent color for icons
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 15px rgba(0, 122, 126, 0.4)", // Darker shadow
                                flexShrink: 0,
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                                <circle cx="12" cy="9" r="3"></circle>
                            </svg>
                        </div>
                        <div>
                            <p style={{ margin: "0", fontFamily: "'poppins', sans-serif", fontSize: "16px", color: "#a0aec0" }}>Our Address</p>
                            <p style={{ margin: "0",  fontFamily: "'poppins', sans-serif", fontSize: "18px", fontWeight: "bold", color: "#e2e8f0" }}>Bengaluru - 560078</p>
                        </div>
                    </div>

                    {/* Phone Info */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "15px",
                            textAlign: "left",
                            flex: "1 1 280px",
                            maxWidth: "350px",
                             fontFamily: "'poppins', sans-serif",
                        }}
                    >
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                 fontFamily: "'poppins', sans-serif",
                                borderRadius: "50%",
                                background: "#007a7e", // Accent color for icons
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 15px rgba(0, 122, 126, 0.4)", // Darker shadow
                                flexShrink: 0,
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.18 2.19l-.7.35a18.33 18.33 0 0 0 6 6l.35-.7a2 2 0 0 1 2.19-1.18 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div>
                            <p style={{ margin: "0", fontFamily: "'poppins', sans-serif", fontSize: "16px", color: "#a0aec0" }}>Call Us - Helpline</p>
                            <p style={{ margin: "0", fontFamily: "'poppins', sans-serif", fontSize: "18px", fontWeight: "bold", color: "#e2e8f0" }}>+91 8535853589</p>
                        </div>
                    </div>

                    {/* Email Info */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "15px",
                             fontFamily: "'poppins', sans-serif",
                            textAlign: "left",
                            flex: "1 1 280px",
                            maxWidth: "350px",
                        }}
                    >
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                 fontFamily: "'poppins', sans-serif",
                                borderRadius: "50%",
                                background: "#007a7e", // Accent color for icons
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 15px rgba(0, 122, 126, 0.4)", // Darker shadow
                                flexShrink: 0,
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <div>
                            <p style={{ margin: "0", fontFamily: "'poppins', sans-serif", fontSize: "16px", color: "#a0aec0" }}>Our Mail</p>
                            <p style={{ margin: "0", fontFamily: "'poppins', sans-serif", fontSize: "18px", fontWeight: "bold", color: "#e2e8f0" }}>support@vaidyabandhu.com</p>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        padding: "60px 0",
                        borderTop: "1px solid rgba(0, 122, 126, 0.2)", // Lighter border for contrast
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(30px)",
                        transition: `opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s`,
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid
                            gap: "40px",
                            textAlign: "left",
                        }}
                    >
                     
                        {/* Our Services */}
                        <div>
                            <h5 style={{ fontSize: "20px", fontFamily: "'poppins', sans-serif", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px" }}>Our Services</h5>
                            <ul style={{ listStyle: "none", fontFamily: "'poppins', sans-serif", padding: 0, margin: 0 }}>
                                {dummyServiceblock.map((item, i) => (
                                    <li key={i} style={{ marginBottom: "10px" }}>
                                        <a
                                            href={item.path} // Placeholder link
                                            style={{
                                                fontSize: "15px",
                                                 fontFamily: "'poppins', sans-serif",
                                                color: "#cbd5e0", // Lighter link color
                                                textDecoration: "none",
                                                transition: baseTransition,
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = "#007a7e"}
                                            onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e0"}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Useful Links */}
                        <div>
                            <h5 style={{ fontSize: "20px", fontFamily: "'poppins', sans-serif", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px" }}>Useful Links</h5>
                            <ul style={{ listStyle: "none", fontFamily: "'poppins', sans-serif", padding: 0, margin: 0 }}>
                                {[{ title: "Home", path: "/" }, { title: "About Us", path: "/about" }, { title: "Doctors", path: "/doctor-list" }, { title: "Diagnostics", path: "/clinic-list" }, { title: "Contact Us", path: "/contact" },].map((item, i) => (
                                    <li key={i} style={{ marginBottom: "10px" }}>
                                        <a
                                            href={item.path} // Placeholder link
                                            style={{
                                                fontSize: "15px",
                                                 fontFamily: "'poppins', sans-serif",
                                                color: "#cbd5e0", // Lighter link color
                                                textDecoration: "none",
                                                transition: baseTransition,
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = "#007a7e"}
                                            onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e0"}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Subscribe Form */}
                        <div>
                            <h5 style={{ fontSize: "20px", fontFamily: "'poppins', sans-serif", fontWeight: "700",  padding: "12px 15px", color: "#e2e8f0", marginBottom: "0px" }}>Subscribe</h5>
                            <form>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 15px",
                                        borderRadius: "8px",
                                         fontFamily: "'poppins', sans-serif",
                                        border: "1px solid rgba(0, 122, 126, 0.5)", // More visible border
                                        marginBottom: "10px",
                                        fontSize: "15px",
                                        color: "#e2e8f0", // Light text for input
                                        background: "rgba(0, 122, 126, 0.1)", // Subtle dark background for input
                                        boxSizing: "border-box", // Include padding in width
                                    }}
                                />
                                <button
                                    type="button"
                                    style={{
                                        width: "100%",
                                        padding: "12px 15px",
                                        background: "#007a7e",
                                        color: "#ffffff",
                                        border: "none",
                                         fontFamily: "'poppins', sans-serif",
                                         background: "linear-gradient(to right, #007a7e, #004d4f)",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        transition: baseTransition,
                                        boxShadow: "0 4px 15px rgba(0, 122, 126, 0.4)", // Darker shadow
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "#004d4f"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "#007a7e"}
                                >
                                    Subscribe
                                </button>
                                <p style={{ fontSize: "14px", fontFamily: "'poppins', sans-serif", lineHeight: "1.5", color: "#cbd5e0", marginTop: "15px", marginBottom: "0" }}>
                                    Get The Latest Updates via email. Any time you may unsubscribe
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        padding: "25px 0",
                        borderTop: "1px solid rgba(0, 122, 126, 0.2)", // Lighter border for contrast
                        marginTop: "0px",
                        display: "flex",
                         fontFamily: "'poppins', sans-serif",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "14px", // Gap for wrapping items
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(30px)",
                        transition: `opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s`,
                    }}
                >
                    <div style={{ fontSize: "14px", fontFamily: "'poppins', sans-serif", color: "#cbd5e0", textAlign: "left", flex: "1 1 300px" }}>
                        <p style={{ margin: "0", lineHeight: "1.6" }}>
                            © <a href="#" style={{ color: "white", fontFamily: "'poppins', sans-serif", textDecoration: "none" }}>2025</a> Vaidya Bandhu – All Rights Reserved. <br />
                            This website and its content are the intellectual property of <strong>MyCompanyon Healthcare Pvt Ltd</strong>. <br />
                            Unauthorized use is strictly prohibited under <strong>Copyright Act, 1957</strong>.
                        </p>
                    </div>
                   <ul
  style={{
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 0,
    margin: 0,
    justifyContent: "center", // center for small screens (you can change this)
    gap: "10px", // controls spacing between items
  }}
>
  {[
    { title: "Privacy Policy", path: "#" },
    { title: "Terms & Conditions", path: "#" },
    { title: "Refund & Cancellation Policy", path: "#" },
  ].map((item, i, arr) => (
    <li
      key={i}
      style={{
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap", // prevents text from breaking into new lines
      }}
    >
      <a
        href={item.path}
        style={{
          fontSize: "14px",
          color: "#cbd5e0",
          textDecoration: "none",
          transition: "0.3s all",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#007a7e")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e0")}
      >
        {item.title}
      </a>

      {/* Add | separator only if not last item */}
      {i < arr.length - 1 && (
        <span style={{ marginLeft: "10px", color: "#a0aec0" }}>|</span>
      )}
    </li>
  ))}
</ul>

                </div>
            </div>

            {/* Keyframes for the floating background shapes */}
            <style>
                {`
                    @keyframes floatShape3 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(15px, 15px); }
                        100% { transform: translate(0, 0); }
                    }
                    @keyframes floatShape4 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(-15px, -15px); }
                        100% { transform: translate(0, 0); }
                    }

                    /* Responsive adjustments */
                    @media (max-width: 992px) {
                        div[style*="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))"] {
                            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
                        }
                    }

                    @media (max-width: 768px) {
                        div[style*="display: flex"][style*="flex-wrap: wrap"][style*="justify-content: space-around"] {
                            flex-direction: column !important;
                            align-items: center !important;
                            gap: 40px !important;
                        }
                        div[style*="flex: 1 1 280px"] { /* Info blocks */
                            max-width: 90% !important;
                            text-align: center !important;
                            align-items: center !important;
                            justify-content: center !important;
                        }
                        div[style*="flex: 1 1 300px"], div[style*="flex: 1 1 200px"] { /* Copyright and bottom links */
                            flex-basis: 100% !important;
                            text-align: center !important;
                            justify-content: center !important;
                        }
                        ul[style*="justify-content: flex-end"] { /* Bottom links */
                            justify-content: center !important;
                        }
                        h2 { font-size: clamp(30px, 6vw, 40px) !important; }
                        p { font-size: clamp(15px, 2.5vw, 18px) !important; }
                        h5 { font-size: clamp(18px, 3vw, 22px) !important; }
                    }
@media (max-width: 480px) {
  div[style*="padding-top: 60px"] {
    padding-top: 40px !important;
  }

  div[style*="margin-bottom: 60px"] {
    margin-bottom: 40px !important;
  }

  div[style*="padding: 60px 0"] {
    padding: 40px 0 !important;
  }

  div[style*="padding: 25px 0"] {
    padding: 15px 0 !important;
  }

  h2 {
    font-size: clamp(28px, 7vw, 36px) !important;
  }

  p {
    font-size: clamp(14px, 3vw, 16px) !important;
  }

  h5 {
    font-size: clamp(16px, 4vw, 20px) !important;
  }

  input[type="email"],
  button {
    padding: 10px 12px !important;
    font-size: 14px !important;
  }

  ul[style*="gap: 15px"] {
    gap: 10px !important;
  }

  ul[style*="gap: 15px"] li span {
    margin-left: 10px !important;
  }

  /* Remove display: flex and fix icon + text block layout */
  div[style*="display: flex"][style*="flex-wrap: wrap"][style*="justify-content: space-around"] {
    display: block !important;
    gap: 0 !important;
    margin-bottom: 40px !important;
  }

  /* ICON + TEXT block fix (only on mobile) */
 div[style*="flex: 1 1 280px"] {
  display: table !important;
  width: 100% !important;
  text-align: left !important;
  max-width: 100% !important;
  gap: 0 !important;
  margin-bottom: 20px !important; /* ✅ adds vertical gap between blocks */
}


  div[style*="flex: 1 1 280px"] > div:first-child {
    display: table-cell !important;
    vertical-align: middle !important;
    width: 60px !important;
  }

  div[style*="flex: 1 1 280px"] > div:first-child svg {
    display: block !important;
    margin: auto;
  }

  div[style*="flex: 1 1 280px"] > div:nth-child(2) {
    display: table-cell !important;
    vertical-align: middle !important;
    padding-left: 15px !important;
  }
}


                `}
            </style>
        </footer>
    );
}

export default Footer;
