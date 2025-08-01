import React, { Component } from "react";

class Breadcrumbs extends Component {
  render() {
    return (
      <div
        className="sigma_subheader style-5 bg-gray"
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '550px',
          backgroundColor: '#f8f8f8',
        }}
      >
        <div className="container" style={{ zIndex: 1 }}>
          <div className="sigma_subheader-inner">
            <h1>{this.props.breadcrumb.pagename}</h1>
          </div>
        </div>

        <img
          src={process.env.PUBLIC_URL + "/assets/img/bn-2.jpeg"}
          alt="Subheader Banner"
          className="breadcrumb-banner"
        />

        <style jsx="true">{`
          .breadcrumb-banner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center right; /* Default: visible stethoscope */
            z-index: 0;
          }

          @media (max-width: 768px) {
            .breadcrumb-banner {
              object-position: 80% center; /* Adjust to show stethoscope on mobile */
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Breadcrumbs;
