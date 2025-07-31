import React, { Component } from 'react';
import testimonials from "../../../data/testimonials.json";
import { getAuthor } from "../../../helper/helper";

class Testimonials extends Component {
    render() {
        return (
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="section-title centered">
                        <h2
                            style={{
                                fontSize: "36px",
                                fontWeight: "800",
                                color: "#004d4f",
                                marginTop: "30px",
                                marginBottom: "10px",
                                fontFamily: "Poppins",
                                position: "relative",
                                display: "inline-block",
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
                                    <div
                                        className="sigma_testimonial style-13 text-left bg-white"
                                        key={i}
                                        style={{
                                            padding: "20px",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <div
                                            className="sigma_author-info"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "16px",
                                            }}
                                        >
                                            <div
                                                className="sigma_testimonial-thumb"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    overflow: "hidden",
                                                    borderRadius: "50%",
                                                    border: "2px solid #007a7e",
                                                }}
                                            >
                                                <img
                                                    src={process.env.PUBLIC_URL + "/" + author.image}
                                                    alt={author.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                            <div className="sigma_author-block">
                                                <h5
                                                    style={{
                                                        margin: 0,
                                                        fontFamily: "Poppins",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {author.name}
                                                </h5>
                                                <span
                                                    className="sigma_testimonial-category"
                                                    style={{
                                                        color: "#5a6778",
                                                        fontFamily: "Poppins",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {author.specialist}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="sigma_testimonial-body"
                                            style={{
                                                marginTop: "16px",
                                                fontFamily: "Poppins",
                                            }}
                                        >
                                            <p className="mb-0" style={{ fontStyle: "italic", color: "#4a5568" }}>
                                                "{item.comment}"
                                            </p>
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