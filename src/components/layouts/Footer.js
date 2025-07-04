import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serviceblock from "../../data/service/service.json";

class Footer extends Component {
    render() {
        return (
            <footer className="sigma_footer style-5 pb-0">
                <div className="container">
                    <div className="sigma_info-wrapper style-26 mb-5">
                        <div className="sigma_info style-26">
                            <div className="sigma_info-title">
                                <span className="sigma_info-icon">
                                    <i className="fal fa-map-marker-alt" />
                                </span>
                            </div>
                            <div className="sigma_info-description">
                                <p>Our Address</p>
                                <p className="secondary-color"><b>Bangalore - 560078</b>
                                </p>
                            </div>
                        </div>
                        <div className="sigma_info style-26">
                            <div className="sigma_info-title">
                                <span className="sigma_info-icon">
                                    <i className="fal fa-phone" />
                                </span>
                            </div>
                            <div className="sigma_info-description">
                                <p>Call Us</p>
                                <p className="secondary-color"><b>+91 8535853589</b>
                                </p>
                            </div>
                        </div>
                        <div className="sigma_info style-26">
                            <div className="sigma_info-title">
                                <span className="sigma_info-icon">
                                    <i className="fal fa-envelope" />
                                </span>
                            </div>
                            <div className="sigma_info-description">
                                <p>Our Mail</p>
                                <p className="secondary-color"><b>support@vaidyabandhu.com</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sigma_footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="sigma_footer-widget">
                                    <div className="sigma_footer-logo mb-4">
                                        <img
                                            src={process.env.PUBLIC_URL + "/assets/img/logoo.png"}
                                            alt="logo"
                                            width="190"
                                            height="120"
                                        />

                                    </div>
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <p className="mb-0">Quality healthcare at affordable rates, anytime, anywhere.</p>
                                        </div>
                                    </div>
                                    <ul className="sigma_social-icons has-border mt-4 justify-content-start">
                                        <li>
                                            <Link to="#"><i className="fab fa-facebook-f" /></Link>
                                        </li>
                                        <li>
                                            <Link to="#"><i className="fab fa-twitter" /></Link>
                                        </li>
                                        <li>
                                            <Link to="#"><i className="fab fa-instagram" /></Link>
                                        </li>
                                        <li>
                                            <Link to="#"><i className="fab fa-linkedin" /></Link>
                                        </li>
                                        <li>
                                            <Link to="#"><i className="fab fa-google" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-3">
                                <div className="sigma_footer-widget">
                                    <h5 className="widget-title">Our Services</h5>
                                    <ul className="sigma_footer-links">
                                        {/* Data */}
                                        {serviceblock.slice(0, 5).map((item, i) => (
                                            <li key={i}>
                                                <Link to={"/services/"}>{item.title}</Link>
                                            </li>
                                        ))}
                                        {/* Data */}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-3">
                                <div className="sigma_footer-widget">
                                    <h5 className="widget-title">Useful Links</h5>
                                    <ul className="sigma_footer-links">
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/about">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/blog">News</Link>
                                        </li>
                                        <li>
                                            <Link to="/doctor-grid">Doctors</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="sigma_footer-widget">
                                    <h5 className="widget-title">Subscribe</h5>
                                    <form>
                                        <input type="email" name="email" placeholder="Email" required />
                                        <button type="button" className="mt-3 btn-block">Subscribe</button>
                                        <p className="mb-0 mt-3">Get The Latest Updates via email. Any time you may unsubscribe</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="sigma_footer-bottom d-block d-sm-flex align-items-center justify-content-between">
                        <div className="sigma_footer-copyright mt-0 mb-3 mb-sm-0">
                          <p className="mb-0 text-sm text-gray-600 text-left leading-relaxed">
  © <Link to="#">2025</Link> Vaidya Bandhu – All Rights Reserved. <br />
  This website and its content are the intellectual property of <strong>MyCompanyon Healthcare Pvt Ltd</strong>. <br />
  Unauthorized use is strictly prohibited under <strong>Copyright Act, 1957</strong>.
</p>



                        </div>
                        <ul className="sigma_footer-links flex flex-wrap gap-x-4 text-sm text-gray-600">
                            <li>
                                <Link to="#">Privacy</Link>&nbsp; &nbsp;|
                            </li>
                            <li>
                                <Link to="#">Terms</Link>&nbsp; &nbsp; |
                            </li>
                            <li>
                                <Link to="#">Refund</Link>&nbsp; &nbsp;|
                            </li>
                            <li>
                                <Link to="#">Help</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;