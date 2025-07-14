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
          height: '550px', // Fixed height for consistent layout
          backgroundColor: '#f8f8f8',
        }}
      >
               <div className="container">
                   <div className="sigma_subheader-inner">
                       <h1>{this.props.breadcrumb.pagename}</h1>
                   </div>
                   {/* <ol className="breadcrumb">
                       <li className="breadcrumb-item">
                           <Link to="/" className="btn-link">Home</Link>
                       </li>
                       <li className="breadcrumb-item active" aria-current="page">{this.props.breadcrumb.pagename}</li>
                   </ol> */}
               </div>
               {/* Replaced multiple images with a single banner image */}
               <img
          src={process.env.PUBLIC_URL + "/assets/img/bn-2.jpeg"}
          alt="Subheader Banner"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }}
        />
           </div>
       );
   }
}

export default Breadcrumbs;