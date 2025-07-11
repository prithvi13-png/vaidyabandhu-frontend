import React, { Fragment } from 'react';
import Navhelper from '../../helper/NavHelper';
import Mobilemenu from './Mobilemenu';
import { Link } from 'react-router-dom';
import navigation from '../../data/navigation.json';
import MembershipModal from './MembershipModal';

class Header extends Navhelper {
  constructor(props) {
    super(props);
    this.state = {
      navMethod: false,
      searchMethod: false,
      userPhone: null,
    };
  }

  componentDidMount() {
    const userPhone = localStorage.getItem("userPhone");
    if (userPhone) {
      this.setState({ userPhone });
    }
  }

  render() {
    return (
      <Fragment>
        {/* Mobile Menu */}
        <aside className={this.state.navMethod ? 'sigma_aside aside-open' : 'sigma_aside'}>
          <div className="sigma_close aside-trigger" onClick={this.toggleNav}>
            <span />
            <span />
          </div>
          <Mobilemenu />
        </aside>
        <div className="sigma_aside-overlay aside-trigger" onClick={this.toggleNav} />

        {/* Header */}
        <header className="sigma_header header-absolute style-5 other can-sticky">
          <div className="sigma_header-top dark-bg d-none d-md-block">
            <div className="container-fluid">
              <div className="sigma_header-top-inner">
               
                <div className="sigma_header-top-contacts">
                  <ul className="sigma_header-top-nav">
                    <li><Link to="#"><i className="fab fa-facebook-f" /></Link></li>
                    <li><Link to="#"><i className="fab fa-twitter" /></Link></li>
                    <li><Link to="#"><i className="fab fa-linkedin-in" /></Link></li>
                    <li><Link to="#"><i className="fab fa-google" /></Link></li>
                  </ul>
                </div>
                 <div className="sigma_header-top-links">
                  <ul className="sigma_header-top-nav">
                    <li>
                      <a href="mailto:support@vaidyabandhu.com">
                        <i className="fal fa-envelope" /> support@vaidyabandhu.com
                      </a>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fal fa-map-marker-alt" /> Bangalore
                      </Link>
                    </li>
                    <li>
                      <a href="tel:+918535853589">
                        <i className="fal fa-mobile" /> +91 8535853589
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="sigma_header-middle">
            <div className="container-fluid">
              <div className="navbar">
                <div className="sigma_logo-wrapper">
                  <Link to="/" className="sigma_logo">
                    <img src={process.env.PUBLIC_URL + "/assets/img/logoo.png"} alt="logo" style={{ borderRadius: '20px' }} />
                  </Link>
                </div>

                <ul className="navbar-nav">
                  {navigation.map((item, i) => (
                    <li key={i} className={item.child ? 'menu-item menu-item-has-children' : 'menu-item'}>
                      {item.child ? (
                        <Link to="#">{item.linkText}</Link>
                      ) : (
                        <Link to={item.link}>{item.linkText}</Link>
                      )}
                      {item.child && (
                        <ul className="sub-menu">
                          {item.submenu.map((sub, j) => (
                            <li key={j} className={sub.child ? 'menu-item menu-item-has-children' : 'menu-item'}>
                              {sub.child ? (
                                <Link to="#">{sub.linkText}</Link>
                              ) : (
                                <Link to={sub.link}>{sub.linkText}</Link>
                              )}
                              {sub.child && (
                                <ul className="sub-menu">
                                  {sub.submenu.map((deep, k) => (
                                    <li className="menu-item" key={k}>
                                      <Link to={deep.link}>{deep.linkText}</Link>
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
                </ul>

                <div className="sigma_header-controls style-2">
                  <ul className="sigma_header-controls-inner">
                    {/* <li className="search-trigger header-controls-item d-none d-sm-block">
                      <Link to="#" className="sigma_header-control-search bg-transparent border-0" title="Search" onClick={this.toggleSearch}>
                        <i className="far fa-search" />
                      </Link>
                    </li> */}
                    {/* Login/Profile Switch */}
                    {this.state.userPhone ? (
                      <>
                        <li className="d-none d-sm-block">
                          <Link to="/profile" className="sigma_btn btn-sm">
                            My Profile
                          </Link>
                        </li>
                        <li className="d-none d-sm-block">
                          <button
                            onClick={() => {
                              localStorage.removeItem("userPhone");
                              window.location.reload();
                            }}
                            className="btn btn-sm btn-outline-light ms-2"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li className="d-none d-sm-block">
                       <MembershipModal />
                      </li>
                    )}

                    <li className="aside-toggle aside-trigger" onClick={this.toggleNav}>
                      <span />
                      <span />
                      <span />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

      
      </Fragment>
    );
  }
}

export default Header;
