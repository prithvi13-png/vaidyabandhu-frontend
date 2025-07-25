import React, { Component } from 'react';
import testimonials from "../../../data/testimonials.json";
import { getAuthor } from "../../../helper/helper"

class Testimonials extends Component {

    render() {
        return (
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="section-title centered">
                        {/* <span className="subtitle">Client Testimonials</span> */}
                        {/* <h3 className="title" style={{ marginTop: '40px' }}>
  What Our Doctors Say
</h3> */}
                        <h2
                            style={{
                                fontSize: "36px",
                                fontWeight: "800",
                                color: "#004d4f",
                                marginTop: "30px",
                                marginBottom: "10px",
                                fontFamily: "'Poppins', sans-serif",
                                position: "relative",
                                display: "inline-block",
                                //   opacity: animated ? 1 : 0,
                                //   transform: animated ? "translateY(0)" : "translateY(20px)",
                                //   transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                            }}
                        >
                            What Our <span style={{ color: "#007a7e" }}>Doctors Say</span>
                        </h2>

                    </div>
                    <div className="row">
                        {/* Data */}
                        {testimonials.slice(0, 2).map((item, i) => (
                            <div className="col-md-6" key={i}>
                                {getAuthor(item.author).map((author, i) => (
                                    <div className="sigma_testimonial style-13 text-left bg-white" key={i}>
                                        <div className="sigma_author-info">
                                            <div className="sigma_testimonial-thumb mr-4">
                                                <img src={process.env.PUBLIC_URL + "/" + author.image} alt={author.name} />
                                                <span className="fas fa-quote-left sigma_testimonial-icon" />
                                            </div>
                                            <div className="sigma_author-block">
                                                <h5>
                                                    {author.name}
                                                </h5>
                                                <span className="sigma_testimonial-category">{author.specialist}</span>
                                            </div>
                                        </div>
                                        <div className="sigma_testimonial-body">
                                            <p className="mb-0">"{item.comment}"</p>
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