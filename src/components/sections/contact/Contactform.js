import React from 'react';
import Contacthelper from '../../../helper/Contacthelper';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert } from 'react-bootstrap';

class Contactform extends Contacthelper {
    constructor(props) {
        super(props);
        // Define your color variables as constants here
        this.primaryGreen = '#007a7e';
        this.lightPastelGreen = '#e0f2f2';
        this.darkText = '#333333';
        this.placeholderText = '#888888';
        this.borderColor = '#e0e0e0';
        this.focusBorder = '#00aaaa'; // Note: Focus border will only apply if default browser focus outline uses 'border-color'
        this.buttonHoverBg = '#005f62'; // Note: This will not be applied on hover inline
    }

    render() {
        // Define inline styles for reuse
        const sectionStyle = {
            backgroundColor: '#f8fcfc', // A very light, almost white background
            paddingTop: '80px',
            paddingBottom: '80px',
        };

        const subtitleStyle = {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: this.primaryGreen,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '10px',
            display: 'block',
            textAlign: 'center', // Assuming 'centered' class implies this
        };

        const titleStyle = {
            fontSize: '2.8rem',
            fontWeight: '800',
            color: this.darkText,
            marginBottom: '40px',
            lineHeight: '1.2',
            textAlign: 'center', // Assuming 'centered' class implies this
        };

        const formWrapperStyle = {
            backgroundColor: '#ffffff',
            padding: '50px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            maxWidth: '900px',
            margin: '0 auto',
        };

        const formGroupStyle = {
            marginBottom: '25px',
        };

        const inputStyle = {
            width: '100%',
            padding: '15px 20px',
            border: `1px solid ${this.borderColor}`,
            borderRadius: '10px',
            fontSize: '1rem',
            color: this.darkText,
            backgroundColor: '#fdfdfd',
            outline: 'none', // This will remove the default browser outline
            // Placeholder color cannot be set inline without a workaround (e.g., using JS to set 'data-placeholder-color')
            // Transitions for focus/hover cannot be set inline
        };

        const textareaStyle = {
            ...inputStyle, // Inherit from input style
            resize: 'vertical',
            minHeight: '120px',
        };

        const buttonStyle = {
            backgroundColor: this.primaryGreen,
            color: '#ffffff',
            padding: '15px 40px',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 122, 126, 0.2)', // Static shadow
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            // Hover effects (background-color, box-shadow, transform) cannot be applied inline
        };

        return (
            <div className="section pt-0" style={sectionStyle}>
                <div className="container">
                  <div className="section-title centered" style={{ paddingTop: '30px' }}>
  <span style={subtitleStyle}>Connect With Us</span>
  <h3 style={titleStyle}>Let's Talk!</h3>
</div>

                    <div className="sigma_form style-2" style={formWrapperStyle}>
                        <form onSubmit={this.handleSubmit} method="GET">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div style={formGroupStyle}>
                                        <input type="text" placeholder="Your Full Name" name="name" value={this.state.name} onChange={this.onNameChange} required style={inputStyle} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div style={formGroupStyle}>
                                        <input type="email" placeholder="Your Email Address" name="email" value={this.state.email} onChange={this.onEmailChange} required style={inputStyle} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div style={formGroupStyle}>
                                        <input type="tel" placeholder="Your Phone Number" name="phone" value={this.state.phone} onChange={this.onPhoneChange} required style={inputStyle} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div style={formGroupStyle}>
                                        <input type="text" placeholder="Subject of Your Inquiry" name="subject" value={this.state.subject} onChange={this.onSubjectChange} required style={inputStyle} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div style={formGroupStyle}>
                                        <textarea rows={6} placeholder="Type Your Message Here..." name="message" value={this.state.message} onChange={this.onMessageChange} required style={textareaStyle} />
                                    </div>
                                </div>
                                <ReCAPTCHA
                                    sitekey="6LdxUhMaAAAAAIrQt-_6Gz7F_58S4FlPWaxOh5ib"
                                    onChange={this.reCaptchaLoaded.bind(this)}
                                    size="invisible"
                                />
                                <div className="col-12 text-center">
                                    <button type="submit" style={buttonStyle}>Send Request</button>
                                    {/* Form Messages */}
                                    <Alert variant="success" className="d-none mt-3 mb-0" id="server_response_success">
                                        <strong>Success!</strong> Your request has been successfully submitted!
                                    </Alert>
                                    <Alert variant="danger" className="d-none mt-3 mb-0" id="server_response_danger">
                                        <strong>Oops!</strong> Something went wrong. Please try again later.
                                    </Alert>
                                    {/* Form Messages */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contactform;