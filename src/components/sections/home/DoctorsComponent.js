import React, { useEffect, useState } from "react";

// Sample Doctor Data
const doctorsData = [
  {
    id: "dr-anita-sharma",
    name: "Dr. Anita Sharma",
    specialty: "Cardiologist",
    experience: "15 Years",
    location: "Bengaluru",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+A",
    bio: "Dr. Anita Sharma is a highly respected cardiologist with extensive experience in diagnosing and treating heart conditions. She is known for her patient-centric approach and dedication to providing comprehensive cardiac care. Dr. Sharma specializes in interventional cardiology and preventive heart health.",
    contact: "contact@example.com",
    phone: "+91 98765 43210",
    qualifications: [
      "MBBS",
      "MD (Cardiology)",
      "Fellowship in Interventional Cardiology",
    ],
    awards: ["Best Cardiologist Award 2023", "Patient Choice Award 2022"],
  },
  {
    id: "dr-rajesh-kumar",
    name: "Dr. Rajesh Kumar",
    specialty: "Orthopedic Surgeon",
    experience: "10 Years",
    location: "Mysuru",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+R",
    bio: "Dr. Rajesh Kumar is a leading orthopedic surgeon specializing in joint replacement and sports injuries. His expertise includes minimally invasive surgical techniques, ensuring faster recovery for his patients. He is committed to restoring mobility and improving the quality of life for individuals with musculoskeletal issues.",
    contact: "contact@example.com",
    phone: "+91 98765 43211",
    qualifications: ["MBBS", "MS (Orthopedics)"],
    awards: ["Excellence in Orthopedics 2021"],
  },
  {
    id: "dr-priya-singh",
    name: "Dr. Priya Singh",
    specialty: "Pediatrician",
    experience: "8 Years",
    location: "Mangaluru",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+P",
    bio: "Dr. Priya Singh is a compassionate pediatrician dedicated to the health and well-being of children from infancy through adolescence. She provides comprehensive primary care, preventive health services, and manages acute and chronic pediatric conditions. Her gentle demeanor makes her a favorite among young patients and their parents.",
    contact: "contact@example.com",
    phone: "+91 98765 43212",
    qualifications: ["MBBS", "MD (Pediatrics)"],
    awards: ["Top Pediatrician 2023"],
  },
  {
    id: "dr-suresh-reddy",
    name: "Dr. Suresh Reddy",
    specialty: "Neurologist",
    experience: "12 Years",
    location: "Hubballi",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+S",
    bio: "Dr. Suresh Reddy is an accomplished neurologist with a focus on neurological disorders such as epilepsy, stroke, and migraines. He employs advanced diagnostic techniques and personalized treatment plans to improve patient outcomes. Dr. Reddy is actively involved in neurological research and patient education.",
    contact: "contact@example.com",
    phone: "+91 98765 43213",
    qualifications: ["MBBS", "DM (Neurology)"],
    awards: ["Neurology Excellence Award 2020"],
  },
  {
    id: "dr-meena-patel",
    name: "Dr. Meena Patel",
    specialty: "Dermatologist",
    experience: "7 Years",
    location: "Mysuru",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+M",
    bio: "Dr. Meena Patel is a skilled dermatologist providing expert care for various skin, hair, and nail conditions. She offers both medical and cosmetic dermatology services, including acne treatment, anti-aging solutions, and skin cancer screenings. Dr. Patel is committed to helping patients achieve healthy and radiant skin.",
    contact: "contact@example.com",
    phone: "+91 98765 43214",
    qualifications: ["MBBS", "MD (Dermatology)"],
    awards: ["Rising Star in Dermatology 2023"],
  },
  {
    id: "dr-vikram-goud",
    name: "Dr. Vikram Goud",
    specialty: "Gastroenterologist",
    experience: "18 Years",
    location: "Bengaluru",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+V",
    bio: "Dr. Vikram Goud is a highly experienced gastroenterologist specializing in digestive system disorders. He provides comprehensive care for conditions like IBS, Crohn's disease, and liver diseases. His approach combines advanced diagnostics with compassionate patient management.",
    contact: "contact@example.com",
    phone: "+91 98765 43215",
    qualifications: ["MBBS", "MD (Gastroenterology)"],
    awards: ["Leading Gastroenterologist 2022"],
  },
  {
    id: "dr-shweta-rao",
    name: "Dr. Shweta Rao",
    specialty: "Ophthalmologist",
    experience: "9 Years",
    location: "Mangaluru",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+S2",
    bio: "Dr. Shweta Rao is an expert ophthalmologist focused on eye health and vision correction. She performs cataract surgeries, treats glaucoma, and manages various retinal conditions. Dr. Rao is dedicated to preserving and improving her patients' eyesight.",
    contact: "contact@example.com",
    phone: "+91 98765 43216",
    qualifications: ["MBBS", "MS (Ophthalmology)"],
    awards: [],
  },
  {
    id: "dr-arjun-desai",
    name: "Dr. Arjun Desai",
    specialty: "Pulmonologist",
    experience: "11 Years",
    location: "Hubballi",
    imageUrl: "https://placehold.co/150x150/007a7e/ffffff?text=Dr+A2",
    bio: "Dr. Arjun Desai is a skilled pulmonologist treating respiratory conditions such as asthma, COPD, and lung infections. He is proficient in bronchoscopy and provides personalized care plans to enhance lung function and overall respiratory health.",
    contact: "contact.example.com",
    phone: "+91 98765 43217",
    qualifications: ["MBBS", "MD (Pulmonary Medicine)"],
    awards: ["Pulmonary Care Excellence 2023"],
  },
];

const DoctorsComponent = () => {
  const [animated, setAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  // State to hold the currently selected doctor for detail view
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Number of doctors to show initially before "View More" button appears
  const initialDoctorCount = 6;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Function to render the list of doctors
  const renderDoctorList = () => (
    <>
      <h2
        style={{
          fontSize: "clamp(36px, 5vw, 34px)",
          fontWeight: "800",
          fontFamily: "'Poppins', sans-serif",
          color: "#004d4f",
          marginBottom: "10px",
          lineHeight: "1.2",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        Meet Our <span style={{ color: "#007a7e" }}>Expert Doctors</span>
      </h2>
      <p
        style={{
          fontSize: "clamp(16px, 2.5vw, 22px)",
          color: "#4a5568",
          lineHeight: "1.4",
          fontWeight: "400",
          fontFamily: "'Poppins', sans-serif",
          maxWidth: "1100px",
          margin: "0 auto 40px",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(30px)",
          transition:
            "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
        }}
      >
        Consult trusted doctors, verified specialists anytime, anywhere across
        Karnataka.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Responsive grid for cards
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Render only the initial set of doctors */}
        {doctorsData.slice(0, initialDoctorCount).map((doctor, idx) => (
          <div
            key={doctor.id}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              boxShadow:
                hoveredCard === idx
                  ? "0 18px 40px rgba(0, 122, 126, 0.2)"
                  : "0 8px 20px rgba(0, 122, 126, 0.08)",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${idx * 0.1}s`, // Staggered entrance
              display: "flex", // Use flex for internal layout
              flexDirection: "column",
              alignItems: "center", // Center content vertically
              padding: "25px",
            }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setSelectedDoctor(doctor)} // Set selected doctor on click
          >
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
                border: "4px solid #007a7e",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease-in-out",
                ...(hoveredCard === idx && {
                  transform: "scale(1.08)", // Image scales on hover
                }),
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x150/CCCCCC/666666?text=Dr+Img";
              }}
            />
            <h3
              style={{
                fontSize: "clamp(20px, 2.5vw, 24px)",
                fontWeight: "700",
                fontFamily: "'Poppins', sans-serif",
                color: "#004d4f",
                marginBottom: "5px",
                transition: "color 0.3s ease",
                ...(hoveredCard === idx && {
                  color: "#007a7e", // Title color changes on hover
                }),
              }}
            >
              {doctor.name}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#007a7e",
                fontWeight: "600",
                margin: "0 0 10px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {doctor.specialty}
            </p>
            <p style={{ fontSize: "14px", color: "#4a5568", margin: "0" }}>
              {doctor.experience} Exp. | {doctor.location}
            </p>
          </div>
        ))}
      </div>

      {/* "View More" button - now an <a> tag for redirection */}
      {doctorsData.length > initialDoctorCount && (
        <a
          href="/doctor-list" // This will cause a browser redirect to /doctors
          style={{
            background: "#007a7e",
            color: "#ffffff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
            marginTop: "50px", // Space above the button
            transition: "background 0.3s ease, transform 0.2s ease",
            boxShadow: "0 4px 10px rgba(0, 122, 126, 0.2)",
            textDecoration: "none", // Remove underline from link
            display: "inline-block", // Make it behave like a button
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#004d4f";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#007a7e";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View More Doctors
        </a>
      )}
    </>
  );

  // Function to render the detail view of a single doctor
  const renderDoctorDetail = () => (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 122, 126, 0.1)",
        padding: "20px",
        textAlign: "left",
        opacity: animated ? 1 : 0,
        transform: animated ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <button
        onClick={() => setSelectedDoctor(null)} // Go back to list view
        style={{
          background: "#007a7e",
          color: "#ffffff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "30px",
          transition: "background 0.3s ease, transform 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#004d4f")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#007a7e")}
      >
        &larr; Back to Doctors
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <img
            src={selectedDoctor.imageUrl}
            alt={selectedDoctor.name}
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #007a7e",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/180x180/CCCCCC/666666?text=Dr+Img";
            }}
          />
          <h3
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#004d4f",
              marginTop: "20px",
              marginBottom: "5px",
            }}
          >
            {selectedDoctor.name}
          </h3>
          <p
            style={{
              fontSize: "18px",
              color: "#007a7e",
              fontWeight: "600",
              margin: "0",
            }}
          >
            {selectedDoctor.specialty}
          </p>
          <p style={{ fontSize: "15px", color: "#4a5568", margin: "10px 0 0" }}>
            {selectedDoctor.experience} Exp. | {selectedDoctor.location}
          </p>
        </div>

        <div style={{ flexGrow: 1, minWidth: "280px" }}>
          <h4
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#004d4f",
              marginBottom: "10px",
            }}
          >
            About Dr. {selectedDoctor.name.split(" ")[1]}
          </h4>
          <p
            style={{
              fontSize: "16px",
              color: "#5a6778",
              lineHeight: "1.7",
              marginBottom: "20px",
            }}
          >
            {selectedDoctor.bio}
          </p>

          <h4
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#004d4f",
              marginBottom: "10px",
            }}
          >
            Qualifications
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
            {selectedDoctor.qualifications.map((q, i) => (
              <li
                key={i}
                style={{
                  fontSize: "16px",
                  color: "#5a6778",
                  marginBottom: "5px",
                }}
              >
                <span style={{ color: "#007a7e", marginRight: "8px" }}>•</span>
                {q}
              </li>
            ))}
          </ul>

          {selectedDoctor.awards && selectedDoctor.awards.length > 0 && (
            <>
              <h4
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#004d4f",
                  marginBottom: "10px",
                }}
              >
                Awards & Recognition
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
                {selectedDoctor.awards.map((a, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "16px",
                      color: "#5a6778",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ color: "#007a7e", marginRight: "8px" }}>
                      ★
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h4
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#004d4f",
              marginBottom: "10px",
            }}
          >
            Contact
          </h4>
          <p style={{ fontSize: "16px", color: "#5a6778", margin: "0" }}>
            Email:{" "}
            <a
              href={`mailto:${selectedDoctor.contact}`}
              style={{ color: "#007a7e", textDecoration: "none" }}
            >
              {selectedDoctor.contact}
            </a>
          </p>
          <p style={{ fontSize: "16px", color: "#5a6778", margin: "5px 0 0" }}>
            Phone:{" "}
            <a
              href={`tel:${selectedDoctor.phone}`}
              style={{ color: "#007a7e", textDecoration: "none" }}
            >
              {selectedDoctor.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
        textAlign: "center",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
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

      {/* Conditionally render either the list or the detail view */}
      {selectedDoctor ? renderDoctorDetail() : renderDoctorList()}

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

          /* Responsive adjustments for smaller screens */
          @media (max-width: 768px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 60px 15px !important;
            }
            div[style*="max-width: 900px"] { /* Detail view max-width */
              padding: 30px !important;
            }
            div[style*="display: flex"][style*="flex-wrap: wrap"] { /* Detail view flex container */
              flex-direction: column !important;
              align-items: center !important;
            }
            div[style*="flex-shrink: 0"] { /* Doctor image container in detail view */
              margin-bottom: 20px !important;
            }
            div[style*="flex-grow: 1"] { /* Doctor info in detail view */
              min-width: unset !important;
              width: 100% !important;
            }
            h2 { font-size: clamp(30px, 6vw, 40px) !important; }
            p { font-size: clamp(15px, 2.5vw, 18px) !important; }
            h3 { font-size: clamp(18px, 3vw, 22px) !important; }
            h4 { font-size: clamp(18px, 3vw, 22px) !important; }
          }

          @media (max-width: 480px) {
            div[style*="padding: 80px 20px"] { /* Section padding */
              padding: 40px 10px !important;
            }
            div[style*="max-width: 900px"] { /* Detail view max-width */
              padding: 20px !important;
            }
            h2 { font-size: clamp(28px, 7vw, 36px) !important; }
            p { font-size: clamp(14px, 3vw, 16px) !important; }
            h3 { font-size: clamp(16px, 4vw, 20px) !important; }
            h4 { font-size: clamp(16px, 4vw, 20px) !important; }
            button {
              padding: 8px 15px !important;
              font-size: 14px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DoctorsComponent;
