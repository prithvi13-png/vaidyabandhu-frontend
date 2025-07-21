import React, { Component } from 'react';
import { Search, MapPin } from 'lucide-react'; // Import Lucide icons

class Searchform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            location: '',
        }
        this.onTopicChange = this.onTopicChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onTopicChange(event) {
        this.setState({ topic: event.target.value })
    }
    onLocationChange(event) {
        this.setState({ location: event.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.resetForm();
        console.log(this.state.topic, this.state.location);
    }
    resetForm() {
        this.setState({
            topic: "",
            location: ""
        })
    }
    render() {
        const baseTransition = "all 0.3s ease-in-out"; // Define base transition for consistency

        return (
            <div
                className="sigma_banner-info"
                style={{
                    
                    padding: '20px 10px',
                    // Removed the background gradient as requested
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    // marginBottom: '50px',
                    fontFamily: "'Inter', sans-serif",
                    color: '#4a5568',
                }}
            >
<div
  className="container"
  style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '70px' }}
>
                    <div className="sigma_cta style-13">
                        <form onSubmit={this.handleSubmit}>
                            <div
                                className="row no-gutters"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '20px', // Space between columns
                                    alignItems: 'flex-end', // Align items to the bottom
                                }}
                            >
                                <div className="col-lg-6" style={{ flex: '1 1 calc(50% - 10px)' }}>
                                    <div className="form-group" style={{ marginBottom: '0' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '15px' }}>Search Doctor</label>
                                        <input
                                            type="text"
                                            className="topic-field"
                                            placeholder="Search doctors"
                                            value={this.state.topic}
                                            onChange={this.onTopicChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 15px',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                fontSize: '16px',
                                                color: '#4a5568',
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                                boxSizing: 'border-box',
                                            }}
                                            onFocus={(e) => { e.target.style.borderColor = '#007a7e'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 126, 0.2)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6" style={{ flex: '1 1 calc(50% - 10px)' }}>
                                    <div className="form-group" style={{ marginBottom: '0' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '15px' }}>Location</label>
                                        <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
                                            <MapPin size={20} color="#007a7e" style={{ marginRight: '10px', flexShrink: 0 }} /> {/* Lucide MapPin icon */}
                                            <input
                                                type="text"
                                                className="location-field"
                                                placeholder="Location"
                                                value={this.state.location}
                                                onChange={this.onLocationChange}
                                                required
                                                style={{
                                                    flexGrow: 1, // Allow input to take remaining space
                                                    padding: '12px 15px',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '8px',
                                                    fontSize: '16px',
                                                    color: '#4a5568',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                                    boxSizing: 'border-box',
                                                }}
                                                onFocus={(e) => { e.target.style.borderColor = '#007a7e'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 126, 0.2)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                            />
                                            <div className="input-group-append" style={{ marginLeft: '10px', flexShrink: 0 }}>
                                                <button
                                                    type="submit"
                                                    style={{
                                                        background: 'linear-gradient(to right, #007a7e, #004d4f)', // Teal gradient
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        padding: '12px 20px',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        boxShadow: '0 4px 10px rgba(0, 122, 126, 0.2)',
                                                        transition: baseTransition,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#004d4f'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(to right, #007a7e, #004d4f)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                                >
                                                    <Search size={18} style={{ marginRight: '8px' }} /> Find Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Responsive Styles */}
                <style>
                    {`
                        @media (max-width: 992px) {
                            .row.no-gutters {
                                flex-direction: column !important;
                                align-items: stretch !important;
                                gap: 20px !important;
                            }
                            .col-lg-6 {
                                flex: 1 1 100% !important;
                            }
                            .input-group {
                                flex-wrap: wrap; /* Allow wrapping for icon and input */
                            }
                            .input-group > svg { /* MapPin icon */
                                margin-bottom: 10px; /* Space below icon when stacked */
                            }
                            .input-group-append {
                                margin-left: 0 !important; /* Remove left margin when stacked */
                                margin-top: 15px; /* Add top margin for button when stacked */
                                width: 100%; /* Button takes full width */
                            }
                            .input-group-append button {
                                width: 100%; /* Button takes full width */
                                justify-content: center; /* Center button content */
                            }
                        }
                        @media (max-width: 480px) {
                            div[style*="padding: 30px 20px"] { /* Main container padding */
                                padding: 20px 15px !important;
                            }
                            label[style] {
                                font-size: 14px !important;
                            }
                            input[type="text"] {
                                padding: 10px 12px !important;
                                font-size: 15px !important;
                            }
                            .input-group-append button {
                                padding: 10px 15px !important;
                                font-size: 15px !important;
                            }
                            .input-group-append button svg {
                                width: 16px !important;
                                height: 16px !important;
                                margin-right: 6px !important;
                            }
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Searchform;
