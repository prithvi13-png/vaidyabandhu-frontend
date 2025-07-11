import React, { Component } from 'react';

class ContactIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCards: [false, false, false],
    };

    // Define your color variables as constants here
    this.colors = {
      primary: '#007a7e',
      primaryLight: '#e0f2f2',
      primaryDark: '#004d4f',
      textMuted: '#6c757d',
      cardBg: '#ffffff',
      shadowLight: 'rgba(0,0,0,0.06)', // Static shadow
    };
  }

  componentDidMount() {
    // Staggered entry visibility (not smooth animation, just delayed appearance)
    [0, 1, 2].forEach((index) => {
      setTimeout(() => {
        this.setState((prevState) => {
          const updated = [...prevState.visibleCards];
          updated[index] = true;
          return { visibleCards: updated };
        });
      }, 150 * (index + 1));
    });
  }

  renderCard(title, iconClass, content, visible, index) {
    const cardContainerStyle = {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      // Transition for appearance/disappearance only, no complex animations
      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    };

    const cardContentStyle = {
      background: this.colors.cardBg,
      borderRadius: '16px',
      padding: '35px 25px',
      textAlign: 'center',
      boxShadow: `0 10px 30px ${this.colors.shadowLight}`, // Static shadow
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    };

    const iconCircleStyle = {
      width: '80px',
      height: '80px',
      margin: '0 auto 25px',
      background: this.colors.primaryLight, // Static light background
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Static shadow
    };

    const iconStyle = {
      fontSize: '30px',
      color: this.colors.primary, // Static primary color
    };

    const titleStyle = {
      color: this.colors.primaryDark,
      fontWeight: 600,
      marginBottom: '10px',
      fontSize: '1.3rem',
    };

    const contentStyle = {
      color: this.colors.textMuted,
      fontSize: '15px',
      lineHeight: 1.6,
      marginBottom: 0,
      whiteSpace: 'pre-line',
    };

    return (
      <div
        key={index}
        className="col-lg-4 col-md-6 mb-4"
        style={cardContainerStyle}
      >
        <div style={cardContentStyle}>
          <div style={iconCircleStyle}>
            <i className={iconClass} style={iconStyle} />
          </div>
          <h5 style={titleStyle}>{title}</h5>
          <p style={contentStyle}>{content}</p>
        </div>
      </div>
    );
  }

  render() {
    const { visibleCards } = this.state;

    const sectionStyle = {
      backgroundColor: '#f8fcfc', // Very light background for the section
      paddingTop: '80px',
      paddingBottom: '80px',
    };

    return (
      <div className="section section-padding" style={sectionStyle}>
        <div className="container">
          <div className="row justify-content-center">
            {this.renderCard(
              'Our Address',
              'flaticon-hospital',
              `Vaidya Bandhu Healthcare Foundation (A Unit of MyCompanyon Healthcare Pvt Ltd)
No. 93, 3rd Floor, 1st Cross, Wilson Garden Housing Society,
Kothnur Main Road, J.P. Nagar 7th Phase, Bangalore - 560078, Karnataka, India.`,
              visibleCards[0],
              0
            )}

            {this.renderCard(
              'Our Phone',
              'flaticon-call',
              'Mobile: +91 8535853589',
              visibleCards[1],
              1
            )}

            {this.renderCard(
              'Our Email',
              'flaticon-envelope',
              'support@vaidyabandhu.com',
              visibleCards[2],
              2
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactIcons;