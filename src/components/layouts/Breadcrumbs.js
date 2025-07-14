import React, { Component } from "react";
import { Link } from "react-router-dom";

class Breadcrumbs extends Component {
  render() {
    const decorativeSvg = `${process.env.PUBLIC_URL}/assets/img/stethoscope.svg`;

    return (
      <div
        className="sigma_subheader style-5 bg-gray"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="container">
          <div className="sigma_subheader-inner">
            <h1>{this.props.breadcrumb.pagename}</h1>
          </div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="btn-link">
                Home
              </Link>
            </li>
            {this.props.breadcrumb?.lastPagePath && (
              <li className="breadcrumb-item">
                <Link
                  to={this.props.breadcrumb?.lastPagePath}
                  className="btn-link"
                >
                  {this.props.breadcrumb?.page}
                </Link>
              </li>
            )}

            <li className="breadcrumb-item active" aria-current="page">
              {this.props.breadcrumb.pagename}
            </li>
          </ol>
        </div>

        {/* Single Decorative SVG */}
        <img
          src={decorativeSvg}
          alt="decorative healthcare icon"
          className="breadcrumb-decor"
        />

        {/* Inline Styles */}
        <style>{`
          .breadcrumb-decor {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 100px;
            opacity: 0.06;
            z-index: 1;
          }
        `}</style>
      </div>
    );
  }
}

export default Breadcrumbs;
