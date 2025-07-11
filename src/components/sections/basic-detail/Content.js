import React, { useState, useEffect } from 'react';
import { CreditCard, MapPin, Star, Check, AlertCircle, Shield, Phone } from 'lucide-react'; // Added Phone icon

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
  const [animated, setAnimated] = useState(false); // For entrance animation
  const [hoveredChargesCard, setHoveredChargesCard] = useState(false); // New state for Membership Charges Card hover

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

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
                      fieldName === 'mobileNumber' || fieldName === 'alternateNumber' ? 10 :
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
      // This fetch call will likely fail in this isolated environment without a backend
      const response = await fetch('/api/create-order', {  // replace with your backend API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, amount: 4900, currency: 'INR' })  // ₹49 in smallest unit
      });
  
      const data = await response.json();
      console.log({ data });
      
      const { orderId, amount, currency, razorpayKeyId } = data;
  
      // If the order is created successfully, trigger Razorpay payment gateway
      if (orderId && typeof window.Razorpay !== 'undefined') {
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
      } else {
        alert('Payment gateway not available or order creation failed. Check console for details.');
      }
    } catch (error) {
      console.error('Error during form submission or order creation:', error);
      alert('Error occurred while creating order. Check console for details.');
    } finally {
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

  const baseTransition = "all 0.3s ease-in-out";

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)',
        padding: '50px 20px',
        fontFamily: "'Inter', sans-serif",
        color: '#4a5568',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 800,
              color: '#004d4f',
              marginBottom: '10px',
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(-20px)",
              transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
            }}
          >
            <CreditCard size={48} style={{ marginRight: '15px', color: '#007a7e' }} /> VAIDYA BANDHU MEMBERSHIP
          </h1>
          <p
            style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              color: '#5a6778',
              marginBottom: '30px',
              opacity: animated ? 1 : 0,
              transition: `opacity 0.8s ease-out 0.2s`,
            }}
          >
            Get 10% to 40% Discount on Surgeries, Treatments & Diagnostics
          </p>
        </div>

        {/* Main Content Layout */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px', // Space between columns
            justifyContent: 'center',
          }}
        >
          {/* Left Section: Membership Benefits & Charges */}
          <div style={{ flex: '1 1 300px', maxWidth: '500px' }}> {/* Col md={4} equivalent */}
            {/* Membership Benefits Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)', // Light, calming gradient
                color: '#4a5568', // Standard text color
                padding: '30px',
                marginBottom: '30px', // mb-4 equivalent
                borderRadius: '12px',
                boxShadow: '0 10px 20px rgba(0, 122, 126, 0.15)', // Shadow with teal tint
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s`,
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#004d4f', // Dark teal for heading
                  }}
                >
                  <Star size={24} color="#f59e0b" fill="#f59e0b" style={{ marginRight: '10px', flexShrink: 0 }} />
                  MEMBERSHIP CARD BENEFITS
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {benefits.map((benefit, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '10px',
                        fontSize: 'clamp(15px, 1.8vw, 17px)',
                        lineHeight: '1.5',
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(10px)",
                        transition: `opacity 0.6s ease-out ${0.6 + index * 0.05}s, transform 0.6s ease-out ${0.6 + index * 0.05}s`,
                      }}
                    >
                      <Check size={20} color="#007a7e" style={{ marginTop: '2px', marginRight: '8px', flexShrink: 0 }} />
                      <span style={{ flexGrow: 1 }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Membership Charges Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)', // Light, calming gradient
                color: '#4a5568', // Standard text color
                padding: '30px',
                marginBottom: '30px',
                borderRadius: '12px',
                boxShadow: hoveredChargesCard ? '0 15px 30px rgba(0, 122, 126, 0.25)' : '0 10px 20px rgba(0, 122, 126, 0.15)', // Enhanced shadow on hover
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.8s ease-out 0.5s`, // Combined transition for entrance and hover
                position: 'relative', // For any absolute positioning if needed
                overflow: 'hidden', // Ensures image animation stays within bounds
              }}
              onMouseEnter={() => setHoveredChargesCard(true)}
              onMouseLeave={() => setHoveredChargesCard(false)}
            >
              <div>
                <h4
                  style={{
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#004d4f', // Dark teal for heading
                  }}
                >
                  <CreditCard size={38} color="#007a7e" style={{ marginRight: '10px', flexShrink: 0 }} />
                  MEMBERSHIP CHARGES
                </h4>

                {/* New: Image for Membership Card */}
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <img
  src="https://placehold.co/400x250/007a7e/ffffff?text=Membership+Card"
  alt="Vaidya Bandhu Membership Card"
  style={{
    maxWidth: '500px',         // Increased width
    height: '220px',           // Increased height
    objectFit: 'contain',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 122, 126, 0.25)',
    transition: 'all 0.4s ease-in-out',
    transform: hoveredChargesCard ? 'scale(1.05) rotateZ(2deg)' : 'scale(1) rotateZ(0deg)',
  }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/400x250/CCCCCC/666666?text=Card+Error";
  }}
/>

                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '0px', color: '#007a7e' }}>₹49</div>
                  <div style={{ fontSize: '18px', opacity: 0.9 }}>Valid for 1 Year</div>
                  <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.8 }}>Get your digital membership card instantly after registration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Personal Details Form */}
          <div style={{ flex: '1 1 500px', maxWidth: '700px' }}> {/* Col md={8} equivalent */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                padding: '30px',
                marginBottom: '30px',
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s`,
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 34px)',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                  color: '#004d4f',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MapPin size={28} color="#007a7e" style={{ marginRight: '12px' }} /> Personal Details
              </h2>
              
              <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  {/* Full Name */}
                  <div style={{ flex: '1 1 calc(50% - 10px)' }}> {/* Col md={6} equivalent */}
                    <label htmlFor="fullName" style={formLabelStyle}>Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      style={formControlStyle(!!errors.fullName)}
                    />
                    {errors.fullName && <div style={formFeedbackStyle}>{errors.fullName}</div>}
                  </div>

                  {/* Age */}
                  <div style={{ flex: '1 1 calc(50% - 10px)' }}> {/* Col md={6} equivalent */}
                    <label htmlFor="age" style={formLabelStyle}>Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={(e) => handleNumberChange(e, 'age')}
                      placeholder="Enter your age"
                      min="1"
                      max="120"
                      style={formControlStyle(!!errors.age)}
                    />
                    {errors.age && <div style={formFeedbackStyle}>{errors.age}</div>}
                  </div>
                </div>

                {/* Gender */}
                <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                  <label htmlFor="gender" style={formLabelStyle}>Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    style={formControlStyle(!!errors.gender, true)} // Pass true for select
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <div style={formFeedbackStyle}>{errors.gender}</div>}
                </div>

                {/* Mobile Number */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="mobileNumber" style={formLabelStyle}>Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) => handleNumberChange(e, 'mobileNumber')}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    style={formControlStyle(!!errors.mobileNumber)}
                  />
                  {errors.mobileNumber && <div style={formFeedbackStyle}>{errors.mobileNumber}</div>}
                </div>

                {/* Alternate Mobile Number */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="alternateNumber" style={formLabelStyle}>Alternate Mobile Number (Optional)</label>
                  <input
                    type="tel"
                    id="alternateNumber"
                    name="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={(e) => handleNumberChange(e, 'alternateNumber')}
                    placeholder="Enter 10-digit alternate mobile number"
                    maxLength="10"
                    style={formControlStyle(!!errors.alternateNumber)}
                  />
                  {errors.alternateNumber && <div style={formFeedbackStyle}>{errors.alternateNumber}</div>}
                </div>

                {/* Email ID */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="emailId" style={formLabelStyle}>Email ID (Optional)</label>
                  <input
                    type="email"
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    style={formControlStyle(!!errors.emailId)}
                  />
                  {errors.emailId && <div style={formFeedbackStyle}>{errors.emailId}</div>}
                </div>

                {/* Full Address */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="fullAddress" style={formLabelStyle}>Full Address *</label>
                  <textarea
                    id="fullAddress"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter your full address"
                    style={formControlStyle(!!errors.fullAddress)}
                  ></textarea>
                  {errors.fullAddress && <div style={formFeedbackStyle}>{errors.fullAddress}</div>}
                </div>

                {/* Pin Code */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="pinCode" style={formLabelStyle}>Pin Code *</label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleNumberChange(e, 'pinCode')}
                    placeholder="Enter your 6-digit pin code"
                    maxLength="6"
                    style={formControlStyle(!!errors.pinCode)}
                  />
                  {errors.pinCode && <div style={formFeedbackStyle}>{errors.pinCode}</div>}
                </div>

                {/* Aadhaar Number */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="aadhaarNumber" style={formLabelStyle}>Aadhaar Number (Optional)</label>
                  <input
                    type="text"
                    id="aadhaarNumber"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleNumberChange(e, 'aadhaarNumber')}
                    placeholder="12-digit Aadhaar number"
                    maxLength="12"
                    style={formControlStyle(!!errors.aadhaarNumber)}
                  />
                  {errors.aadhaarNumber && <div style={formFeedbackStyle}>{errors.aadhaarNumber}</div>}
                </div>

                {/* PAN Number */}
                <div style={{ marginBottom: '30px' }}>
                  <label htmlFor="panNumber" style={formLabelStyle}>PAN Number (Optional)</label>
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    placeholder="PAN Number (e.g., ABCDE1234F)"
                    maxLength="10"
                    style={{ ...formControlStyle(!!errors.panNumber), textTransform: 'uppercase' }}
                  />
                  {errors.panNumber && <div style={formFeedbackStyle}>{errors.panNumber}</div>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '15px 25px',
                    marginTop: '20px',
                    background: 'linear-gradient(to right, #007a7e, #004d4f)', // Teal gradient
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: '600',
                    boxShadow: '0 4px 10px rgba(0, 122, 126, 0.2)',
                    transition: baseTransition,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 122, 126, 0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={(e) => { if (!isSubmitting) { e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 122, 126, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                >
                  {isSubmitting ? 'Processing...' : 'Pay Now'}
                </button>
              </form>
            </div>
          </div>

        
        </div>
          {/* Rightmost Section: Terms & Conditions - MOVED HERE */}
          <div style={{ flex: '1 1 300px', maxWidth: '1200px' }}> {/* Col equivalent */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)', // Light, calming gradient
                color: '#4a5568', // Standard text color
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 10px 20px rgba(0, 122, 126, 0.15)', // Shadow with teal tint
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease-out 0.7s, transform 0.8s ease-out 0.7s`,
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#004d4f', // Dark teal for heading
                  }}
                >
                  <Shield size={24} color="#007a7e" style={{ marginRight: '10px', flexShrink: 0 }} />
                  TERMS & CONDITIONS
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {termsConditions.map((term, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '10px',
                        fontSize: 'clamp(15px, 1.8vw, 17px)',
                        lineHeight: '1.5',
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(10px)",
                        transition: `opacity 0.6s ease-out ${0.8 + index * 0.05}s, transform 0.6s ease-out ${0.8 + index * 0.05}s`,
                      }}
                    >
                      <AlertCircle size={20} color="#fbbf24" style={{ marginTop: '2px', marginRight: '8px', flexShrink: 0 }} /> {/* Yellow for warning/info */}
                      <span style={{ flexGrow: 1 }}>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
      </div>

      {/* Global Styles for responsiveness and animations */}
      <style>
        {`
          /* Form Control Base Styles */
          input[type="text"],
          input[type="number"],
          input[type="tel"],
          input[type="email"],
          textarea,
          select {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 16px;
            color: #4a5568;
            outline: none;
            transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            box-sizing: border-box; /* Ensure padding doesn't increase width */
          }

          input[type="text"]:focus,
          input[type="number"]:focus,
          input[type="tel"]:focus,
          input[type="email"]:focus,
          textarea:focus,
          select:focus {
            border-color: #007a7e;
            box-shadow: 0 0 0 3px rgba(0, 122, 126, 0.2);
          }

          input.is-invalid,
          select.is-invalid,
          textarea.is-invalid {
            border-color: #e74c3c !important;
          }

          /* Custom select arrow */
          select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 20px;
          }

          /* Responsive Adjustments */
          @media (max-width: 992px) {
            div[style*="display: flex"][style*="flex-wrap: wrap"][style*="gap: 30px"] { /* Main content layout */
              flex-direction: column !important;
              align-items: center !important;
            }
            div[style*="flex: 1 1 300px"], /* Left section (benefits/charges) */
            div[style*="flex: 1 1 500px"] { /* Right section (form) */
              max-width: 100% !important;
              width: 100% !important;
            }
            div[style*="flex: 1 1 calc(50% - 10px)"] { /* Form row columns */
              flex: 1 1 100% !important; /* Stack form fields */
            }
          }

          @media (max-width: 768px) {
            div[style*="padding: 50px 20px"] { /* Main container padding */
              padding: 40px 15px !important;
            }
            h1[style*="font-size: clamp(36px, 5vw, 48px)"] { /* Header title */
              font-size: clamp(30px, 6vw, 40px) !important;
            }
            h1 svg { /* Header icon size */
              width: 40px !important;
              height: 40px !important;
            }
            p[style*="font-size: clamp(18px, 2.5vw, 22px)"] { /* Header subtitle */
              font-size: clamp(16px, 3.5vw, 20px) !important;
            }
            h4[style*="font-size: clamp(22px, 3vw, 28px)"] { /* Card headings */
              font-size: clamp(20px, 4vw, 26px) !important;
            }
            h4 svg { /* Card heading icons */
              width: 22px !important;
              height: 22px !important;
            }
            ul li { /* List item font size */
              font-size: clamp(14px, 2.5vw, 16px) !important;
            }
            ul li svg { /* List item check/alert icons */
              width: 18px !important;
              height: 18px !important;
            }
            div[style*="font-size: 36px"] { /* Charges amount */
              font-size: 30px !important;
            }
            button[type="submit"] { /* Submit button */
              padding: 12px 20px !important;
              font-size: 16px !important;
            }
          }

          @media (max-width: 480px) {
            div[style*="padding: 50px 20px"] { /* Main container padding */
              padding: 30px 10px !important;
            }
            h1[style*="font-size: clamp(36px, 5vw, 48px)"] { /* Header title */
              font-size: clamp(28px, 7vw, 36px) !important;
            }
            h1 svg { /* Header icon size */
              width: 36px !important;
              height: 36px !important;
            }
            p[style*="font-size: clamp(18px, 2.5vw, 22px)"] { /* Header subtitle */
              font-size: clamp(14px, 4vw, 18px) !important;
            }
            h4[style*="font-size: clamp(22px, 3vw, 28px)"] { /* Card headings */
              font-size: clamp(18px, 5vw, 24px) !important;
            }
            h4 svg { /* Card heading icons */
              width: 20px !important;
              height: 20px !important;
            }
            ul li { /* List item font size */
              font-size: clamp(13px, 3vw, 15px) !important;
            }
            ul li svg { /* List item check/alert icons */
              width: 16px !important;
              height: 16px !important;
            }
            div[style*="font-size: 36px"] { /* Charges amount */
              font-size: 28px !important;
            }
            label[style] { /* Form labels */
              font-size: 14px !important;
            }
            input[type="text"],
            input[type="number"],
            input[type="tel"],
            input[type="email"],
            textarea,
            select {
              padding: 10px 12px !important;
              font-size: 15px !important;
            }
            button[type="submit"] { /* Submit button */
              padding: 10px 15px !important;
              font-size: 15px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// Helper styles for form elements to keep render method clean
const formLabelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: '#4a5568',
  fontSize: '15px',
};

const formControlStyle = (isInvalid, isSelect = false) => ({
  width: '100%',
  padding: '12px 15px',
  border: `1px solid ${isInvalid ? '#e74c3c' : '#e2e8f0'}`,
  borderRadius: '8px',
  fontSize: '16px',
  color: '#4a5568',
  outline: 'none',
  transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  boxSizing: 'border-box', // Ensure padding doesn't increase width
  backgroundColor: '#ffffff',
  ...(isSelect && {
    appearance: 'none', // Remove default arrow for select
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '20px',
  }),
  '&:focus': { // This won't work in React inline styles, handled by global CSS
    borderColor: '#007a7e',
    boxShadow: '0 0 0 3px rgba(0, 122, 126, 0.2)',
  },
});

const formFeedbackStyle = {
  color: '#e74c3c',
  fontSize: '13px',
  marginTop: '5px',
};

export default VaidyaBandhuForm;
