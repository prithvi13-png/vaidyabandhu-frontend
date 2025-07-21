import { Form } from "react-bootstrap";
import "../../../assets/css/Topbar.css";
import ProfileDropdown from "./components/ProfileDropdown";
import Select from "react-select";
import { isNotEmptyArray } from "../../utiles/utils";
import { useAuthContext } from "../../context";
import { useMemo } from "react";

const Topbar = () => {
  const { user, setUser } = useAuthContext();
  console.log({ user });
  const hospitalList = useMemo(() => {
    let data = [];
    if (isNotEmptyArray(user?.hospital)) {
      data = user.hospital.map((el) => ({
        ...el,
        label: el.description,
        value: el.id,
      }));
      if (!user?.selectedHostiptal) {
        setUser({ ...user, selectedHostiptal: data[0] });
      }
    }
    return data;
  }, [user?.hospital]);

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
