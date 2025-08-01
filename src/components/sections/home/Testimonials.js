import React, { Component } from "react";
import testimonials from "../../../data/testimonials.json";
import { getAuthor } from "../../../helper/helper";

class Testimonials extends Component {
  render() {
    return (
      <div className="section section-padding">
        <div className="container">
          <div className="section-title centered">
            {/* <h3 className="title">What Our Doctors Say</h3> */}
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 34px)",
                fontWeight: "800",
                fontFamily: "Poppins",
                color: "#004d4f",
                marginBottom: "10px",
                lineHeight: "1.3",
                //   opacity: animated ? 1 : 0,
                //   transform: animated ? "translateY(0)" : "translateY(30px)",
                //   transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              What Our <span style={{ color: "#007a7e" }}>Doctors Say</span>
            </h2>
          </div>
          <div className="row">
            {/* Data */}
            {testimonials.slice(0, 3).map((item, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                {getAuthor(item.author).map((author, i) => (
                  <div className="sigma_testimonial bg-gray style-13" key={i}>
                    <div className="sigma_testimonial-thumb">
                      <img
                        src={process.env.PUBLIC_URL + "/" + author.image}
                        alt={author.name}
                      />
                      <span className="fas fa-quote-left sigma_testimonial-icon" />
                    </div>
                    <div className="sigma_testimonial-body">
                      <p
                        style={{
                          fontFamily: "Poppins",
                          color: "#007a7e",
                        }}
                      >
                        "{item.comment.slice(0, 124)}"
                      </p>
                      <div className="sigma_author-block">
                        <h5
                          style={{
                            fontFamily: "Poppins",
                            color: "#004d4f", // Doctor's name color
                          }}
                        >
                          {author.name}
                        </h5>
                        <span
                          className="sigma_testimonial-category"
                          style={{
                            fontFamily: "Poppins",
                            color: "#6c757d", // Specialty color
                          }}
                        >
                          {author.specialist}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* Data */}
          </div>
        </div>
      </div>
    );
  }
}

export default Testimonials;