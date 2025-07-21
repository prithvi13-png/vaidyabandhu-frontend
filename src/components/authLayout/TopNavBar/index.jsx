import "../../../assets/css/Topbar.css";
import ProfileDropdown from "./components/ProfileDropdown";

const Topbar = ({ user }) => {
  return (
    <header className="topbar">
      <div />
      <div className="topbar-right">
        <div className="topbar-nav-right">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
