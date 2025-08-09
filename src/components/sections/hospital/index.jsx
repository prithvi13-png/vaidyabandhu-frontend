import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Spinner,
  Alert,
  Button,
  Badge,
} from "react-bootstrap";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Home,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/usefetch";
import "../../../assets/css/hospital.css";
const HospitalsPage = () => {
  const navigate = useNavigate(); // Navigation for detail page

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [pageNo, setPageNo] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust delay (500ms) as needed

    return () => clearTimeout(timeoutId); // Cleanup on each keystroke
  }, [searchTerm]);

  const { data, loading, error } = useFetch({
    method: "GET",
    request: "/hospital/",
    params: {
      search: debouncedSearchTerm.trim() ?? "",
      page_count: 5,
      page: pageNo,
    },
  });

  // Handle page change
  const handlePageChange = (newPageNo) => {
    setPageNo(newPageNo);
  };

  // Search handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPageNo(1); // Reset to the first page on search term change
  };

  // Handle card click to navigate to hospital details
  const handleCardClick = (hospitalId) => {
    navigate(`/doctor-list?id=${hospitalId}`); // Navigate to detail page
  };

  const ServiceBadge = ({
    icon: Icon,
    label,
    available,
    variant = "secondary",
  }) => (
    <Badge
      bg={available ? "success" : "secondary"}
      className="service-badge d-flex align-items-center gap-1 px-2 py-1"
    >
      <Icon size={12} />
      <span className="badge-text">{label}</span>
      {available ? <CheckCircle size={10} /> : <XCircle size={10} />}
    </Badge>
  );

  return (
    <div className="hospital-page container-bg">
      {/* Header Section */}
      <div className="page-header">
        <Container className="py-4">
          <div className="text-center mb-4">
            <p className="text-muted">
              Discover quality healthcare facilities near you.
            </p>
          </div>

          {/* Search Bar */}
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <div className="position-relative">
                <Search className="search-icon" size={20} />
                <Form.Control
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search hospitals by name..."
                  className="search-input"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <Spinner
              animation="border"
              variant="primary"
              style={{ width: "3rem", height: "3rem" }}
            />
            <p className="text-muted mt-3">Loading hospitals...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Row className="justify-content-center">
            <Col lg={8}>
              <Alert variant="danger" className="text-center rounded-4 shadow">
                <XCircle size={24} className="me-2" />
                <strong>Error Loading Hospitals</strong>
                <div className="mt-2">{error}</div>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Hospital Cards */}
        {!loading && !error && data?.data && (
          <Row>
            {data.data.map((hospital) => (
              <Col lg={4} md={6} key={hospital.id} className="mb-4">
                <Card
                  className="hospital-card h-100"
                  onClick={() => handleCardClick(hospital.id)}
                >
                  {/* Hospital Header */}
                  <div className="card-header-custom">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="hospital-code">{hospital.code}</span>
                      <span
                        className={`status-indicator ${
                          hospital.is_active
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      ></span>
                    </div>
                    <h5 className="mb-1 fw-bold text-white">
                      {hospital.hospital_name}
                    </h5>
                    <div className="d-flex align-items-center">
                      <MapPin size={16} className="me-2" />
                      <small>{hospital.location_name}</small>
                    </div>
                  </div>

                  <Card.Body className="p-3">
                    {/* Contact Information */}
                    <div className="mb-3">
                      <div className="contact-item d-flex align-items-center">
                        <div className="contact-icon bg-success bg-opacity-10">
                          <Phone size={16} className="text-success" />
                        </div>
                        <small
                          className="fw-semibold"
                          style={{ color: "#000000ad" }}
                        >
                          {hospital.mobile}
                        </small>
                      </div>

                      <div className="contact-item d-flex align-items-center">
                        <div className="contact-icon bg-info bg-opacity-10">
                          <Mail size={16} className="text-info" />
                        </div>
                        <small className="text-truncate">
                          {hospital.email}
                        </small>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-3">
                      <h6 className="fw-semibold mb-2">Available Services</h6>
                      <div className="d-flex flex-wrap">
                        <ServiceBadge
                          icon={Home}
                          label="Home Collection"
                          available={hospital.is_home_collection_supported}
                        />
                        <ServiceBadge
                          icon={Package}
                          label="Health Packages"
                          available={
                            hospital.is_health_package_online_purchase_supported
                          }
                        />
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="border-top pt-3 mb-3">
                      <Row className="g-0">
                        <Col>
                          <div className="d-flex align-items-center">
                            <Clock size={14} className="text-muted me-1" />
                            <small className="text-muted">
                              Slot: {hospital.slot_blocking_duration || 0} min
                            </small>
                          </div>
                        </Col>
                        {hospital.allow_refund_on_cancellation && (
                          <Col xs="auto">
                            <div className="d-flex align-items-center">
                              <CheckCircle
                                size={14}
                                className="text-success me-1"
                              />
                              <small className="text-success fw-medium">
                                Varified
                              </small>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </div>

                    {/* Action Button */}
                    <Button className=" w-100" size="sm">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* No Results */}
        {!loading && !error && data?.data && data.data.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <Search size={32} className="text-muted" />
            </div>
            <h4 className="text-muted mb-2">No hospitals found</h4>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && data?.pagination_data && (
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <div className="pagination-custom">
                {data.pagination_data.previous_page && (
                  <Button
                  style={{ width: '100px'}}
                    size="sm"
                    onClick={() =>
                      handlePageChange(
                        data.pagination_data.current_page_number - 1
                      )
                    }
                  >
                    Previous
                  </Button>
                )}

                <Badge
                  bg="green"
                  style={{ background: "", color: '#008493' }}
                  className="px-3 py-2"
                >
                  Page {data.pagination_data.current_page_number}
                </Badge>

                {data.pagination_data.next_page && (
                  <Button
                  style={{ width: '100px'}}
                    size="sm"
                    onClick={() =>
                      handlePageChange(
                        data.pagination_data.current_page_number + 1
                      )
                    }
                  >
                    Next
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HospitalsPage;
