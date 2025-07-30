'use client'; // Mark as Client Component for broad compatibility, though static content doesn't strictly require it.

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">Privacy Policy</h1>

        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          At Vaidya Bandhu, we are dedicated to safeguarding your privacy and handling your
          personal data responsibly. This Privacy Policy explains our practices regarding the collection,
          use, processing, storage, disclosure, and protection of your personal information. We comply
          with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian
          laws, ensuring transparency, fairness, and accountability in data handling.
        </p>

        <p className="mb-6 text-sm sm:text-base leading-relaxed">
          As a healthcare platform offering membership services, doctor appointment booking,
          consultations, and discounts at partnered facilities, we process personal data as a Data
          Fiduciary under the DPDP Act. Personal data includes any information that relates to an
          identified or identifiable individual, and we treat health-related data as sensitive personal
          data, applying enhanced protections.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">1. Information We Collect</h2>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          We collect personal information only when it is necessary and with your explicit consent or
          as permitted by law. Categories include:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6 text-sm sm:text-base leading-relaxed">
          <li>
            <strong className="font-medium">Personal Identification Information:</strong> Full name, address, phone number, email address
            (optional), PAN (Permanent Account Number), and Aadhaar details (optional, collected only
            for identity verification where required).
          </li>
          <li>
            <strong className="font-medium">Sensitive Personal Data:</strong> Health-related details, medical history, or consultation records
            (collected solely for providing medical services, with your explicit consent).
          </li>
          <li>
            <strong className="font-medium">Usage and Technical Data:</strong> IP address, device information, browser type, and interaction
            logs when you visit our website or use our services (collected automatically for security and
            improvement purposes).
          </li>
          <li>
            <strong className="font-medium">Other Data:</strong> Payment details (processed through secure gateways) and any other information
            you voluntarily provide during inquiries or support interactions. We adhere to data
            minimization principles, collecting only what is essential for the specified purposes.
          </li>
        </ul>

        {/* You can add more sections here as you provide more policy text */}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
