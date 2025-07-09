import React, { useState } from 'react';
import { CreditCard, MapPin, Star, Check, AlertCircle, Shield } from 'lucide-react';
import { Form, Col, Row, Card } from 'react-bootstrap';
import '../../../assets/css/BasicDetail.css'; // Assuming you will add custom styles in a separate file

const VaidyaBandhuForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    mobileNumber: '',
    alternateNumber: '',
    emailId: '',
    fullAddress: '',
    pinCode: '',
    aadhaarNumber: '',
    panNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Address is required';
    }
    
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit pin code';
    }
    
    if (formData.alternateNumber && !/^[6-9]\d{9}$/.test(formData.alternateNumber)) {
      newErrors.alternateNumber = 'Please enter a valid 10-digit alternate number';
    }
    
    if (formData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }
    
    if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
    }
    
    if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNumberChange = (e, fieldName) => {
    const value = e.target.value;
    
    // Define maxLength per field
    const maxLength = fieldName === 'pinCode' ? 6 : 
                      fieldName === 'mobileNumber' ? 10 :
                      fieldName === 'aadhaarNumber' ? 12 : 
                      3; // Default for any other number fields (like Age)
    
    // Validate numeric input and ensure length doesn't exceed the max limit
    if (/^[0-9]*$/.test(value) && value.length <= maxLength) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
      
      // Clear error when user starts typing
      if (errors[fieldName]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: ''
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
      // Assuming you have a backend endpoint to create a Razorpay order
      const response = await fetch('/api/create-order', {  // replace with your backend API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, amount: 49, currency: 'INR' })  // ₹49
      });
  
      const data = await response.json();
      console.log({ data });
      
      const { orderId, amount, currency, razorpayKeyId } = data;
  
      // If the order is created successfully, trigger Razorpay payment gateway
      if (orderId) {
        const options = {
          key: razorpayKeyId,  // Your Razorpay Key ID
          amount: amount,  // Total amount in the smallest currency unit (e.g., 4900 for ₹49)
          currency: currency,
          name: 'Vaidya Bandhu Membership',
          description: 'Pay for your Vaidya Bandhu Membership',
          order_id: orderId,
          handler: function (response) {
            // Handle the payment success callback
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            // Here, you can call your backend to verify payment and mark the order as completed.
          },
          prefill: {
            name: formData.fullName,
            email: formData.emailId,
            contact: formData.mobileNumber,
          },
          theme: {
            color: '#F37254',
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      alert('Error occurred while creating order');
      setIsSubmitting(false);
    }
  };
  

  const benefits = [
    "Guaranteed 10% cashback on eligible hospital/treatment services",
    "10% to 40% discounts on surgeries, treatments & diagnostics",
    "Free 24x7 medical advice from expert panel",
    "Discounted doctor consultations in top hospitals",
    "Priority support for appointment booking",
    "Discounted health checkup packages",
    "Free surgery eligibility screening (based on financial need)",
    "Access to second opinions from senior doctors",
    "Pan-Karnataka access to hospital & diagnostic network",
    "Digital card download via app/website",
    "No usage limitation - use offers any number of times",
    "Valid for 1 year from activation date"
  ];

  const termsConditions = [
    "Membership card is non-refundable and valid for 1 year only.",
    "Discounts are applicable only in partnered hospitals, diagnostic labs, and clinics.",
    "Cashback or discounts do not apply to implants, stents, consumables, or pharmacy items sold at MRP.",
    "To avail benefits, patients must contact Vaidya Bandhu helpline or book via official platforms.",
    "Membership does not guarantee free surgery, but members are considered for free surgery based on need & approval.",
    "Misuse, false claims, or third-party misuse will lead to membership cancellation.",
    "Vaidya Bandhu is a facilitator, not a treatment provider; treatment-related responsibility lies with hospital/doctors.",
    "Offers & discounts are subject to change based on hospital tie-ups and service availability.",
    "There is no limit on usage - members can use benefits any number of times across any department within the 1-year period.",
    "If the card is not used during the 1-year validity, the member must call the helpline for free auto-renewal (only if unused). Otherwise, renewal is required after expiry."
  ];

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 text-dark mb-2">
            💳 VAIDYA BANDHU MEMBERSHIP
          </h1>
          <p className="lead text-muted mb-4">
            Get 10% to 40% Discount on Surgeries, Treatments & Diagnostics
          </p>
        </div>

        {/* Main Content Row */}
        <Row className="mb-8">
          {/* Left Section: Membership Benefits, Charges, and Terms */}
          <Col md={4}>
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 mb-4 shadow-lg">
              <Card.Body>
                <h4 className="h4 mb-4"><Star className="h-6 w-6 text-yellow-500 mr-1" /> MEMBERSHIP CARD BENEFITS</h4>
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
                <h2 className="h4 mb-4"><CreditCard className="h-6 w-6 text-green-500 mr-2" /> MEMBERSHIP CHARGES</h2>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2 text-primary" style={{ fontSize: '27px' }}>₹49</div>
                  <div className="text-lg opacity-90">Valid for 1 Year</div>
                  <div className="text-sm mt-2 opacity-80">Get your digital membership card instantly after registration</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Section: Personal Details Form */}
          <Col md={8}>
            <Card className="bg-white rounded-xl shadow-lg p-6 mb-4">
              <Card.Body>
                <h2 className="h4 mb-6 text-dark flex items-center"><MapPin className="h-6 w-6 text-blue-500 mr-2" /> Personal Details</h2>
                
                <Form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
                  <Row>
                    {/* Full Name */}
                    <Col md={6}>
                      <Form.Group controlId="formFullName" className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.fullName}
                          placeholder="Enter your full name"
                        />
                        <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Age */}
                    <Col md={6}>
                      <Form.Group controlId="formAge" className="mb-3">
                        <Form.Label>Age *</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={(e) => handleNumberChange(e, 'age')}
                          isInvalid={!!errors.age}
                          placeholder="Enter your age"
                          min="1"
                          max="120"
                        />
                        <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Gender */}
                  <Form.Group controlId="formGender" className="mb-3">
                    <Form.Label>Gender *</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      isInvalid={!!errors.gender}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                  </Form.Group>

                  {/* Mobile Number */}
                  <Form.Group controlId="formMobileNumber" className="mb-3">
                    <Form.Label>Mobile Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => handleNumberChange(e, 'mobileNumber')}
                      isInvalid={!!errors.mobileNumber}
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                    />
                    <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
                  </Form.Group>

                  {/* Full Address */}
                  <Form.Group controlId="formFullAddress" className="mb-3">
                    <Form.Label>Full Address *</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={handleInputChange}
                      rows={3}
                      isInvalid={!!errors.fullAddress}
                      placeholder="Enter your full address"
                    />
                    <Form.Control.Feedback type="invalid">{errors.fullAddress}</Form.Control.Feedback>
                  </Form.Group>

                  {/* Pin Code */}
                  <Form.Group controlId="formPinCode" className="mb-3">
                    <Form.Label>Pin Code *</Form.Label>
                    <Form.Control
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={(e) => handleNumberChange(e, 'pinCode')}
                      isInvalid={!!errors.pinCode}
                      placeholder="Enter your 6-digit pin code"
                      maxLength="6"
                    />
                    <Form.Control.Feedback type="invalid">{errors.pinCode}</Form.Control.Feedback>
                  </Form.Group>

                  {/* Aadhaar Number */}
                  <Form.Group controlId="formAadhaarNumber" className="mb-3">
                    <Form.Label>Aadhaar Number (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleNumberChange(e, 'aadhaarNumber')}
                      isInvalid={!!errors.aadhaarNumber}
                      placeholder="12-digit Aadhaar number"
                      maxLength="12"
                    />
                    <Form.Control.Feedback type="invalid">{errors.aadhaarNumber}</Form.Control.Feedback>
                  </Form.Group>

                  {/* PAN Number */}
                  <Form.Group controlId="formPanNumber" className="mb-3">
                    <Form.Label>PAN Number (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      isInvalid={!!errors.panNumber}
                      placeholder="PAN Number (e.g., ABCDE1234F)"
                      maxLength="10"
                      style={{ textTransform: 'uppercase' }}
                    />
                    <Form.Control.Feedback type="invalid">{errors.panNumber}</Form.Control.Feedback>
                  </Form.Group>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 py-3 mt-4 buy-membership-btn"
                  >
                    {isSubmitting ? 'Processing...' : 'Pay Now'}
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card>
          <Card className="bg-gradient-to-r from-red-500 to-pink-600 p-6 shadow-lg">
              <Card.Body>
                <h2 className="h4 mb-4"><Shield className="h-6 w-6 mr-2" /> TERMS & CONDITIONS</h2>
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

          </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VaidyaBandhuForm;
