import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import workprocess from "../../../data/workprocess.json";

class Workprocess extends Component {
    render() {
        return (
            <div className="section section-padding top-40">
                <div className="container">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-5">
                            <div className="section-title">
                                <span className="subtitle">Work Process</span>
                                <h3 className="title mb-0">How it Works?</h3>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <p className="mb-0">At Vaidya Bandhu, we make quality healthcare simple, affordable, and accessible. Here’s how you can benefit from our services</p>
                        </div>
                        <div className="col-lg-3 text-lg-right">
                            <Link to="/appointment" className="sigma_btn mt-4 mt-lg-0">Get Membership</Link>
                        </div>
                    </div>
                      <style>{`
        .sigma_info-description ul {
          padding-left: 1.2rem;
          margin-bottom: 0.75rem;
        }
        .sigma_info-description ul li {
          list-style: disc;
          font-size: 14px;
          color: #555;
          line-height: 1.5;
          margin-bottom: 6px;
        }
      `}</style>
                    <div className="row sigma_info-wrapper style-25">
                        {/* Data */}
                      {workprocess.map((item, i) => (
  <div className="col-lg-4 col-md-6" key={i}>
    <div className="sigma_info style-25 d-block d-xl-flex">
      <div className="sigma_info-title">
        <span className="sigma_info-icon">
          <i className={item.icon} />
        </span>
      </div>
      <div className="sigma_info-description mt-4 mt-xl-0">
        <h5 dangerouslySetInnerHTML={{ __html: item.title }} />
        <ul className="mb-2">
          {item.points.map((point, j) => (
            <li key={j}>{point}</li>
          ))}
        </ul>
        <span className="steps">Step {i + 1}</span>
        <span className="pulsive-dot" />
      </div>
    </div>
  </div>
))}

                        {/* Data */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Workprocess;