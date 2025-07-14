import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import category from "../../data/category.json";

class Servicesidebar extends Component {
    render() {
        return (
            <div className="sidebar mb-5">
                {/* Category Widget */}
                <div className="widget widget-categories">
                    <h5 className="widget-title">Service Categories</h5>
                    <ul>
                        {/* Data */}
                        {category.map((item, i) => (
                            <li key={i}>
                                <Link to={"/service/cat/" + item.id}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        {/* Data */}
                    </ul>
                </div>
                <div className="widget">
                    <h5 className="widget-title">Popular Services</h5>
                    <ul className="popular-services">
                        <li>
                            <Link to="/service-details/1">General Consultation</Link>
                        </li>
                        <li>
                            <Link to="/service-details/2">Health Checkup</Link>
                        </li>
                        <li>
                            <Link to="/service-details/3">Emergency Care</Link>
                        </li>
                    </ul>
                </div>
                <div className="widget">
                    <h5 className="widget-title">Contact Info</h5>
                    <div className="contact-info">
                        <p><strong>Phone:</strong> +1 234 567 8900</p>
                        <p><strong>Email:</strong> info@vaidyabandhu.com</p>
                        <p><strong>Hours:</strong> 24/7 Available</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Servicesidebar;