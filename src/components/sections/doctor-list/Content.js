import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useLocation } from "react-router-dom";
import { isNotEmptyArray } from "../../utiles/utils";
import { useFetch } from "../../hooks/usefetch";

const Content = () => {
  const [locations, setLocations] = useState([]); // Locations for dropdown
  const [activePage, setActivePage] = useState(1);
  const [itemPerpage] = useState(5);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const specialtyParam = params.get("specialty");
  const { id } = useParams(); // Get the doctor ID from the URL

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedSpecialties, setSelectedSpecialties] = useState(
    specialtyParam ? [Number(specialtyParam)] : []
  );
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Search states for filters
  const [specialtySearchTerm, setSpecialtySearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");

  // Static data for filters
  const availabilityOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const ratingOptions = [
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4+ Stars" },
    { value: "3", label: "3+ Stars" },
    { value: "2", label: "2+ Stars" },
    { value: "1", label: "1+ Stars" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "Nopreference", label: "No preference" },
  ];

  // const sortOptions = [
  //   { value: "name", label: "Name (A-Z)" },
  //   { value: "experience", label: "Experience" },
  //   { value: "rating", label: "Rating" },
  //   { value: "reviews", label: "Reviews" },
  // ];

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust delay (500ms) as needed

    return () => clearTimeout(timeoutId); // Cleanup on each keystroke
  }, [searchTerm]);

  // Fetch specialties using useFetch
  const {
    data: specialtiesData,
    loading: specialtiesLoading,
    error: specialtiesError,
  } = useFetch({
    method: "GET",
    request: "specialty/",
  });

  // Fetch locations using useFetch
  const {
    data: locationsData,
    loading: locationsLoading,
    error: locationsError,
  } = useFetch({
    method: "GET",
    request: "https://stage.vaidyabandhu.com/api/locations/",
  });

  useEffect(() => {
    if (locationsData) {
      setLocations(locationsData.data || []);
    }
    if (locationsError) {
      console.error("Error fetching locations:", locationsError);
      setLocations([
        { id: "Delhi", name: "Delhi" },
        { id: "Mumbai", name: "Mumbai" },
        { id: "Bangalore", name: "Bangalore" },
        { id: "Chennai", name: "Chennai" },
        { id: "Hyderabad", name: "Hyderabad" },
      ]);
    }
  }, [locationsData, locationsError]);

  // Fetch departments using useFetch
  const {
    data,
    loading: loader,
    error,
    refetch,
  } = useFetch({
    method: "GET",
    request: "doctors/",
    params: {
      search: debouncedSearchTerm.trim(),
      specialties: selectedSpecialties.join(","),
      locations: selectedLocations.join(","),
      availability: selectedAvailability.join(","),
      rating: selectedRating,
      gender: selectedGender,
      sort: sortBy,
      page_count: itemPerpage,
      page: activePage,
      hostital_id: id,
    },
  });

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleSpecialtyChange = (specialtyId) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialtyId)
        ? prev.filter((id) => id !== specialtyId)
        : [...prev, specialtyId]
    );
  };

  const handleLocationChange = (locationId) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleAvailabilityChange = (day) => {
    setSelectedAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedSpecialties([]);
    setSelectedLocations([]);
    setSelectedAvailability([]);
    setSelectedRating("");
    setSelectedGender("");
    setSortBy("");
    setSpecialtySearchTerm("");
    setLocationSearchTerm("");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedSpecialties.length > 0 ||
    selectedLocations.length > 0 ||
    selectedAvailability.length > 0 ||
    selectedRating ||
    selectedGender ||
    sortBy;

  // Filter specialties based on search term
  const filteredSpecialties = specialtiesData?.data?.filter((specialty) =>
    specialty.description
      .toLowerCase()
      .includes(specialtySearchTerm.toLowerCase())
  );

  // Filter locations based on search term
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  // Get active filter chips
  const getActiveFilters = () => {
    const filters = [];

    if (selectedSpecialties.length > 0) {
      selectedSpecialties.forEach((id) => {
        const specialty = specialtiesData?.data?.find((s) => s.id === id);
        if (specialty) {
          filters.push({ type: "specialty", id, label: specialty.description });
        }
      });
    }

    if (selectedLocations.length > 0) {
      selectedLocations.forEach((id) => {
        const location = locations.find((l) => l.id === id);
        if (location) {
          filters.push({ type: "location", id, label: location.name });
        }
      });
    }

    if (selectedAvailability.length > 0) {
      selectedAvailability.forEach((day) => {
        filters.push({ type: "availability", id: day, label: day });
      });
    }

    if (selectedRating) {
      const rating = ratingOptions.find((r) => r.value === selectedRating);
      if (rating) {
        filters.push({
          type: "rating",
          id: selectedRating,
          label: rating.label,
        });
      }
    }

    if (selectedGender) {
      const gender = genderOptions.find((g) => g.value === selectedGender);
      if (gender) {
        filters.push({
          type: "gender",
          id: selectedGender,
          label: gender.label,
        });
      }
    }

    return filters;
  };

  const removeFilter = (filterType, filterId) => {
    switch (filterType) {
      case "specialty":
        setSelectedSpecialties((prev) => prev.filter((id) => id !== filterId));
        break;
      case "location":
        setSelectedLocations((prev) => prev.filter((id) => id !== filterId));
        break;
      case "availability":
        setSelectedAvailability((prev) =>
          prev.filter((day) => day !== filterId)
        );
        break;
      case "rating":
        setSelectedRating("");
        break;
      case "gender":
        setSelectedGender("");
        break;
      default:
        break;
    }
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="sidebar-style-9 container-bg">
      <div className="section section-padding">
        <div className="container-fluid">
          {/* Top Search Bar */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="search-container">
                <div
                  className="search-wrapper d-flex align-items-center"
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "50px",
                    padding: "8px 20px",
                    border: "1px solid #e9ecef",
                    maxWidth: "600px",
                    margin: "0 auto",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search for Doctors & Specialities...."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control border-0 bg-transparent"
                    style={{
                      fontSize: "16px",
                      padding: "12px 10px",
                      paddingRight: searchTerm ? "50px" : "10px",
                      outline: "none",
                      boxShadow: "none",
                      marginBottom: "0px",
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="btn btn-link p-0"
                      style={{
                        position: "absolute",
                        right: "70px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "20px",
                        color: "#6c757d",
                        textDecoration: "none",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: "1",
                        zIndex: 10,
                      }}
                    >
                      ×
                    </button>
                  )}
                  <button
                    className="btn btn-primary rounded-circle ml-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      position: "relative",
                      zIndex: 5,
                    }}
                  >
                    <i
                      className="fas fa-search"
                      style={{ fontSize: "16px", marginLeft: "0px" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Chips Section */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="filter-section">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-wrap align-items-center">
                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <h5
                        className="mb-0 me-3"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Filters
                      </h5>

                      {/* Reset Button */}
                      {hasActiveFilters && (
                        <button
                          className="btn btn-outline-secondary btn-sm me-2"
                          onClick={handleReset}
                          style={{
                            borderRadius: "20px",
                            padding: "5px 15px",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          RESET
                        </button>
                      )}
                    </div>

                    {/* Active Filter Chips */}
                    <div className="filter-chips-container d-flex flex-wrap">
                      {activeFilters.map((filter, index) => (
                        <span
                          key={index}
                          className="badge badge-light d-flex align-items-center me-2 mb-2"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #dee2e6",
                            borderRadius: "15px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#495057",
                          }}
                        >
                          {filter.label}
                          <button
                            className="btn btn-link p-0 ml-2"
                            onClick={() => removeFilter(filter.type, filter.id)}
                            style={{
                              fontSize: "14px",
                              color: "#6c757d",
                              textDecoration: "none",
                              lineHeight: "1",
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Filters Sidebar */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Sort By */}
                  {/* <div className="mb-4">
                    <h6 className="font-weight-bold mb-3">Sort By</h6>
                    <select
                      className="form-control form-control-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="">Default</option>
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  {/* Specialities */}
                  <div className="mb-4">
                    <h6 className="font-weight-bold mb-3">Specialities</h6>
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-sm mb-3"
                          placeholder="Search Speciality"
                          value={specialtySearchTerm}
                          onChange={(e) =>
                            setSpecialtySearchTerm(e.target.value)
                          }
                          style={{
                            paddingRight: specialtySearchTerm ? "35px" : "12px",
                          }}
                        />
                        {specialtySearchTerm && (
                          <button
                            onClick={() => setSpecialtySearchTerm("")}
                            className="btn btn-link p-0"
                            style={{
                              position: "absolute",
                              right: "8px",
                              top: "20px",
                              fontSize: "18px",
                              color: "#6c757d",
                              textDecoration: "none",
                              lineHeight: "1",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 10,
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {!isNotEmptyArray(filteredSpecialties) ? (
                        <p className="text-muted small">No specialties found</p>
                      ) : (
                        filteredSpecialties.map((specialty) => (
                          <div key={specialty.id} className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`specialty-${specialty.id}`}
                              checked={selectedSpecialties.includes(
                                specialty.id
                              )}
                              onChange={() =>
                                handleSpecialtyChange(specialty.id)
                              }
                            />
                            <label
                              className="form-check-label small"
                              htmlFor={`specialty-${specialty.id}`}
                            >
                              {specialty.description}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <h6 className="font-weight-bold mb-3">Select City</h6>
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-sm mb-3"
                          placeholder="Search Cities"
                          value={locationSearchTerm}
                          onChange={(e) =>
                            setLocationSearchTerm(e.target.value)
                          }
                          style={{
                            paddingRight: locationSearchTerm ? "35px" : "12px",
                          }}
                        />
                        {locationSearchTerm && (
                          <button
                            onClick={() => setLocationSearchTerm("")}
                            className="btn btn-link p-0"
                            style={{
                              position: "absolute",
                              right: "8px",
                              top: "20px",
                              fontSize: "18px",
                              color: "#6c757d",
                              textDecoration: "none",
                              lineHeight: "1",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 10,
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {filteredLocations.length === 0 ? (
                        <p className="text-muted small">No locations found</p>
                      ) : (
                        filteredLocations.map((location) => (
                          <div key={location.id} className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`location-${location.id}`}
                              checked={selectedLocations.includes(location.id)}
                              onChange={() => handleLocationChange(location.id)}
                            />
                            <label
                              className="form-check-label small"
                              htmlFor={`location-${location.id}`}
                            >
                              {location.name}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    <h6 className="font-weight-bold mb-3">Availability</h6>
                    <div className="row">
                      {availabilityOptions.map((day) => (
                        <div key={day} className="col-6 mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`day-${day}`}
                              checked={selectedAvailability.includes(day)}
                              onChange={() => handleAvailabilityChange(day)}
                            />
                            <label
                              className="form-check-label small"
                              htmlFor={`day-${day}`}
                            >
                              {day.slice(0, 3)}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <h6 className="font-weight-bold mb-3">Rating</h6>
                    {ratingOptions.map((rating) => (
                      <div key={rating.value} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          id={`rating-${rating.value}`}
                          checked={selectedRating === rating.value}
                          onChange={() => setSelectedRating(rating.value)}
                        />
                        <label
                          className="form-check-label small"
                          htmlFor={`rating-${rating.value}`}
                        >
                          {rating.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Gender */}
                  <div className="mb-4">
                    <h6 className="font-weight-bold mb-3">Gender</h6>
                    {genderOptions.map((gender) => (
                      <div key={gender.value} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id={`gender-${gender.value}`}
                          checked={selectedGender === gender.value}
                          onChange={() => setSelectedGender(gender.value)}
                        />
                        <label
                          className="form-check-label small"
                          htmlFor={`gender-${gender.value}`}
                        >
                          {gender.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor List */}
            <div className="col-lg-9 col-md-8">
              {error ? (
                <div className="alert alert-danger text-center">
                  <h5>Error</h5>
                  <p>{error}</p>
                  <button className="btn btn-primary mt-2" onClick={refetch}>
                    Try Again
                  </button>
                </div>
              ) : loader ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p className="mt-3">Fetching doctor list...</p>
                </div>
              ) : !isNotEmptyArray(data?.data) ? (
                <div className="text-center py-5">
                  <h5>No doctors found</h5>
                  <p>
                    Try adjusting your search criteria or reset the filters.
                  </p>
                </div>
              ) : (
                <>
                  {data.data.map((item) => (
                    <div className="sigma_team style-17" key={item.id}>
                      <div className="row no-gutters">
                        <div className="col-md-3">
                          <div className="sigma_team-thumb">
                            <img
                              src={item.photo}
                              alt={item.full_name}
                              style={{ maxHeight: "305px" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-5 col-sm-6">
                          <div className="sigma_team-body">
                            <h5>
                              <Link to={`/doctor-details/${item.id}`}>
                                {item.full_name}
                              </Link>
                            </h5>
                            <div className="sigma_team-categories">
                              {item.speciality?.map((specialityItem, index) => (
                                <Link
                                  to={`/doctor-details/${specialityItem.id}`}
                                  className="sigma_team-category"
                                  key={index}
                                >
                                  {specialityItem.description}
                                  {index !== item.speciality.length - 1 && ", "}
                                </Link>
                              ))}
                            </div>
                            <p>{item.qualification}</p>
                            <div className="d-flex align-items-center mt-4">
                              <Link
                                to={`/doctor-details/${item.id}`}
                                className="sigma_btn"
                              >
                                View More
                              </Link>
                              {/* <div className="sigma_team-controls ml-3">
                                <Link to="#" className="">
                                  <i className="fal fa-heart" />
                                </Link>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="sigma_team-footer">
                            <div className="sigma_team-info">
                              <span>
                                <i className="fal fa-map-marker-alt" />
                                {isNotEmptyArray(item?.hospital)
                                  ? item.hospital
                                      .map((el) => el.description)
                                      .join(", ")
                                  : "Not specified"}
                              </span>
                              <span>
                                <i className="fal fa-award" />
                                {item.experience} Yrs Experience
                              </span>
                              <span>
                                <i className="fal fa-calendar" />
                                {item.educational_degrees}
                              </span>
                            </div>
                            {/* <div className="sigma_rating">
                              {Rating(item.ratings || 0)}
                              <span className="ml-3">
                                ({item.reviews?.length})
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {
                    <div className="d-flex justify-content-center mt-4">
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemPerpage}
                        totalItemsCount={data.data.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        innerClass="pagination"
                        activeClass="active"
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
