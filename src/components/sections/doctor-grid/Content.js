import React, { useState, useEffect, useCallback } from "react";
// import { useHistory } from "react-router-dom";/
import { useNavigate } from "react-router-dom";
import "../../../assets/css/speciality.css";
// Emoji icons for departments
const deptIcons = [
  "🩺",
  "🔬",
  "🚑",
  "👁️",
  "🫁",
  "🫀",
  "⚖️",
  "🩹",
  "👩‍⚕️",
  "💄",
  "🔎",
  "🩻",
  "🦠",
];
const DEFAULT_ICON = "🏥";

// Default specialty images (cycle if needed)
const specialtyImages = [
  "https://img.icons8.com/doodle/96/000000/doctor-male.png",
  "https://img.icons8.com/doodle/96/000000/stethoscope.png",
  "https://img.icons8.com/doodle/96/000000/nurse-female.png",
  "https://img.icons8.com/doodle/96/000000/health-checkup.png",
  "https://img.icons8.com/doodle/96/000000/hospital-bed.png",
];
const DEFAULT_SPEC_IMG = "https://img.icons8.com/color/96/clinic.png";

const MedicalDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [loading, setLoading] = useState(false);
  const [specialtyLoading, setSpecialtyLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch departments
  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://54.226.229.230/api/department/");
      if (!response.ok) throw new Error("Failed to fetch departments");
      const data = await response.json();
      setDepartments(data.data || []);
      setError("");
    } catch {
      setError("Could not load departments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch specialties for selected department
  const fetchSpecialties = useCallback(async (departmentId) => {
    setSpecialtyLoading(true);
    try {
      const response = await fetch(
        `http://54.226.229.230/api/specialty/?department=${departmentId}`
      );
      if (!response.ok) throw new Error("Failed to fetch specialties");
      const data = await response.json();
      setSpecialties(data.data || []);
    } catch {
      setSpecialties([]);
    } finally {
      setSpecialtyLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Department selection handler
  const handleSelectDept = (dept, i) => {
    if (selectedDept && selectedDept.id === dept.id) {
      setSelectedDept(null);
      setSpecialties([]);
      return;
    }
    setSelectedDept(dept);
    fetchSpecialties(dept.id);
  };

  // Icon assignment
  const getIcon = (i) => deptIcons[i % deptIcons.length] || DEFAULT_ICON;

  // Specialty image assignment
  const getSpecImg = (i, imgUrl) =>
    imgUrl ? imgUrl : specialtyImages[i % specialtyImages.length];

  const onClickSpeclist = (item) => {
    navigate("/doctor-list?specialty=" + item.id);
  };

  return (
    <div className="mdc-root container-bg">
      <h2 className="mdc-title">Browse All Departments</h2>
      {error && (
        <div className="mdc-alert">
          <span>{error}</span>
          <button onClick={fetchDepartments} className="mdc-btn mdc-btn-alert">
            Retry
          </button>
        </div>
      )}

      {/* Department Row: Centered with margin */}
      <div className="mdc-horizontal-container">
        <div
          className="mdc-horizontal-scroll"
          style={{ justifyContent: loading ? "center" : "start" }}
        >
          {loading ? (
            <div className="mdc-loading">Loading...</div>
          ) : (
            departments.map((dept, i) => (
              <div
                key={dept.id}
                className={`mdc-hcard ${
                  selectedDept && selectedDept.id === dept.id
                    ? "mdc-hcard-selected"
                    : ""
                }`}
                onClick={() => handleSelectDept(dept, i)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="mdc-hcard-icon">
                  {dept?.image ? (
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="mdc-specialty-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_SPEC_IMG;
                      }}
                    />
                  ) : (
                    getIcon(i)
                  )}
                </div>
                <div className="mdc-hcard-info">
                  <div className="mdc-hcard-name">{dept.name}</div>
                  <div className="mdc-hcard-code">{dept.code}</div>
                  <span
                    className={`mdc-badge ${
                      dept.is_active ? "mdc-badge-active" : "mdc-badge-inactive"
                    }`}
                  >
                    {dept.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Info message if no department selected */}
        {!selectedDept && !loading && (
          <div className="mdc-info-msg">
            <span>ℹ️ Please select a department to view its specialties.</span>
          </div>
        )}
      </div>

      {/* Specialties Section */}
      <div
        className={`mdc-specialty-section ${
          selectedDept ? "mdc-specialty-section-show" : ""
        }`}
      >
        {selectedDept && (
          <>
            <div className="mdc-specialty-header">
              <span>{selectedDept.name} Specialties</span>
              <button
                className="mdc-btn mdc-btn-close"
                onClick={() => {
                  setSelectedDept(null);
                  setSpecialties([]);
                }}
              >
                ×
              </button>
            </div>
            {specialtyLoading ? (
              <div className="mdc-loading-sm">Loading specialties...</div>
            ) : specialties.length ? (
              <div className="mdc-specialty-grid">
                {specialties.map((spec, i) => (
                  <div
                    className="mdc-specialty-card"
                    key={spec.id}
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => onClickSpeclist(spec)}
                  >
                    <div className="mdc-specialty-imgwrap">
                      <img
                        src={spec.image || getSpecImg(i, spec.image_url)}
                        alt={spec.description}
                        className="mdc-specialty-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DEFAULT_SPEC_IMG;
                        }}
                      />
                    </div>
                    <div className="mdc-specialty-title">
                      {spec.description}
                    </div>
                    <div className="mdc-specialty-meta">
                      <span className="mdc-specialty-code">{spec.code}</span>
                      <span
                        className={`mdc-badge ${
                          spec.is_active
                            ? "mdc-badge-active"
                            : "mdc-badge-inactive"
                        }`}
                      >
                        {spec.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="mdc-specialty-dates">
                      <span>Start: {spec.start_date}</span>
                      {spec.end_date && <span>End: {spec.end_date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mdc-empty">No specialties available.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalDepartments;
