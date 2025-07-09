import React, { useState } from "react";
import {
  CreditCard,
  MapPin,
  Star,
  Check,
  AlertCircle,
  Shield,
} from "lucide-react";
import { Form, Col, Row, Card } from "react-bootstrap";
import "../../../assets/css/BasicDetail.css"; // Assuming you will add custom styles in a separate file

import languagesType from "./data.json"; // Import the languagesType JSON file

const VaidyaBandhuForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    mobileNumber: "",
    alternateNumber: "",
    emailId: "",
    fullAddress: "",
    pinCode: "",
    aadhaarNumber: "",
    panNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for the selected language (default to English)
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Handle language change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        languagesType[selectedLanguage].validation.fullNameRequired;
    }

    if (!formData.age.trim()) {
      newErrors.age = languagesType[selectedLanguage].validation.ageRequired;
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = languagesType[selectedLanguage].validation.ageValid;
    }

    if (!formData.gender) {
      newErrors.gender =
        languagesType[selectedLanguage].validation.genderRequired;
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber =
        languagesType[selectedLanguage].validation.mobileRequired;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber =
        languagesType[selectedLanguage].validation.mobileValid;
    }

    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress =
        languagesType[selectedLanguage].validation.addressRequired;
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode =
        languagesType[selectedLanguage].validation.pinCodeRequired;
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode =
        languagesType[selectedLanguage].validation.pinCodeValid;
    }

    if (
      formData.alternateNumber &&
      !/^[6-9]\d{9}$/.test(formData.alternateNumber)
    ) {
      newErrors.alternateNumber =
        languagesType[selectedLanguage].validation.alternateValid;
    }

    if (
      formData.emailId &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)
    ) {
      newErrors.emailId = languagesType[selectedLanguage].validation.emailValid;
    }

    if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber =
        languagesType[selectedLanguage].validation.aadhaarValid;
    }

    if (
      formData.panNumber &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)
    ) {
      newErrors.panNumber = languagesType[selectedLanguage].validation.panValid;
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleNumberChange = (e, fieldName) => {
    const value = e.target.value;

    // Define maxLength per field
    const maxLength =
      fieldName === "pinCode"
        ? 6
        : fieldName === "mobileNumber"
        ? 10
        : fieldName === "aadhaarNumber"
        ? 12
        : 3; // Default for any other number fields (like Age)

    // Validate numeric input and ensure length doesn't exceed the max limit
    if (/^[0-9]*$/.test(value) && value.length <= maxLength) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      // Clear error when user starts typing
      if (errors[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }));
      }
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API request to create a Razorpay order
    try {
      const response = await fetch("/api/create-order", {
        // replace with your backend API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, amount: 49, currency: "INR" }), // ₹49
      });

      const data = await response.json();
      console.log({ data });

      const { orderId, amount, currency, razorpayKeyId } = data;

      if (orderId) {
        const options = {
          key: razorpayKeyId,
          amount: amount,
          currency: currency,
          name: languagesType[selectedLanguage].title,
          description: languagesType[selectedLanguage].subtitle,
          order_id: orderId,
          handler: function (response) {
            alert(
              languagesType[selectedLanguage].payNow +
                " Payment ID: " +
                response.razorpay_payment_id
            );
          },
          prefill: {
            name: formData.fullName,
            email: formData.emailId,
            contact: formData.mobileNumber,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      alert("Error occurred while creating order");
      setIsSubmitting(false);
    }
  };

  const benefits = languagesType[selectedLanguage].benefits;
  const termsConditions = languagesType[selectedLanguage].terms;

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="d-flex justify-content-end">
          {/* Language Selection Dropdown */}
          <div className="text-right mb-4" style={{ width: "200px" }}>
            <select
              className="form-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="ml">Malayalam</option>
              <option value="kn">Kannada</option>
            </select>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 text-dark mb-2">
            💳 {languagesType[selectedLanguage].title}
          </h1>
          <p className="lead text-muted mb-4">
            {languagesType[selectedLanguage].subtitle}
          </p>
        </div>

        {/* Main Content Row */}
        <Row className="mb-8">
          {/* Left Section: Membership Benefits, Charges, and Terms */}
          <Col md={4}>
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 mb-4 shadow-lg">
              <Card.Body>
                <h4 className="h4 mb-4">
                  <Star className="h-6 w-6 text-yellow-500 mr-1" />{" "}
                  {languagesType[selectedLanguage].membershipBenefits}
                </h4>
                <ul className="list-unstyled">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="d-flex align-items-start mb-2">
                      <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="ml-2">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-blue-600 p-6 mb-4 shadow-lg">
              <Card.Body>
                <h2 className="h4 mb-4">
                  <CreditCard className="h-6 w-6 text-green-500 mr-2" />{" "}
                  {languagesType[selectedLanguage].membershipCharges}
                </h2>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2 text-primary"
                    style={{ fontSize: "27px" }}
                  >
                    ₹49
                  </div>
                  <div className="text-lg opacity-90">
                    {languagesType[selectedLanguage].validFor}
                  </div>
                  <div className="text-sm mt-2 opacity-80">
                    {languagesType[selectedLanguage].instantCard}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Section: Personal Details Form */}
          <Col md={8}>
            <Card className="bg-white rounded-xl shadow-lg p-6 mb-4">
              <Card.Body>
                <h2 className="h4 mb-6 text-dark flex items-center">
                  <MapPin className="h-6 w-6 text-blue-500 mr-2" />{" "}
                  {languagesType[selectedLanguage].personalDetails}
                </h2>

                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <Row>
                    {/* Full Name */}
                    <Col md={12}>
                      <Form.Group controlId="formFullName" className="mb-3">
                        <Form.Label>
                          {languagesType[selectedLanguage].form.fullName} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.fullName}
                          placeholder={
                            languagesType[selectedLanguage].form.placeholders
                              .fullName
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {/* Age */}
                    <Col md={6}>
                      <Form.Group controlId="formAge" className="mb-3">
                        <Form.Label>
                          {languagesType[selectedLanguage].form.age} *
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={(e) => handleNumberChange(e, "age")}
                          isInvalid={!!errors.age}
                          placeholder={
                            languagesType[selectedLanguage].form.placeholders
                              .age
                          }
                          min="1"
                          max="120"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.age}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Gender */}
                    <Col>
                      <Form.Group controlId="formGender" className="mb-3">
                        <Form.Label>
                          {languagesType[selectedLanguage].form.gender} *
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          isInvalid={!!errors.gender}
                        >
                          <option value="">
                            {languagesType[selectedLanguage].form.selectGender}
                          </option>
                          <option value="Male">
                            {languagesType[selectedLanguage].form.male}
                          </option>
                          <option value="Female">
                            {languagesType[selectedLanguage].form.female}
                          </option>
                          <option value="Other">
                            {languagesType[selectedLanguage].form.other}
                          </option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.gender}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Blood Group */}
                  <Col md={6}>
                    <Form.Group controlId="formBloodGroup" className="mb-3">
                      <Form.Label>
                        {languagesType[selectedLanguage].form.bloodGroup}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        isInvalid={!!errors.bloodGroup}
                        placeholder={
                          languagesType[selectedLanguage].form.placeholders
                            .bloodGroup
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.bloodGroup}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Row>
                    <Col>
                      {/* Mobile Number */}
                      <Form.Group controlId="formMobileNumber" className="mb-3">
                        <Form.Label>
                          {languagesType[selectedLanguage].form.mobileNumber} *
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={(e) =>
                            handleNumberChange(e, "mobileNumber")
                          }
                          isInvalid={!!errors.mobileNumber}
                          placeholder={
                            languagesType[selectedLanguage].form.placeholders
                              .mobileNumber
                          }
                          maxLength="10"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mobileNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Alternate Number */}
                    <Col>
                      <Form.Group
                        controlId="formAlternateNumber"
                        className="mb-3"
                      >
                        <Form.Label>
                          {languagesType[selectedLanguage].form.alternateNumber}
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="alternateNumber"
                          value={formData.alternateNumber}
                          onChange={(e) =>
                            handleNumberChange(e, "alternateNumber")
                          }
                          isInvalid={!!errors.alternateNumber}
                          placeholder={
                            languagesType[selectedLanguage].form.placeholders
                              .alternateNumber
                          }
                          maxLength="10"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.alternateNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Email ID */}
                  <Form.Group controlId="formEmailId" className="mb-3">
                    <Form.Label>
                      {languagesType[selectedLanguage].form.emailId}
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleInputChange}
                      isInvalid={!!errors.emailId}
                      placeholder={
                        languagesType[selectedLanguage].form.placeholders
                          .emailId
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.emailId}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Aadhaar Number */}
                  <Form.Group controlId="formAadhaarNumber" className="mb-3">
                    <Form.Label>
                      {languagesType[selectedLanguage].form.aadhaarNumber}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleNumberChange(e, "aadhaarNumber")}
                      isInvalid={!!errors.aadhaarNumber}
                      placeholder={
                        languagesType[selectedLanguage].form.placeholders
                          .aadhaarNumber
                      }
                      maxLength="12"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.aadhaarNumber}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* PAN Number */}
                  <Form.Group controlId="formPanNumber" className="mb-3">
                    <Form.Label>
                      {languagesType[selectedLanguage].form.panNumber}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      isInvalid={!!errors.panNumber}
                      placeholder={
                        languagesType[selectedLanguage].form.placeholders
                          .panNumber
                      }
                      maxLength="10"
                      style={{ textTransform: "uppercase" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.panNumber}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 py-3 mt-4 buy-membership-btn"
                  >
                    {isSubmitting
                      ? languagesType[selectedLanguage].processing
                      : languagesType[selectedLanguage].payNow}
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Terms and Conditions */}
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h2 className="h4 mb-4">
                  <Shield className="h-6 w-6 mr-2" />{" "}
                  {languagesType[selectedLanguage].termsConditions}
                </h2>
                <ul className="list-unstyled">
                  {termsConditions.map((term, index) => (
                    <li key={index} className="d-flex align-items-start mb-2">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="ml-2">{term}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VaidyaBandhuForm;
