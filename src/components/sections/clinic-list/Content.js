import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  MapPin,
  Phone,
  Home,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Star,
  Clock,
  Shield,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  MapIcon,
  Building,
} from "lucide-react";
import { Spinner } from "react-bootstrap";
import ShowEnquireModal from "./showEnquireModal";
import { useHistory } from "react-router-dom";

const DiagnosticCentersApp = () => {
  // State management
  const [diagnosticCenters, setDiagnosticCenters] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEnquireModal, setShowEnquireModal] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [totalCenters, setTotalCenters] = useState(0);

  // Loading and error states
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [errorAddresses, setErrorAddresses] = useState(null);
  const [errorServices, setErrorServices] = useState(null);
  const [errorCenters, setErrorCenters] = useState(null);

  const history = useHistory();

  const token = localStorage.getItem("token");
  const itemsPerPage = 6;
  const defaultImage =
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop";

  // Optimized API calls with error handling
  const fetchAddresses = useCallback(async () => {
    setLoadingAddresses(true);
    setErrorAddresses(null);
    try {
      const response = await fetch(
        "http://3.27.214.105/api/diagnostic/addresses"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setErrorAddresses("Failed to load locations. Please try again.");
    } finally {
      setLoadingAddresses(false);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    setLoadingServices(true);
    setErrorServices(null);
    try {
      const response = await fetch(
        "http://3.27.214.105/api/diagnostic/diagnostic-category?pagination=false"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result?.data && result.data.length > 0) {
        setServices(result.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setErrorServices("Failed to load services. Please try again.");
    } finally {
      setLoadingServices(false);
    }
  }, []);

  const fetchDiagnosticCenters = useCallback(
    async (page = 1, search = "") => {
      setLoadingCenters(true);
      setErrorCenters(null);
      try {
        const params = new URLSearchParams({
          page_count: itemsPerPage.toString(),
          page: page.toString(),
          search: search,
          address: selectedAddress,
          services: selectedServices.join(","),
          sub_services: selectedSubServices.join(","),
        });

        const response = await fetch(
          `http://3.27.214.105/api/diagnostic/list-center?${params}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result?.data && result.data.length > 0) {
          setDiagnosticCenters(result.data);
          setTotalCenters(
            result.pagination_data?.total_count || result.data.length
          );
        } else {
          setDiagnosticCenters([]);
          setTotalCenters(0);
        }
      } catch (error) {
        console.error("Error fetching diagnostic centers:", error);
        setErrorCenters("Failed to load diagnostic centers. Please try again.");
        setDiagnosticCenters([]);
        setTotalCenters(0);
      } finally {
        setLoadingCenters(false);
      }
    },
    [selectedAddress, selectedServices, selectedSubServices]
  );

  // Effects
  useEffect(() => {
    fetchAddresses();
    fetchServices();
  }, [fetchAddresses, fetchServices]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDiagnosticCenters(currentPage, searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [
    currentPage,
    searchTerm,
    selectedAddress,
    selectedServices,
    selectedSubServices,
    fetchDiagnosticCenters,
  ]);

  // Handlers
  const handleServiceToggle = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    setSelectedSubServices([]);
    setCurrentPage(1);
  };

  const handleSubServiceToggle = (subService) => {
    setSelectedSubServices((prev) =>
      prev.includes(subService)
        ? prev.filter((s) => s !== subService)
        : [...prev, subService]
    );
    setCurrentPage(1);
  };

  const handleEnquire = async (center) => {
    const hasToken = token;
    console.log({ hasToken });

    if (hasToken) {
      // Call the API with the token
      try {
        // Example API call using fetch
        const response = await fetch("https://example.com/hasToken", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${hasToken}`, // Pass token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Show success toast
          //   toast.success("Token validated successfully! Proceeding with enquiry.", {
          //     position: toast.POSITION.TOP_RIGHT,
          //     autoClose: 3000,
          //   });
        } else {
          // Handle failure (e.g., token invalid)
          //   toast.error("Failed to validate token! Please try again.", {
          //     position: toast.POSITION.TOP_RIGHT,
          //     autoClose: 3000,
          //   });
        }
      } catch (error) {
        // Handle error (e.g., network failure)
        // toast.error("Error occurred while validating token!", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 3000,
        // });
      }
    } else {
      // If no token found, show the enquiry modal
      setShowEnquireModal(true);
      console.log("No token found. Showing enquiry modal...");
    }
  };

  const handleCenterClick = (center) => {
    // Uncomment and import useHistory from react-router-dom when ready
    history.push(`/clinic-list/${center.id}`);
    console.log(`Navigate to center ${center.id}`);
  };

  const clearFilters = () => {
    setSelectedAddress("");
    setSelectedServices([]);
    setSelectedSubServices([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Memoized values
  const totalPages = useMemo(
    () => Math.ceil(totalCenters / itemsPerPage),
    [totalCenters]
  );
  const hasActiveFilters = useMemo(
    () =>
      selectedAddress ||
      selectedServices.length > 0 ||
      selectedSubServices.length > 0 ||
      searchTerm,
    [selectedAddress, selectedServices, selectedSubServices, searchTerm]
  );

  // Loading component
  const LoadingSpinner = ({ text = "Loading..." }) => (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner
        animation="border" // You can choose from "border" or "grow"
        style={{ color: "#3b82f6" }}
      />
      <p className="text-muted mb-0">{text}</p>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message, onRetry }) => (
    <div className="text-center py-5">
      <AlertCircle
        className="mb-3 mr-1"
        size={48}
        style={{ color: "#ef4444" }}
      />
      <h5 className="text-danger mb-3">Oops! Something went wrong</h5>
      <p className="text-muted mb-4">{message}</p>
      {onRetry && (
        <button className="btn btn-outline-primary" onClick={onRetry}>
          <RefreshCw size={16} className="me-2" />
          Try Again
        </button>
      )}
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-5">
      <Building className="mb-3 mr-1" size={64} style={{ color: "#6b7280" }} />
      <h5 className="text-muted mb-3">No diagnostic centers found</h5>
      <p className="text-muted mb-4">
        Try adjusting your filters or search terms to find more results.
      </p>
      {hasActiveFilters && (
        <button className="btn text-white" onClick={clearFilters}>
          <X size={16} className="me-2" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div
      className="min-vh-100 container-bg"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Modern Header with Gradient */}
      <div
        className="py-5 mb-4"
        style={{
          background: "linear-gradient(135deg,#00b2b2  0%, #007a7e  100%)",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="text-white mb-3 fw-bold">
                Find Diagnostic Centers
              </h1>
              <p className="text-white opacity-75 mb-4">
                Discover trusted diagnostic centers near you with advanced
                facilities and expert care.
              </p>

              {/* Enhanced Search Bar */}
              <div className="position-relative">
                <Search
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  size={20}
                />
                <input
                  type="text"
                  className="form-control form-control-lg ps-5 pe-4 border-0 shadow-sm"
                  placeholder="Search by center name or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderRadius: "16px",
                    fontSize: "16px",
                    padding: "12px 16px 12px 48px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-4 text-end d-none d-lg-block">
              <div className="text-white">
                <div className="d-flex align-items-center justify-content-end mb-2">
                  <CheckCircle className="me-2 mr-1" size={20} />
                  <span>Verified Centers</span>
                </div>
                <div className="d-flex align-items-center justify-content-end mb-2">
                  <Shield className="me-2 mr-1" size={20} />
                  <span>Accredited Labs</span>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <Clock className="me-2 mr-1" size={20} />
                  <span>Quick Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Mobile Filter Toggle */}
          <div className="col-12 d-lg-none mb-4">
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary flex-fill d-flex align-items-center justify-content-center gap-2 secondary-color"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                style={{ borderRadius: "12px" }}
              >
                <Filter className=" mr-1" size={18} />
                Filters
                {hasActiveFilters && (
                  <span className="badge bg-primary rounded-pill">
                    {(selectedAddress ? 1 : 0) +
                      selectedServices.length +
                      selectedSubServices.length}
                  </span>
                )}
              </button>
              {hasActiveFilters && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={clearFilters}
                  style={{ borderRadius: "12px" }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Filters Sidebar */}
          <div
            className={`col-lg-4 ${
              showMobileFilters ? "d-block" : "d-none d-lg-block"
            }`}
          >
            <div
              className="card border-0 shadow-sm mb-4"
              style={{ borderRadius: "16px" }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h5 className="mb-0 fw-bold secondary-color">Filters</h5>
                  {hasActiveFilters && (
                    <button
                      className="btn text-white p-2 text-decoration-none"
                      style={{ fontSize: "12px" }}
                      onClick={clearFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Location Filter */}
                <div className="mb-4">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2 secondary-color">
                    <MapIcon className=" mr-1" size={18} />
                    Location
                  </label>
                  {loadingAddresses ? (
                    <LoadingSpinner text="Loading locations..." />
                  ) : (
                    <select
                      className="form-select border-0 bg-light"
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      style={{ borderRadius: "12px", padding: "12px 16px" }}
                    >
                      <option value="">All Locations</option>
                      {addresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Services Filter */}
                <div>
                  <label className="form-label fw-semibold d-flex align-items-center gap-2 secondary-color">
                    <Shield className=" mr-1" size={18} />
                    Services
                  </label>
                  {loadingServices ? (
                    <LoadingSpinner text="Loading services..." />
                  ) : errorServices ? (
                    <ErrorMessage
                      message={errorServices}
                      onRetry={fetchServices}
                    />
                  ) : (
                    <div
                      className="border-0 bg-light p-3"
                      style={{
                        borderRadius: "12px",
                        maxHeight: "400px",
                        overflowY: "auto",
                      }}
                    >
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="mb-1 mb-2"
                          style={{ borderBottom: "1px solid #00000012" }}
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`service-${service.id}`}
                              checked={selectedServices.includes(service.id)}
                              onChange={() => handleServiceToggle(service.id)}
                            />
                            <label
                              className="form-check-label fw-medium"
                              htmlFor={`service-${service.id}`}
                            >
                              {service.name}
                            </label>
                          </div>

                          {/* Sub-services with Animation */}
                          {selectedServices.includes(service.id) &&
                            service.sub_category.length > 0 && (
                              <div className="ms-4 mt-2 ml-3">
                                {service.sub_category.map((subService) => (
                                  <div
                                    key={subService.id}
                                    className="form-check mb-1"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`sub-service-${subService.id}`}
                                      checked={selectedSubServices.includes(
                                        subService.id
                                      )}
                                      onChange={() =>
                                        handleSubServiceToggle(subService.id)
                                      }
                                    />
                                    <label
                                      className="form-check-label text-muted"
                                      htmlFor={`sub-service-${subService.id}`}
                                    >
                                      {subService.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="col-lg-8">
            {loadingCenters ? (
              <LoadingSpinner text="Finding diagnostic centers..." />
            ) : errorCenters ? (
              <ErrorMessage
                message={errorCenters}
                onRetry={() => fetchDiagnosticCenters(currentPage, searchTerm)}
              />
            ) : diagnosticCenters.length === 0 ? (
              <EmptyState />
            ) : (
              <div>
                {/* Results Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4 className="mb-1 secondary-color">Diagnostic Centers</h4>
                    <p className="text-muted mb-0">
                      {diagnosticCenters.length} centers found
                      {hasActiveFilters && " with your filters"}
                    </p>
                  </div>
                  <div className="text-muted small">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>

                {/* Enhanced Centers Grid */}
                <div className="row">
                  {diagnosticCenters.map((center) => (
                    <div key={center.id} className="col-12 mb-4">
                      <div
                        className="card border-0 shadow-sm h-100 position-relative overflow-hidden"
                        style={{
                          borderRadius: "20px",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 12px 24px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 6px rgba(0,0,0,0.1)";
                        }}
                        onClick={() => handleCenterClick(center)}
                      >
                        <div className="row g-0">
                          <div className="col-md-4">
                            <div className="position-relative">
                              <img
                                src={center.image || defaultImage}
                                alt={center.name}
                                className="img-fluid w-100 h-100"
                                style={{
                                  objectFit: "cover",
                                  minHeight: "250px",
                                  borderRadius: "20px 0 0 20px",
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-md-8">
                            <div className="card-body p-4 h-100 d-flex flex-column">
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <h5 className="card-title mb-0 fw-bold text-primary">
                                    {center.name}
                                  </h5>
                                  <div className="d-flex align-items-center">
                                    <Star
                                      size={16}
                                      className="text-warning me-1 mr-1"
                                      fill="currentColor"
                                    />
                                    <span className="fw-bold">
                                      {center.rating}
                                    </span>
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <div className="d-flex align-items-center text-muted mb-2">
                                    <MapPin size={16} className="me-2 mr-1" />
                                    <span>
                                      {center.address}, {center.city} -{" "}
                                      {center.pincode}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center text-muted mb-2">
                                    <Phone size={16} className="me-2" />
                                    <span>{center.contact_number}</span>
                                  </div>
                                </div>

                                {/* Services Tags */}
                                <div className="mb-3">
                                  <div className="d-flex flex-wrap gap-2">
                                    {center.category.map((service) => (
                                      <span
                                        key={service.id}
                                        className="badge bg-light text-dark border px-3 py-1 mr-2 mb-2"
                                        style={{ borderRadius: "20px" }}
                                      >
                                        {service.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Features */}
                                <div className="d-flex gap-3 mb-3">
                                  {center.home_collection && (
                                    <div className="d-flex align-items-center text-success">
                                      <Home size={16} className="me-1 mr-1" />
                                      <small>Home Collection</small>
                                    </div>
                                  )}
                                  {center.opening_hours === "24/7" && (
                                    <div className="d-flex align-items-center text-info">
                                      <Clock size={16} className="me-1 mr-1" />
                                      <small>24/7 Available</small>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="d-flex gap-2 mt-auto">
                                <button
                                  className="btn btn-primary px-4 py-2 flex-fill mr-2"
                                  style={{ borderRadius: "12px" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEnquire(center);
                                  }}
                                >
                                  Enquiry
                                </button>
                                <button
                                  className="btn text-white px-3 py-2"
                                  style={{ borderRadius: "12px" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle call action
                                  }}
                                >
                                  <Phone size={16} className=" mr-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                <div className="d-flex justify-content-center mt-5">
                  <nav>
                    <ul className="pagination pagination-lg">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link border-0 bg-transparent text-white"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                          disabled={currentPage === 1}
                          style={{ borderRadius: "12px 0 0 12px" }}
                        >
                          <ChevronLeft size={20} />
                        </button>
                      </li>
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link border-0 bg-transparent text-white"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(totalPages, prev + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          style={{
                            borderRadius: "0 12px 12px 0",
                            marginLeft: "0px",
                          }}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showEnquireModal && (
        <ShowEnquireModal
          show={showEnquireModal}
          onClose={() => setShowEnquireModal(false)}
          setShowSuccessMessage={setShowSuccessMessage}
          token={token}
        />
      )}

      {/* Enhanced Success Message */}
      {showSuccessMessage && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-4"
          style={{ zIndex: 1050 }}
        >
          <div
            className="alert alert-success alert-dismissible fade show shadow-lg border-0"
            role="alert"
            style={{ borderRadius: "16px" }}
          >
            <div className="d-flex align-items-center">
              <CheckCircle className="me-3 mr-2" size={24} />
              <div>
                <h6 className="mb-1 fw-bold">Booking Confirmed!</h6>
                <p className="mb-0 small">
                  Your appointment request has been submitted. The center will
                  contact you soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticCentersApp;
