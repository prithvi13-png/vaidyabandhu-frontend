import React, { Fragment, useState, useEffect, useCallback } from "react";
import Mobilemenu from "./Mobilemenu";
import { Link } from "react-router-dom";
import navigation from "../../data/navigation.json";
import MembershipModal from "./MembershipModal";
import "../../assets/css/Header.css";

// Custom hook
const useNavHelper = () => {
  const [navMethod, setNavMethod] = useState(false);
  const [searchMethod, setSearchMethod] = useState(false);
  const [windowSize] = useState("");
  const [stickyHeader, setStickyHeader] = useState(0);

  const toggleNav = useCallback(() => {
    setNavMethod((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchMethod((prev) => !prev);
  }, []);

  const StickyHeader = useCallback((e) => {
    const windowSize = window.scrollY;
    const stickyHeader = windowSize > 100;
    setStickyHeader(stickyHeader);
  }, []);

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

const Header = () => {
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
      {navMethod && (
        <div className="sigma_aside-overlay aside-trigger" onClick={toggleNav} />
      )}

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
        {/* Header Top */}
        <div className="sigma_header-top dark-bg">
          <div className="container-fluid">
            {/* Desktop: Full layout | Mobile: Responsive override */}
            <div
              className="sigma_header-top-inner"
              style={{
                display: "flex",
                justifyContent: "space-between",
               
                padding: "8px 0",
              }}
            >
              {/* Left: Social Icons */}
             <div
  className="sigma_header-top-contacts mobile-margin"
  style={{
    display: "flex",
    gap: "12px",
  }}
>
  <Link to="#" style={{ fontSize: "16px", color: "#fff" }}>
    <i className="fab fa-facebook-f" />
  </Link>
  <Link to="#" style={{ fontSize: "16px", color: "#fff" }}>
    <i className="fab fa-twitter" />
  </Link>
  <Link to="#" style={{ fontSize: "16px", color: "#fff" }}>
    <i className="fab fa-linkedin-in" />
  </Link>
  <Link to="#" style={{ fontSize: "16px", color: "#fff" }}>
    <i className="fab fa-google" />
  </Link>
</div>


              {/* Right: Contact Info */}
              <div
                className="sigma_header-top-links"
                style={{
                  display: "flex",
                  gap: "15px",
                  fontSize: "14px",
                  color: "#fff",
                }}
              >
                <a
                  href="mailto:support@vaidyabandhu.com"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <i className="fal fa-envelope" style={{ marginRight: "5px" }} />{" "}
                  support@vaidyabandhu.com
                </a>
                <Link to="#" style={{ color: "#fff", textDecoration: "none" }}>
                  <i className="fal fa-map-marker-alt" style={{ marginRight: "5px" }} /> Bangalore
                </Link>
                <a
                  href="tel:+918535853589"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <i className="fal fa-mobile" style={{ marginRight: "5px" }} /> +91 8535853589
                </a>
              </div>
            </div>

            {/* Mobile-Only Responsive Override */}
            <style>
              {`
                @media (max-width: 768px) {
                  .sigma_header-top-inner {
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    padding: 6px 10px;
                  }

                  /* Tighter social icons on mobile */
                  .sigma_header-top-contacts {
                    display: flex !important;
                  
                    flex-shrink: 0;
                  }

                  .sigma_header-top-contacts a i {
                    font-size: 14px;
                  }

                  /* Stack contact info vertically on very small screens */
                  @media (max-width: 460px) {
                    .sigma_header-top-inner {
                      flex-direction: column;
                      align-items: stretch;
                      gap: 4px;
                      text-align: right;
                    }

                    .sigma_header-top-links {
                      display: flex !important;
                      flex-direction: column !important;
                      align-items: flex-end !important;
                      gap: 2px !important;
                      font-size: 12px !important;
                    }

                    .sigma_header-top-links a,
                    .sigma_header-top-links > div {
                      font-size: 11px !important;
                      color: #fff;
                    }

                    .sigma_header-top-links i {
                      font-size: 12px;
                      margin-right: 4px;
                    }
                  }

                  /* Keep horizontal on mid-mobile */
                  @media (min-width: 461px) and (max-width: 768px) {
                    .sigma_header-top-links {
                      gap: 10px !important;
                      font-size: 13px;
                    }

                    .sigma_header-top-links i {
                      margin-right: 4px;
                    }
                  }
                }
              `}
            </style>
          </div>
        </div>

        {/* Header Middle (Logo + Nav + Controls) */}
        <div className="sigma_header-middle">
          <div className="container-fluid">
            <div className="navbar">
              <div className="sigma_logo-wrapper">
                <Link to="/" className="sigma_logo">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/logoo.png"}
                    alt="logo"
                    style={{ borderRadius: "20px" }}
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
                    className="aside-toggle aside-trigger d-inline-block d-md-none"
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
    </Fragment>
  );
};

export default Header;