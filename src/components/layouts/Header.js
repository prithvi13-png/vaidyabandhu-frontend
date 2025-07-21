import React, { Fragment, useState, useEffect, useCallback } from "react";
import Mobilemenu from "./Mobilemenu";
import { Link } from "react-router-dom";
import navigation from "../../data/navigation.json";
import MembershipModal from "./MembershipModal";
import "../../assets/css/Header.css";

// Custom hook to implement NavHelper functionality
const useNavHelper = () => {
  const [navMethod, setNavMethod] = useState(false);
  const [searchMethod, setSearchMethod] = useState(false);
  const [windowSize] = useState("");
  const [stickyHeader, setStickyHeader] = useState(0);

  // Nav toggle
  const toggleNav = useCallback(() => {
    setNavMethod((prev) => !prev);
  }, []);

  // Search toggle
  const toggleSearch = useCallback(() => {
    setSearchMethod((prev) => !prev);
  }, []);

  // Sticky header
  const StickyHeader = useCallback((e) => {
    const windowSize = window.scrollY;
    const stickyHeader = windowSize > 100;
    setStickyHeader(stickyHeader);
  }, []);

  // Mobile menu helper functions
  const getNextSibling = useCallback((elem, selector) => {
    var sibling = elem.nextElementSibling;
    if (!selector) return sibling;
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = sibling.nextElementSibling;
    }
  }, []);

  const triggerChild = useCallback(
    (e) => {
      let subMenu = "";
      let subMenuClass = "sub-menu";
      subMenu =
        getNextSibling(e.target, "." + subMenuClass) !== undefined
          ? getNextSibling(e.target, "." + subMenuClass)
          : null;
      if (subMenu !== null && subMenu !== undefined && subMenu !== "") {
        subMenu.classList = subMenu.classList.contains("d-block")
          ? subMenuClass
          : subMenuClass + " d-block";
      }
    },
    [getNextSibling]
  );

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener("scroll", StickyHeader);
    return () => {
      window.removeEventListener("scroll", StickyHeader);
    };
  }, [StickyHeader]);

  return {
    navMethod,
    searchMethod,
    windowSize,
    stickyHeader,
    toggleNav,
    toggleSearch,
    triggerChild,
  };
};

const Header = (props) => {
  const { navMethod, toggleNav } = useNavHelper();
  const [userPhone, setUserPhone] = useState(null);

  useEffect(() => {
    const storedUserPhone = localStorage.getItem("userPhone");
    if (storedUserPhone) {
      setUserPhone(storedUserPhone);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userPhone");
    window.location.reload();
  };

  return (
    <Fragment>
      {/* Mobile Menu */}
      <aside className={navMethod ? "sigma_aside aside-open" : "sigma_aside"}>
        <div className="sigma_close aside-trigger" onClick={toggleNav}>
          <span />
          <span />
        </div>
        <Mobilemenu />
      </aside>
      <div className="sigma_aside-overlay aside-trigger" onClick={toggleNav} />

      {/* Header */}
      <header
        className="sigma_header header-absolute style-5 other can-sticky"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="sigma_header-top dark-bg d-none d-md-block">
          <div className="container-fluid">
            <div className="sigma_header-top-inner">
              <div className="sigma_header-top-contacts">
                <ul className="sigma_header-top-nav">
                  <li>
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-google" />
                    </Link>
                  </li>
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
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/logoo.png"}
                    alt="logo"
                    style={{
                      borderRadius: "20px",
                      width: "180px", // default desktop size
                      height: "auto",
                      maxWidth: "100%", // prevents overflow
                    }}
                  />
                </Link>
              </div>

              <ul className="navbar-nav">
                {navigation.map((item, i) => (
                  <li
                    key={i}
                    className={
                      item.child
                        ? "menu-item menu-item-has-children"
                        : "menu-item"
                    }
                  >
                    {item.child ? (
                      <Link to="#">{item.linkText}</Link>
                    ) : (
                      <Link to={item.link}>{item.linkText}</Link>
                    )}
                    {item.child && (
                      <ul className="sub-menu">
                        {item.submenu.map((sub, j) => (
                          <li
                            key={j}
                            className={
                              sub.child
                                ? "menu-item menu-item-has-children"
                                : "menu-item"
                            }
                          >
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
                  {userPhone ? (
                    <>
                      <li className="d-none d-sm-block">
                        <Link to="/profile" className="sigma_btn btn-sm">
                          My Profile
                        </Link>
                      </li>
                      <li className="d-none d-sm-block">
                        <button
                          onClick={handleLogout}
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

                  <li
                    className="aside-toggle aside-trigger"
                    onClick={toggleNav}
                  >
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
      <style>
  {`
    @media (max-width: 768px) {
      .sigma_logo-wrapper img[src*="logoo.png"] {
        width: 120px !important;
      }
    }

    @media (max-width: 480px) {
      .sigma_logo-wrapper img[src*="logoo.png"] {
        width: 140px !important;
      }
    }
  `}
</style>

    </Fragment>
  );
};

export default Header;
