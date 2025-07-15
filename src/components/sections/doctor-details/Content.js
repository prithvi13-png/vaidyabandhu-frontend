import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDoctor } from "../../../helper/doctorHelper";
import { getAuthor, Rating } from "../../../helper/helper";

class Content extends Component {
  render() {
    const detailId = this.props.detailId;
    const item = getDoctor(detailId);

    // Dr. Vijay Kumar J R's data
    const doctorData = {
      name: "Dr. Vijay Kumar J R",
      qualifications:
        "MBBS, MD (General Medicine), DNB (Medicine), DM (Cardiology), DNB (Cardiology), FICC, FSCAI, AFESC",
      designation: "Senior Interventional Cardiologist",
      experience: "20+ years",
      positions: [
        "Consultant – Apollo Hospitals, Bannerghatta Road",
        "Associate Professor – Jayadeva Institute of Cardiology",
        "Consultant – Phonix Women's & Cardiac Centre",
      ],
      achievements: ["5000+ Angioplasties", "10,000+ Diagnostic Angiograms"],
      specialties: [
        "CTO (Chronic Total Occlusion)",
        "Bifurcation Lesions",
        "Left Main Interventions",
        "Primary PCI",
        "Radial Angioplasties",
        "PTMC, PBV, ABV Balloon Valvotomies",
        "Pacemaker Implantations",
        "ASD, VSD & PDA Device Closures",
        "TAVR (Transcatheter Aortic Valve Replacement)",
      ],
      awards: [
        "🥈 Silver Medal in Forensic Medicine – RGUHS",
        "🎓 Second Topper in Overall MBBS – JJM Medical College",
        "🧠 Quiz Winner – Second place at KAPICON 2007, Manipal",
        "🏆 Best Case Presentation – MMM, Chennai, 2015",
        "🌍 Associate International Fellow – European Society of Cardiology (FESC), Mumbai, 2018",
      ],
      about:
        "Dr. Vijay Kumar J R is a highly accomplished and respected Senior Interventional Cardiologist with over 20 years of rich clinical experience in the field of internal medicine and cardiology. He is known for his commitment to advanced heart care, clinical excellence, and compassionate service.",
      trustText:
        "With over two decades of experience and a passion for healing, Dr. Vijay Kumar J R continues to transform lives through timely interventions, innovative cardiac procedures, and ethical care. His warm approach, deep expertise, and strong academic foundation make him one of the most trusted names in cardiology today.",
    };

    return (
      <div className="section sigma_post-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="sigma_post-details-inner">
                <div className="entry-content">
                  <div className="sigma_team style-17 mb-0">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <div className="sigma_team-thumb">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/" +
                              (item?.image || "images/doctor-placeholder.jpg")
                            }
                            alt={doctorData.name}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="sigma_team-body">
                          <h5>
                            <Link
                              to={
                                "/doctor-details/" + (item?.id || "vijay-kumar")
                              }
                            >
                              {doctorData.name}
                            </Link>
                          </h5>
                          <div className="sigma_rating">
                            {Rating(item?.rating || 5)}
                            <span className="ml-3">
                              ({item?.reviews?.length || 0})
                            </span>
                          </div>
                          <div className="sigma_team-categories">
                            <Link
                              to={
                                "/doctor-details/" + (item?.id || "vijay-kumar")
                              }
                              className="sigma_team-category"
                            >
                              {doctorData.designation}
                            </Link>
                          </div>
                          <div className="qualifications mb-3">
                            <small className="text-muted">
                              <strong>{doctorData.qualifications}</strong>
                            </small>
                          </div>
                          <div className="sigma_team-info mt-4">
                            <span>
                              <i className="fal fa-user-md" />
                              {doctorData.experience} Experience
                            </span>
                            <span>
                              <i className="fal fa-phone" />
                              {item?.phone || "+91-XXXXXXXXXX"}
                            </span>
                            <span>
                              <i className="fal fa-at" />
                              {item?.email || "dr.vijaykumar@example.com"}
                            </span>
                            <span>
                              <i className="fal fa-building" />
                              Apollo Hospitals, Bannerghatta Road
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Positions */}
                  <div className="current-positions my-4">
                    <h5 className="mb-3">Current Positions</h5>
                    <div className="row">
                      {doctorData.positions.map((position, index) => (
                        <div key={index} className="col-md-12 mb-2">
                          <div className="position-item d-flex align-items-center">
                            <i className="fal fa-hospital text-primary me-2"></i>
                            <span>{position}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-menu-list">
                    <div className="row no-gutters">
                      <div className="col-md-3">
                        <div className="menu nav-item">
                          <Link
                            to="#"
                            className="nav-link active p-0"
                            onClick={() =>
                              document
                                .getElementById("overview")
                                .scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Overview
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="menu nav-item">
                          <Link
                            to="#"
                            className="nav-link p-0"
                            onClick={() =>
                              document
                                .getElementById("expertise")
                                .scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Expertise
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="menu nav-item">
                          <Link
                            to="#"
                            className="nav-link p-0"
                            onClick={() =>
                              document
                                .getElementById("achievements")
                                .scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Achievements
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="menu nav-item">
                          <Link
                            to="#"
                            className="nav-link p-0"
                            onClick={() =>
                              document
                                .getElementById("awards")
                                .scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Awards
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overview Section */}
                  <div id="overview" className="mb-5">
                    <h4>About {doctorData.name}</h4>
                    <p>{doctorData.about}</p>
                    <div className="why-trust-section mt-4">
                      <h5>Why Patients Trust {doctorData.name}</h5>
                      <p>{doctorData.trustText}</p>
                    </div>
                  </div>

                  {/* Expertise Section */}
                  <div id="expertise" className="mb-5">
                    <h4>Expertise & Specializations</h4>
                    <div className="row">
                      {doctorData.specialties.map((specialty, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="specialty-item d-flex align-items-center">
                            <i className="fal fa-check-circle text-success me-2"></i>
                            <span>{specialty}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements Section */}
                  <div id="achievements" className="mb-5">
                    <h4>Professional Achievements</h4>
                    <div className="row">
                      {doctorData.achievements.map((achievement, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="achievement-card text-center p-4 border rounded">
                            <div className="achievement-number display-4 text-primary font-weight-bold">
                              {achievement.split(" ")[0]}
                            </div>
                            <div className="achievement-text">
                              {achievement.split(" ").slice(1).join(" ")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Awards Section */}
                  <div id="awards" className="mb-5">
                    <h4>Awards & Recognitions</h4>
                    <div className="awards-list">
                      {doctorData.awards.map((award, index) => (
                        <div
                          key={index}
                          className="award-item mb-3 p-3 border-left border-primary"
                        >
                          <div className="award-text">{award}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="spacer"></div>
                </div>
              </div>
            </div>

            {/* Sidebar Start */}
            <div className="col-lg-4">
              <div className="sidebar style-10 mt-5 mt-lg-0">
                {/* Quick Info Widget */}
                <div className="widget">
                  <h5 className="widget-title">Quick Information</h5>
                  <div className="widget-inner">
                    <div className="quick-info-item mb-3">
                      <strong>Experience:</strong> {doctorData.experience}
                    </div>
                    <div className="quick-info-item mb-3">
                      <strong>Specialization:</strong> {doctorData.designation}
                    </div>
                    <div className="quick-info-item mb-3">
                      <strong>Procedures Performed:</strong>
                      <ul className="mt-2">
                        <li>5000+ Angioplasties</li>
                        <li>10,000+ Diagnostic Angiograms</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* form Widget */}
                <div className="widget widget-form">
                  <h5 className="widget-title">Booking Summary</h5>
                  <div className="widget-inner">
                    <form>
                      <label>Date</label>
                      <div className="form-group">
                        <i className="fal fa-calendar-alt" />
                        <input
                          type="text"
                          name="date"
                          data-provide="datepicker"
                          placeholder="07/10/2022"
                        />
                      </div>
                      <label>Time</label>
                      <div className="form-group mb-0">
                        <i className="far fa-clock" />
                        <input type="text" name="time" placeholder="08:30 PM" />
                      </div>
                    </form>
                  </div>
                  <hr />
                  <div className="widget-inner widget-service">
                    <form>
                      <div className="form-group">
                        <label>Choose Service</label>
                        <ul>
                          <li className="d-flex justify-content-between mb-3">
                            <div className="d-flex">
                              <input
                                type="checkbox"
                                id="angioplasty"
                                name="checkbox"
                              />
                              <label className="mb-0" htmlFor="angioplasty">
                                Angioplasty Consultation
                              </label>
                            </div>
                            <span>₹1500</span>
                          </li>
                          <li className="d-flex justify-content-between mb-3">
                            <div className="d-flex">
                              <input
                                type="checkbox"
                                id="diagnostic"
                                name="checkbox"
                              />
                              <label className="mb-0" htmlFor="diagnostic">
                                Diagnostic Angiogram
                              </label>
                            </div>
                            <span>₹2000</span>
                          </li>
                          <li className="d-flex justify-content-between">
                            <div className="d-flex">
                              <input
                                type="checkbox"
                                id="pacemaker"
                                name="checkbox"
                              />
                              <label className="mb-0" htmlFor="pacemaker">
                                Pacemaker Consultation
                              </label>
                            </div>
                            <span>₹1200</span>
                          </li>
                        </ul>
                      </div>
                      <Link
                        to="/appointment"
                        className="sigma_btn btn-block btn-sm"
                      >
                        Book Appointment
                        <i className="fal fa-arrow-right ml-3" />
                      </Link>
                    </form>
                  </div>
                </div>

                {/* form Widget 2 */}
                <div className="widget">
                  <h5 className="widget-title">Get in Touch</h5>
                  <div className="widget-inner">
                    <form>
                      <div className="form-group">
                        <i className="fal fa-user" />
                        <input
                          type="text"
                          name="fname"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <i className="fal fa-envelope" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          name="message"
                          rows={5}
                          placeholder="Message"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="sigma_btn btn-block btn-sm"
                      >
                        Send Message
                        <i className="fal fa-arrow-right ml-3" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Contact Widget */}
                <div className="widget">
                  <h5 className="widget-title">Contact</h5>
                  <div className="widget-inner">
                    <div className="sigma_info style-24 p-0 shadow-none">
                      <div className="sigma_info-title">
                        <span className="sigma_info-icon bg-primary-1 text-white">
                          <i className="fal fa-phone" />
                        </span>
                      </div>
                      <div className="sigma_info-description">
                        <h5>Our Phone</h5>
                        <p>Phone No.: {item?.phone || "+91-XXXXXXXXXX"}</p>
                      </div>
                    </div>
                    <div className="sigma_info style-24 p-0 shadow-none">
                      <div className="sigma_info-title">
                        <span className="sigma_info-icon bg-primary-1 text-white">
                          <i className="fal fa-envelope-open-text" />
                        </span>
                      </div>
                      <div className="sigma_info-description">
                        <h5>Our Email</h5>
                        <p>
                          Inquiries:{" "}
                          {item?.email || "dr.vijaykumar@example.com"}
                        </p>
                      </div>
                    </div>
                    <div className="sigma_info style-24 p-0 shadow-none mb-0">
                      <div className="sigma_info-title">
                        <span className="sigma_info-icon bg-primary-1 text-white">
                          <i className="fal fa-map-marker-alt" />
                        </span>
                      </div>
                      <div className="sigma_info-description">
                        <h5>Our Address</h5>
                        <p>Apollo Hospitals, Bannerghatta Road, Bangalore</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar End */}
          </div>
        </div>
        {
          <style>{`
                        .achievement-card {
    transition: transform 0.3s ease;
}


.specialty-item, .position-item, .award-item {
    transition: background-color 0.3s ease;
}



.award-item {
    background-color: #f8f9fa;
    border-radius: 5px;
}

.quick-info-item {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.quick-info-item:last-child {
    border-bottom: none;
}
                        `}</style>
        }
      </div>
    );
  }
}

export default Content;
