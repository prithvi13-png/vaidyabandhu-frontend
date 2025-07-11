import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Breadcrumbs extends Component {
  render() {
    const decorativeSvg = `${process.env.PUBLIC_URL}/assets/img/stethoscope.svg`;

    return (
      <div className="sigma_subheader style-5 bg-gray" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="sigma_subheader-inner">
            <h1>{this.props.breadcrumb.pagename}</h1>
          </div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="btn-link">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{this.props.breadcrumb.pagename}</li>
          </ol>
        </div>

        {/* Decorative SVG in 3 corners */}
        <img src={decorativeSvg} className="br" alt="decorative healthcare icon" />
        <img src={decorativeSvg} className="bl" alt="decorative healthcare icon" />
        <img src={decorativeSvg} className="tr" alt="decorative healthcare icon" />

        {/* CSS styles */}
        <style>{`
          .sigma_subheader img {
            position: absolute;
            opacity: 0.06;
            width: 100px;
            height: auto;
            z-index: 1;
          }
          .sigma_subheader .br {
            bottom: 10px;
            right: 10px;
          }
          .sigma_subheader .bl {
            bottom: 10px;
            left: 10px;
          }
          .sigma_subheader .tr {
            top: 10px;
            right: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default Breadcrumbs;
