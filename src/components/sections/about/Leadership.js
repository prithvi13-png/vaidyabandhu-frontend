import React from 'react';

const LeadershipInline = () => {
  return (
    <section
      style={{
        top: '20px',
        padding: '40px 15px',
        backgroundColor: '#FDF7F0', /* Very light, warm off-white background */
        fontFamily: 'Georgia, serif', /* A slightly more classic, warm font */
        color: '#4A4A4A', /* Soft dark gray for main text */
        lineHeight: '1.4', /* Enhanced line spacing for readability */
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', /* Subtle shadow for depth */
      }}
    >
      <div
        className="container" /* Assuming 'container' is a global utility class */
        style={{
          maxWidth: '1200px', /* Narrower max-width for a single column */
          margin: '0 auto',
          padding: '0 10px',
        }}
      >
        <div className="row gy-5"> {/* 'row' and 'gy-5' are still here, but each 'col-12' ensures stacking */}
          {/* CEO Message */}
          <div className="col-12" style={{
            marginBottom: '10px',
            marginTop: '70px', /* Added margin-top here */
          }}> {/* Ensure full width and add space between sections */}
            <h2
              style={{
                fontSize: '2.0rem', /* Prominent title */
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#8B4513', /* Rich, warm brown for headings */
                borderBottom: '3px solid #D4A373', /* Warm, subtle underline */
                paddingBottom: '10px',
                textAlign: 'center', /* Center align titles */
              }}
            >
              Message from the Founder,<br />Managing Director & CEO
            </h2>
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                color: '#C05621', /* A vibrant but earthy orange-brown */
                marginBottom: '0.8rem',
                textAlign: 'center', /* Center align names */
              }}
            >
              Dr. Ajith Ramaswamy
            </h3>
            <h5
              style={{
                color: '#6B6B6B',
                marginBottom: '2.5rem', /* More space below designation */
                fontSize: '1.2rem',
                fontStyle: 'italic',
                textAlign: 'center', /* Center align designations */
              }}
            >
              Founder, Managing Director & CEO – Vaidya Bandhu
            </h5>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
     At Vaidya Bandhu, our vision is rooted in a powerful belief - Quality healthcare is not a privilege, but a fundamental right. As the Founder, Managing Director & CEO, my mission is to ensure that every individual, regardless of their financial background, has access to affordable, compassionate, and quality medical care.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
The seeds of Vaidya Bandhu were sown during a profoundly moving experience where I witnessed families struggle to afford life-saving treatment. That moment left a lasting impact on me - and sparked a deep resolve to challenge the status quo. I knew something had to change.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
When I met Mr. Subhashith Shetty, a like-minded entrepreneur and journalist, our shared vision of accessible healthcare aligned seamlessly. Together, we founded Vaidya Bandhu — not just as a platform, but as a movement committed to reducing the financial burden of healthcare. Our initiative offers 10% to 40% discounts on surgeries, diagnostics, and medical treatments — making quality healthcare significantly more affordable.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
    But our mission goes beyond discounts. For patients facing extreme financial hardship, we are committed to offering free surgeries, with a target of 25 free surgeries in our first year - because care should never be denied due to cost.
            </p>
            <p
              style={{
                fontWeight: 700,
                color: '#8B4513', /* Use the rich brown for key statements */
                marginTop: '2.5rem',
                padding: '20px',
                backgroundColor: '#FFF8F0', /* Even lighter warm background for highlights */
                borderLeft: '6px solid #D4A373', /* Stronger, warm left border */
                borderRadius: '8px', /* Softer corners */
                marginBottom: '1.5rem',
                fontSize: '1.15rem',
                lineHeight: '1.6',
              }}
            >
Vaidya Bandhu is more than an organization. It is a promise. A promise to support patients, guide families, and stand beside every individual during their most vulnerable times. We are here to make healthcare not just accessible, but human again.
            </p>
            <p
              style={{
                fontWeight: 700,
                color: '#2E8B57', /* A deeper, calming green for assurance */
                marginTop: '2.5rem',
                fontSize: '1.2rem',
                textAlign: 'center', /* Center align closing remarks */
              }}
            >
       Thank you for believing in our mission. We are here to help, and we are here to make a difference.
            </p>
          </div>

          {/* COO Message */}
          <div className="col-12"> {/* Full width for the second message as well */}
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#8B4513',
                borderBottom: '3px solid #D4A373',
                paddingBottom: '12px',
                textAlign: 'center',
              }}
            >
              Message from the Founder, Director & COO 
            </h2>
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                color: '#C05621',
                marginBottom: '0.8rem',
                textAlign: 'center',
              }}
            >
              Dr. Subhashith Shetty
            </h3>
            <h5
              style={{
                color: '#6B6B6B',
                marginBottom: '2.5rem',
                fontSize: '1.2rem',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              Founder, Director & COO – Vaidya Bandhu
            </h5>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
At Vaidya Bandhu, our mission is simple but transformative - to make healthcare accessible, affordable, and trustworthy for everyone. As a Founder and COO, I am deeply committed to ensuring that every patient receives the best care possible, supported by a team that puts people above profit.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
The journey began when a close acquaintance of mine was admitted to a leading corporate hospital. What was expected to be a ₹10 lakh bill ballooned to ₹33 lakh after complications. Insurance covered only a portion, and despite exhausting all options - friends, family, loans - they received no financial relief from the hospital. Even a basic 10% discount could have eased their pain, but it never came.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
It was heartbreaking, and more importantly, it was avoidable. If they had reached out earlier, I could have directed them to a hospital through our network that offers the same quality care at significantly reduced rates.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#4A4A4A' }}>
This experience stayed with me. I shared it with Dr. Ajith, whose compassionate nature and healthcare expertise made him the perfect partner to bring this idea to life. Together, we founded Vaidya Bandhu - a platform committed to bridging the gap between affordability and quality healthcare.
            </p>
          
                <p
              style={{
                fontWeight: 700,
                color: '#8B4513', /* Use the rich brown for key statements */
                marginTop: '2.5rem',
                padding: '20px',
                backgroundColor: '#FFF8F0', /* Even lighter warm background for highlights */
                borderLeft: '6px solid #D4A373', /* Stronger, warm left border */
                borderRadius: '8px', /* Softer corners */
                marginBottom: '1.5rem',
                fontSize: '1.15rem',
                lineHeight: '1.6',
              }}
            >
Along with offering 10% to 40% discounts on medical treatments and diagnostics, we are committed to providing 25 free surgeries in our first year to patients who are in dire financial need. Because for us, it’s not just about discounts - it’s about dignity, access, and saving lives.


            </p>
              <p
              style={{
                fontWeight: 700,
                color: '#2E8B57', /* A deeper, calming green for assurance */
                marginTop: '2.5rem',
                fontSize: '1.2rem',
                textAlign: 'center', /* Center align closing remarks */
              }}
            >
     Thank you for trusting Vaidya Bandhu. We are here to stand by your side - every step of the way.
            </p>
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipInline;