import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Mobilemenu from './Mobilemenu';
import navigation from '../../data/navigation.json';
import MembershipModal from './MembershipModal';

const Headertwo = () => {
    // State for managing the navigation toggle (mobile menu visibility)
    const [navMethod, setNavMethod] = useState(false);

    // Toggle function to open/close the mobile navigation menu
    const toggleNav = () => {
        setNavMethod(prevState => !prevState);
    };

    return (
        <>
            {/* Mobile Menu */}
            <aside className={navMethod ? 'sigma_aside aside-open' : 'sigma_aside'}>
                <div className="sigma_close aside-trigger" onClick={toggleNav}>
                    <span />
                    <span />
                </div>
                <Mobilemenu />
            </aside>
            <div className="sigma_aside-overlay aside-trigger" onClick={toggleNav} />
            {/* Mobile Menu */}
            
            {/* Header */}
            <header className="sigma_header style-5 bg-transparent shadow-none can-sticky">
                <div className="container">
                    <div className="sigma_header-top d-none d-md-block">
                        <div className="sigma_header-top-inner">
                            <div className="sigma_header-top-links">
                                <ul className="sigma_header-top-nav">
                                    <li>
                                        <Link to="#">
                                            <i className="fal fa-envelope" />
                                            support@vaidyabandhu.com
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fal fa-map-marker-alt" />
                                            Bangalore
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="tel:+918535853589">
                                            <i className="fal fa-phone" /> +91 8535 8535 89
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sigma_header-top-contacts">
                                <ul className="sigma_header-top-nav">
                                    <li><Link to="#"><i className="fab fa-facebook-f" /></Link></li>
                                    <li><Link to="#"><i className="fab fa-twitter" /></Link></li>
                                    <li><Link to="#"><i className="fab fa-linkedin-in" /></Link></li>
                                    <li><Link to="#"><i className="fab fa-google" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="sigma_header-middle pl-4 pr-4">
                        <div className="navbar">
                            <div className="sigma_logo-wrapper">
                                <Link to="/" className="sigma_logo">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/logo-final.png"} alt="logo" style={{ borderRadius: '20px' }} />
                                </Link>
                            </div>
                            <div className="d-flex align-items-center">
                                <ul className="navbar-nav">
                                    {/* Data */}
                                    {navigation.map((item, i) => (
                                        <li key={i} className={item.child ? 'menu-item menu-item-has-children' : 'menu-item'}>
                                            {item.child ? 
                                                <Link to="#">{item.linkText}</Link> 
                                                : 
                                                <Link to={item.link}>{item.linkText}</Link>
                                            }
                                            {item.child && (
                                                <ul className="sub-menu">
                                                    {item.submenu.map((subItem, j) => (
                                                        <li key={j} className={subItem.child ? 'menu-item menu-item-has-children' : 'menu-item'}>
                                                            {subItem.child ? 
                                                                <Link to="#">{subItem.linkText}</Link> 
                                                                : 
                                                                <Link to={subItem.link}>{subItem.linkText}</Link>
                                                            }
                                                            {subItem.child && (
                                                                <ul className="sub-menu">
                                                                    {subItem.submenu.map((subSubItem, k) => (
                                                                        <li key={k} className="menu-item">
                                                                            <Link to={subSubItem.link}>{subSubItem.linkText}</Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                    {/* Data */}
                                </ul>
                                <div className="sigma_header-controls style-2">
                                    <ul className="sigma_header-controls-inner">
                                        <li className="d-none d-sm-block ms-5">
                                            <MembershipModal />
                                        </li>
                                        <li className="aside-toggle aside-trigger" onClick={toggleNav}>
                                            <span />
                                            <span />
                                            <span />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header */}
        </>
    );
};

export default Headertwo;
