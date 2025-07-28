import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // If using Next.js, replace with useRouter from 'next/router'
import axios from "axios";

const HospitalsPage = () => {
  const navigate = useNavigate(); // Replace with useRouter() and router.push() if using Next.js

  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch hospitals from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/hospitals"); // Replace with real API endpoint
        setHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (err) {
        setError("Failed to load hospital list. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Filter hospitals based on search
  useEffect(() => {
    const results = hospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHospitals(results);
  }, [searchTerm, hospitals]);

  const handleCardClick = (id) => {
    navigate(`/hospitals/${id}`); // Use router.push(`/hospitals/${id}`) for Next.js
  };

  return (
    <Container className="py-4">
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by hospital name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading || error}
        />
      </Form>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading hospitals...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && filteredHospitals.length === 0 && (
        <Alert variant="info" className="text-center">
          No hospitals found.
        </Alert>
      )}

      <Row>
        {filteredHospitals.map((hospital) => (
          <Col md={4} sm={6} key={hospital.id} className="mb-4">
            <Card
              onClick={() => handleCardClick(hospital.id)}
              className="h-100 hospital-card shadow-sm"
            >
              <Card.Img
                variant="top"
                src={hospital.image || "/placeholder.jpg"}
                alt={hospital.name}
                style={{ height: "180px", objectFit: "cover" }}
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>{hospital.city}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HospitalsPage;
