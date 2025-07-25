import React, { Component } from 'react';


class ClientTestimonials extends Component {
  render() {
    return (
      <div className="section section-padding">
        <div className="container">
          <div className="section-title centered">
            {/* <h3 className="title">Your Health, Our Priority – Hear From Our Members</h3> */}
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 32px)",
                fontWeight: "800",
                fontFamily: "'Poppins', sans-serif",
                color: "#004d4f",
                marginBottom: "10px",
                lineHeight: "1.2",
                // opacity: animated ? 1 : 0,
                // transform: animated ? "translateY(0)" : "translateY(30px)",
                // transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              Your Health, Our Priority<br /> <span style={{ color: "#007a7e" }}> Hear From Our Members</span>
            </h2>
          </div>
          <div className="row">
            {/* Review 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="sigma_testimonial bg-gray style-13">
                <div className="sigma_testimonial-thumb">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/c1.jpg"}
                    alt="Anita Deshmukh"
                  />
                  <span className="fas fa-quote-left sigma_testimonial-icon" />
                </div>
                <div className="sigma_testimonial-body">
                  <p>"I booked an appointment in seconds. The doctor consultation was smooth and highly professional."</p>
                  <div className="sigma_author-block">
                    <h5>Anita Gowda</h5>
                    <span className="sigma_testimonial-category">JP Nagar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="sigma_testimonial bg-gray style-13">
                <div className="sigma_testimonial-thumb">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/c3.jpg"}
                    alt="Ravi Kulkarni"
                  />
                  <span className="fas fa-quote-left sigma_testimonial-icon" />
                </div>
                <div className="sigma_testimonial-body">
                  <p>"Vaidya Bandhu effortlessly helped me find the right specialist and lab tests nearby with great ease."</p>
                  <div className="sigma_author-block">
                    <h5>Ravi Rao</h5>
                    <span className="sigma_testimonial-category">Koramangala</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="sigma_testimonial bg-gray style-13">
                <div className="sigma_testimonial-thumb">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/c2.jpg"}
                    alt="Meera Joshi"
                  />
                  <span className="fas fa-quote-left sigma_testimonial-icon" />
                </div>
                <div className="sigma_testimonial-body">
                  <p>"The team was supportive and quick to respond. I felt truly cared for during my health checkup."</p>
                  <div className="sigma_author-block">
                    <h5>Meera Shetty</h5>
                    <span className="sigma_testimonial-category">Vijay Nagar</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ClientTestimonials;
