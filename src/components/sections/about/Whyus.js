import React, { Component } from 'react';
import whyusblock from '../../../data/whyus.json';
import '../../../assets/css/about.css';

class Whyus extends Component {
    render() {
        return (
            <div className="section about-section">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-lg-12">
                            <div className="about-section-title text-center">
                                <span className="subtitle">Why Choose Us</span>
                                <h2>Excellence in Holistic Care</h2>
                                <p>Discover what makes Vaidyabandhu your trusted partner in health and wellness.</p>
                            </div>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-lg-5 order-2 order-lg-1">
                            <div className="sigma_about style-21">
                                <div className="section-title">
                                    <h3 className="title text-white">Why Choose VaidyaBandhu?</h3>
                                </div>
                                <div className="sigma_about-content">
                                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader
                                        will be Lorem ipsum dolor sit amet consectetur.</p> */}
                                    {/* Data */}
                                    {whyusblock.slice(0, 6).map((item, i) => (
                                        <div className="sigma_info style-15" key={i}>
                                            <div className="sigma_info-title">
                                                <i className={"sigma_info-icon " + item.icon} />
                                            </div>
                                            <div className="sigma_info-description">
                                                <h5>{item.title}</h5>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Data */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1 order-1 order-lg-2">
                            <div className="sigma_about style-21 mt-0 w-100 h-100">
                                <div className="relative w-full h-72 flex items-center justify-center">
                                {/* First Image */}
                                <img
                                    src={process.env.PUBLIC_URL + "/assets/img/doc-1.jpeg"}
                                    alt="img"
                                    className="rounded-lg shadow-lg w-[300px] h-auto object-cover z-10"
                                />

                                {/* Second Image with left margin */}
                                <img
                                    src={process.env.PUBLIC_URL + "/assets/img/doc-6.jpg"}
                                    alt="img"
                                    className="rounded-lg shadow-lg w-[280px] h-auto object-cover hidden sm:block z-0"
                                    style={{ marginTop: '-6%', marginLeft: '30%' }}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Whyus;