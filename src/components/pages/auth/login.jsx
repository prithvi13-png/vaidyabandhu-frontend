import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import useLogin from "./useLogin";
import { FormInputPassword, FormTextInput } from "../../form";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
    const { loading, control, login, checkISAuthenticated } =
    useLogin({ request: 'admin/user/login/', navPath: '/dashboard' });

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (checkISAuthenticated()) {
      navigate('/dashboard');
    }
  }, []);

  // Handle Forgot Password click
  const handleForgotPassword = () => {
    setShowModal(true);
  };

  // Handle closing of the modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f4f6f9" }}
    >
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card className="shadow-lg rounded p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Doctor Login</h3>

              <Form onSubmit={login}>
              <FormTextInput
                  name="email"
                  label="Email/Phone"
                  containerClass="mb-3"
                  style={{height: '43px'}}
                  control={control}
                  placeholder="Enter email/phone number"
                />
                <FormInputPassword
                  name="password"
                  label="Password"
                  style={{height: '43px'}}
                  control={control}
                  placeholder="Enter password"
                />
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button
                    className="w-100"
                    variant="primary"
                    type="submit"
                    block
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <span
                    onClick={handleForgotPassword}
                    className="text-decoration-none"
                    style={{ cursor: "pointer" }}
                  >
                    Forgot your password?
                  </span>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Forgot Password Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please contact Admin to change your password</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styling */}
      <style>{`
        .btn-primary {
          background-color: #4c74a6;
          border-color: #4c74a6;
        }
        .btn-primary:hover {
          background-color: #2c4a72;
          border-color: #2c4a72;
        }
      `}</style>
    </Container>
  );
};

export default DoctorLogin;
