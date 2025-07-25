import React from 'react';
import { Spinner, Container, Row, Col, Card } from 'react-bootstrap';

// Basic Suspense Fallback Component
export const SuspenseFallback = ({ 
  text = "Loading application...", 
  variant = "primary", 
  size = undefined,
  centered = true,
  showCard = false 
}) => {
  const spinnerContent = (
    <div className="d-flex flex-column align-items-center gap-3 py-4">
      <Spinner 
        animation="border" 
        variant={variant} 
        size={size}
        role="status"
        aria-hidden="true"
      />
      <span className="text-muted fs-6">{text}</span>
    </div>
  );

  // Card wrapper version
  if (showCard) {
    return (
      <Container fluid className="min-vh-100 bg-light">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center p-4">
                <Spinner 
                  animation="border" 
                  variant={variant} 
                  className="mb-3"
                  role="status"
                  aria-hidden="true"
                />
                <Card.Title className="h5 mb-2">{text}</Card.Title>
                <Card.Text className="text-muted small">
                  Please wait while we load your content
                </Card.Text>
                <div className="progress mt-3" style={{height: '4px'}}>
                  <div 
                    className="progress-bar progress-bar-animated" 
                    style={{width: '45%'}}
                    role="progressbar"
                  ></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // Centered full-screen version
  if (centered) {
    return (
      <Container fluid className="min-vh-100">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs="auto">
            {spinnerContent}
          </Col>
        </Row>
      </Container>
    );
  }

  // Inline version
  return (
    <div className="d-flex justify-content-center py-5">
      {spinnerContent}
    </div>
  );
};

// Alternative minimal fallback
export const MinimalFallback = ({ variant = "primary" }) => (
  <Container fluid className="min-vh-100">
    <Row className="justify-content-center align-items-center min-vh-100">
      <Col xs="auto">
        <Spinner animation="border" variant={variant} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  </Container>
);

// Page-level fallback with brand styling
export const PageLevelFallback = ({ 
  brandName = "Your App",
  variant = "primary" 
}) => (
  <Container fluid className="min-vh-100 bg-light">
    <Row className="justify-content-center align-items-center min-vh-100">
      <Col xs={12} sm={6} md={4} className="text-center">
        <div className="mb-4">
          <h2 className="fw-light text-muted">{brandName}</h2>
        </div>
        <Spinner 
          animation="border" 
          variant={variant} 
          className="mb-3"
          role="status"
        />
        <p className="text-muted">Loading your experience...</p>
        <div className="mt-4">
          <div className="spinner-grow spinner-grow-sm text-muted me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow spinner-grow-sm text-muted me-2" role="status" style={{animationDelay: '0.2s'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow spinner-grow-sm text-muted" role="status" style={{animationDelay: '0.4s'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);