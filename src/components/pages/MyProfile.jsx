import React from "react";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { useAuthContext } from "../context";
import {
  User,
  Mail,
  Stethoscope,
  Calendar,
  Award,
  Sparkles,
} from "lucide-react";
import "../../assets/css/MyProfile.css";

const MyProfile = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <Spinner
            animation="border"
            variant="primary"
            className="loading-spinner"
          />
          <p className="loading-text">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const activeSpecialties =
    user.speciality?.filter((spec) => spec.is_active) || [];

  return (
    <div className="profile-page">
      {/* Animated background elements */}
      <div className="bg-elements">
        <div className="bg-bubble bg-bubble-1"></div>
        <div className="bg-bubble bg-bubble-2"></div>
        <div className="bg-bubble bg-bubble-3"></div>
      </div>

      <Container className="py-5">
        {/* Header Section */}
        <Row className="mb-5">
          <Col>
            <Card className="profile-header-card">
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center">
                  <Col md={3} className="text-center mb-4 mb-md-0">
                    <div className="profile-avatar-wrapper">
                      <div className="profile-avatar">
                        <User size={48} />
                      </div>
                      <div className="profile-badge">
                        <Sparkles size={20} />
                      </div>
                    </div>
                  </Col>
                  <Col md={9}>
                    <div className="profile-info">
                      <h1 className="profile-name">
                        {user.full_name || "Welcome, Doctor"}
                      </h1>
                      <div className="profile-email">
                        <Mail size={18} className="me-2" />
                        <span>{user.email || "Email not available"}</span>
                      </div>
                      <div className="profile-role">
                        <Award size={18} className="me-2" />
                        <span>Medical Professional</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Specialties Section */}
        <Row>
          <Col>
            <div className="specialties-header">
              <div className="specialties-title-wrapper">
                <Stethoscope size={28} className="me-3" />
                <h2 className="specialties-title">Medical Specialties</h2>
              </div>
              <p className="specialties-subtitle">
                Your areas of expertise and professional focus
              </p>
            </div>
          </Col>
        </Row>

        {activeSpecialties.length > 0 ? (
          <Row>
            {activeSpecialties.map((specialty, index) => (
              <Col lg={4} md={6} className="mb-4" key={specialty.id}>
                <Card className={`specialty-card specialty-card-${index % 3}`}>
                  <Card.Body className="p-4">
                    <div className="specialty-header">
                      <div className="specialty-icon">
                        <Stethoscope size={24} />
                      </div>
                      <Badge bg="success" className="specialty-badge">
                        <div className="active-dot"></div>
                        Active
                      </Badge>
                    </div>

                    <h3 className="specialty-name">{specialty.description}</h3>

                    <div className="specialty-details">
                      <div className="specialty-detail">
                        <div className="detail-icon">
                          <span className="code-symbol">#</span>
                        </div>
                        <span className="detail-text">{specialty.code}</span>
                      </div>

                      <div className="specialty-detail">
                        <div className="detail-icon">
                          <Calendar size={16} />
                        </div>
                        <span className="detail-text">
                          Since{" "}
                          {new Date(specialty.start_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <Col>
              <div className="no-specialties">
                <Card className="no-specialties-card">
                  <Card.Body className="text-center p-5">
                    <div className="no-specialties-icon">
                      <Stethoscope size={48} />
                    </div>
                    <h3 className="no-specialties-title">
                      No Specialties Found
                    </h3>
                    <p className="no-specialties-text">
                      Your medical specialties will appear here once they're
                      added to your profile.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyProfile;
