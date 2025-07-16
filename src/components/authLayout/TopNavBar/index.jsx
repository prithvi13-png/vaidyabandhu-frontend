import { useUserContext } from "../../context/userContext";
import ProfileDropdown from "./components/ProfileDropdown";

const TopNavbar = () => {
  const { user } = useUserContext();

  return (
    <div className="topbar">
      <nav
        className={`navbar-custom ${
          user?.isExpanded ? "navbar-custom-left" : ""
        }`}
        id="navbar-custom"
      >
        {/* Right side items */}
        <div className="topbar-nav-right">
          <ProfileDropdown />
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
