import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Row,
  Col,
  Badge,
  Spinner,
  Card,
  Form,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";
import { useFetch } from "../hooks/usefetch";
import { useAuthContext } from "../context";

// Dummy appointments data with more variety
const initialAppointments = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `Patient ${String(i + 1).padStart(2, "0")}`,
  age: 18 + (i % 60),
  description: [
    "General consultation",
    "Follow-up visit",
    "Routine checkup",
    "Emergency consultation",
    "Specialist referral",
    "Lab results review",
    "Prescription renewal",
    "Physical therapy",
  ][i % 8],
  gender: i % 2 === 0 ? "Male" : "Female",
  status: ["pending", "approved", "rejected"][i % 3],
  time: `${9 + (i % 8)}:${i % 2 === 0 ? "00" : "30"} AM`,
  phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${
    Math.floor(Math.random() * 900) + 100
  }-${Math.floor(Math.random() * 9000) + 1000}`,
}));

const Appointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showModal, setShowModal] = useState(false);
  const [actionData, setActionData] = useState({ id: null, action: null });
  const [loadingActionId, setLoadingActionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { user } = useAuthContext();

  const response = useFetch({
    method: "GET",
    request: "appointment/",
    params: {
      doctor_id: user?.id ?? "",
      hospital_id: user?.selectedHostiptal?.id ?? "",
      status: filterStatus !== "all" ? filterStatus : "",
      search: searchTerm ? encodeURIComponent(searchTerm.trim()) : "",
    },
  });

  const handleAction = (id, action) => {
    setActionData({ id, action });
    setShowModal(true);
  };

  const confirmAction = async () => {
    const { id, action } = actionData;
    setLoadingActionId(id);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: action } : app))
      );
    } catch (err) {
      console.error("Failed to update appointment status.");
    } finally {
      setShowModal(false);
      setLoadingActionId(null);
      setActionData({ id: null, action: null });
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "warning";
    }
  };
  console.log({ appointments });

  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter((app) => app.status === "pending").length,
    approved: appointments.filter((app) => app.status === "approved").length,
    rejected: appointments.filter((app) => app.status === "rejected").length,
  };

  return (
    <Container fluid className="py-2 px-4" style={{ minHeight: "calc(100%)" }}>
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h4 className="mb-1">Appointments Management</h4>
              <p className="text-muted mb-0">
                Manage and review patient appointments
              </p>
            </div>
            <Button
              className="px-3 py-2"
              style={{ fontSize: "0.9rem", borderRadius: "20px" }}
            >
              Total: {appointments.length} appointments
            </Button>
          </div>
        </Col>
      </Row>

      {/* Filter and Search Section */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="py-3">
          <Row className="align-items-center">
            <Col md={6} className="mb-2 mb-md-0">
              <InputGroup>
                <InputGroup.Text
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e9ecef",
                  }}
                >
                  🔍
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: "1px solid #e9ecef" }}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <ButtonGroup className="w-100">
                {["all", "pending", "approved", "rejected"].map((status) => (
                  <Button
                    key={status}
                    variant={
                      filterStatus === status ? "primary" : "outline-primary"
                    }
                    onClick={() => setFilterStatus(status)}
                    className={`text-capitalize position-relative ${
                      filterStatus === status ? "" : "outline-primary"
                    }`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {status === "all" ? "All" : status}
                    <Badge
                      bg={filterStatus === status ? "light" : "primary"}
                      text={filterStatus === status ? "dark" : "white"}
                      className="ms-1"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {statusCounts[status]}
                    </Badge>
                  </Button>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Main Table Card */}
      <Card className="border-0 shadow-sm">
        <Card.Header
          className="bg-gradient"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
          }}
        ></Card.Header>

        <div
          style={{
            maxHeight: "600px",
            overflowX: "auto",
            overflowY: "auto",
            border: "none",
            borderRadius: "0 0 0.375rem 0.375rem",
            height: "400px",
          }}
          className="position-relative appointment-scrollable-table-container"
        >
          <Table
            hover
            responsive
            className="mb-0"
            style={{
              minWidth: "1000px",
              fontSize: "0.9rem",
            }}
          >
            <thead
              className="sticky-top"
              style={{
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #dee2e6",
              }}
            >
              <tr>
                <th
                  className="text-center"
                  style={{ width: "60px", fontWeight: 600 }}
                >
                  #
                </th>
                <th style={{ minWidth: "140px", fontWeight: 600 }}>
                  👤 Patient
                </th>
                <th
                  className="text-center"
                  style={{ width: "80px", fontWeight: 600 }}
                >
                  Age
                </th>
                <th style={{ minWidth: "160px", fontWeight: 600 }}>
                  📋 Description
                </th>
                <th
                  className="text-center"
                  style={{ width: "100px", fontWeight: 600 }}
                >
                  Gender
                </th>
                <th
                  className="text-center"
                  style={{ width: "100px", fontWeight: 600 }}
                >
                  🕒 Time
                </th>
                <th style={{ minWidth: "140px", fontWeight: 600 }}>📞 Phone</th>
                <th
                  className="text-center"
                  style={{ width: "100px", fontWeight: 600 }}
                >
                  Status
                </th>
                <th
                  className="text-center"
                  style={{ width: "180px", fontWeight: 600 }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app, idx) => (
                <tr
                  key={app.id}
                  className={`${
                    loadingActionId === app.id ? "table-active" : ""
                  }`}
                  style={{
                    transition: "all 0.2s ease",
                    borderLeft: `4px solid ${
                      app.status === "approved"
                        ? "#28a745"
                        : app.status === "rejected"
                        ? "#dc3545"
                        : "#ffc107"
                    }`,
                  }}
                >
                  <td
                    className="text-center fw-bold"
                    style={{ color: "#6c757d" }}
                  >
                    {idx + 1}
                  </td>
                  <td>
                    <div className="fw-bold">{app.name}</div>
                  </td>
                  <td className="text-center">{app.age}</td>
                  <td>
                    <small className="text-muted">{app.description}</small>
                  </td>
                  <td className="text-center">
                    <Badge
                      bg={app.gender === "Male" ? "info" : "pink"}
                      style={{
                        backgroundColor:
                          app.gender === "Male" ? "#17a2b8" : "#e83e8c",
                        fontSize: "0.75rem",
                      }}
                    >
                      {app.gender}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <small className="fw-bold text-success">{app.time}</small>
                  </td>
                  <td>
                    <small className="text-muted font-monospace">
                      {app.phone}
                    </small>
                  </td>
                  <td className="text-center">
                    <Badge
                      bg={getStatusVariant(app.status)}
                      className="text-capitalize px-3 py-1"
                      style={{
                        fontSize: "0.75rem",
                        borderRadius: "15px",
                        fontWeight: 600,
                      }}
                    >
                      {app.status === "pending" && "⏳ "}
                      {app.status === "approved" && "✅ "}
                      {app.status === "rejected" && "❌ "}
                      {app.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="success"
                        size="sm"
                        disabled={
                          app.status === "approved" ||
                          loadingActionId === app.id
                        }
                        onClick={() => handleAction(app.id, "approved")}
                        style={{
                          borderRadius: "20px",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          minWidth: "70px",
                        }}
                      >
                        {loadingActionId === app.id &&
                        actionData.action === "approved" ? (
                          <Spinner size="sm" />
                        ) : (
                          "✓ Approve"
                        )}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={
                          app.status === "rejected" ||
                          loadingActionId === app.id
                        }
                        onClick={() => handleAction(app.id, "rejected")}
                        style={{
                          borderRadius: "20px",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          minWidth: "70px",
                        }}
                      >
                        {loadingActionId === app.id &&
                        actionData.action === "rejected" ? (
                          <Spinner size="sm" />
                        ) : (
                          "✗ Reject"
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-5">
              <div className="text-muted" style={{ fontSize: "1.2rem" }}>
                📅 No appointments found
              </div>
              <small className="text-muted">
                Try adjusting your search or filter criteria
              </small>
            </div>
          )}
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header
          closeButton
          style={{
            background:
              actionData.action === "approved"
                ? "linear-gradient(135deg, #28a745, #20c997)"
                : "linear-gradient(135deg, #dc3545, #fd7e14)",
            color: "white",
            border: "none",
          }}
        >
          <Modal.Title className="fw-bold">
            {actionData.action === "approved" ? "✅ Approve" : "❌ Reject"}{" "}
            Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="mb-3" style={{ fontSize: "3rem" }}>
            {actionData.action === "approved" ? "✅" : "❌"}
          </div>
          <h5 className="fw-bold mb-3">Confirm Action</h5>
          <p className="text-muted mb-0">
            Are you sure you want to{" "}
            <strong className="text-capitalize">{actionData.action}</strong>{" "}
            this appointment?
          </p>
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            disabled={loadingActionId}
            style={{ borderRadius: "25px", minWidth: "100px" }}
          >
            Cancel
          </Button>
          <Button
            variant={actionData.action === "approved" ? "success" : "danger"}
            onClick={confirmAction}
            disabled={loadingActionId}
            style={{ borderRadius: "25px", minWidth: "100px", fontWeight: 600 }}
          >
            {loadingActionId ? (
              <>
                <Spinner size="sm" className="me-2" />
                Processing...
              </>
            ) : (
              `Yes, ${actionData.action === "approved" ? "Approve" : "Reject"}`
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Appointments;
