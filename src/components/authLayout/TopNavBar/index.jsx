import { Form } from "react-bootstrap";
import "../../../assets/css/Topbar.css";
import ProfileDropdown from "./components/ProfileDropdown";
import Select from "react-select";
import { isNotEmptyArray } from "../../utiles/utils";
import { useAuthContext } from "../../context";
import { useMemo, useEffect } from "react";

const Topbar = () => {
  const { user, setUser } = useAuthContext();

  // Build hospitalList for the select dropdown
  const hospitalList = useMemo(() => {
    if (isNotEmptyArray(user?.hospital)) {
      return user.hospital.map((el) => ({
        ...el,
        label: el.description,
        value: el.id,
      }));
    }
    return [];
  }, [user?.hospital]);

  // This will set the default selected hospital (first one) after render if not already set
  useEffect(() => {
    if (
      isNotEmptyArray(hospitalList) &&
      (!user?.selectedHostiptal || !hospitalList.some(h => h.id === user.selectedHostiptal.id))
    ) {
      setUser({ ...user, selectedHostiptal: hospitalList[0] });
    }
    // eslint-disable-next-line
  }, [user, setUser, hospitalList]);

  const onChangeProject = (val) => {
    setUser({ ...user, selectedHostiptal: val });
  };

  return (
    <header className="topbar">
      <div>
        <div className="project-section">
          <span className="project-label">Hospital:</span>
          <Form.Group controlId="type" className="mb-0 project-select">
            <Select
              options={hospitalList}
              onChange={onChangeProject}
              value={user?.selectedHostiptal}
              classNamePrefix="react-select"
              isSearchable={false}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </Form.Group>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-nav-right">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
