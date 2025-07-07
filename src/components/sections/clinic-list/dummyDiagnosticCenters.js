import React, { useEffect, useState } from 'react';
import { Phone, MapPin, Search } from 'lucide-react'; // Added Search icon

// Dummy data for diagnostic centers
const dummyDiagnosticCenters = [
    {
        id: 'center1',
        name: 'City Diagnostics Lab',
        contact: '+91 98765 43210',
        address: '123 Health St, Bangalore, Karnataka, India',
        services: [
            { name: 'Blood Tests', description: 'Comprehensive blood work and pathology.' },
            { name: 'X-Ray Imaging', description: 'Digital X-ray services for various body parts.' },
            { name: 'Ultrasound Scan', description: 'High-resolution ultrasound for internal organs.' },
            { name: 'ECG', description: 'Electrocardiogram for heart health assessment.' },
            { name: 'Thyroid Function Test', description: 'Tests to evaluate thyroid gland performance.' },
        ]
    },
    {
        id: 'center2',
        name: 'MediCare Scan Center',
        contact: '+91 99887 76655',
        address: '456 Scan Rd, Mumbai, Maharashtra, India',
        services: [
            { name: 'MRI Scan', description: 'Advanced Magnetic Resonance Imaging.' },
            { name: 'CT Scan', description: 'Computed Tomography scans for detailed internal views.' },
            { name: 'Mammography', description: 'Breast imaging for early detection.' },
            { name: 'Bone Densitometry', description: 'DEXA scans for bone health.' },
        ]
    },
    {
        id: 'center3',
        name: 'Global Diagnostics',
        contact: '+91 90000 11111',
        address: '789 Lab Lane, Delhi, Delhi, India',
        services: [
            { name: 'Urine Analysis', description: 'Complete urine examination.' },
            { name: 'Stool Test', description: 'Analysis of stool samples for digestive health.' },
            { name: 'Allergy Testing', description: 'Tests to identify specific allergens.' },
            { name: 'Vitamin D Test', description: 'Measurement of Vitamin D levels.' },
            { name: 'Full Body Checkup', description: 'Comprehensive health screening packages.' },
        ]
    },
    {
        id: 'center4',
        name: 'Precision Labs',
        contact: '+91 77777 88888',
        address: '101 Accuracy Ave, Chennai, Tamil Nadu, India',
        services: [
            { name: 'Pathology Services', description: 'Wide range of diagnostic pathology tests.' },
            { name: 'Microbiology', description: 'Identification of infectious agents.' },
            { name: 'Histopathology', description: 'Microscopic examination of tissues.' },
        ]
    }
];

// Placeholder for the detail page component
const DiagnosticCenterDetail = ({ centerData, onBackToList }) => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const baseTransition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    if (!centerData) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px', color: '#5a6778' }}>
                No center data available for details.
            </div>
        );
    }

    return (
        <div
            style={{
                padding: '80px 20px',
                background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)',
                fontFamily: "'Inter', sans-serif",
                color: '#4a5568',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <button
                    onClick={onBackToList}
                    style={{
                        background: '#007a7e',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '30px',
                        boxShadow: '0 4px 10px rgba(0, 122, 126, 0.2)',
                        transition: baseTransition,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#004d4f'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#007a7e'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                    ← Back to List
                </button>

                <div
                    style={{
                        background: '#ffffff',
                        borderRadius: '20px',
                        boxShadow: '0 12px 35px rgba(0, 122, 126, 0.12)',
                        padding: '40px',
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(30px)",
                        transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
                    }}
                >
                    <h2 style={{
                        fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, color: '#004d4f',
                        textAlign: 'center', marginBottom: '30px', position: 'relative'
                    }}>
                        {centerData.name} <span style={{ color: '#007a7e' }}>Details</span>
                        <span style={{ content: '""', position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', width: '90px', height: '4px', backgroundColor: '#007a7e', borderRadius: '2px' }}></span>
                        <span style={{ content: '""', position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '4px', backgroundColor: 'rgba(0, 122, 126, 0.6)', borderRadius: '2px' }}></span>
                    </h2>

                    <div style={{ marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
                        <p style={{ fontSize: 'clamp(18px, 2.2vw, 20px)', color: '#4a5568', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Phone size={24} style={{ marginRight: '15px', color: '#007a7e' }} />
                            <strong>Contact:</strong> {centerData.contact}
                        </p>
                        <p style={{ fontSize: 'clamp(18px, 2.2vw, 20px)', color: '#4a5568', display: 'flex', alignItems: 'flex-start' }}>
                            <MapPin size={24} style={{ marginRight: '15px', color: '#007a7e', marginTop: '3px' }} />
                            <strong>Address:</strong> {centerData.address}
                        </p>
                    </div>

                    {centerData.services && centerData.services.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: '700', color: '#004d4f', marginBottom: '20px', textAlign: 'center' }}>
                                Services <span style={{ color: '#007a7e' }}>Available</span>
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {centerData.services.map((service, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            backgroundColor: 'rgba(0, 122, 126, 0.05)',
                                            borderRadius: '10px',
                                            padding: '15px 20px',
                                            marginBottom: '15px',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            boxShadow: '0 2px 8px rgba(0, 122, 126, 0.1)',
                                            transition: baseTransition,
                                            ...(animated && { transitionDelay: `${0.2 + i * 0.05}s` }),
                                            opacity: animated ? 1 : 0,
                                            transform: animated ? "translateY(0)" : "translateY(20px)",
                                        }}
                                    >
                                        <CheckCircle size={20} style={{ marginRight: '15px', color: '#007a7e', flexShrink: 0, marginTop: '3px' }} />
                                        <div>
                                            <h4 style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: '600', color: '#004d4f', marginBottom: '5px' }}>
                                                {service.name}
                                            </h4>
                                            <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: '#5a6778', marginBottom: '0' }}>
                                                {service.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Keyframes for animations */}
            <style>
                {`
                    @keyframes floatShape1 {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(20px, 20px) rotate(5deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }
                    @keyframes floatShape2 {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(-20px, -20px) rotate(-5deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }

                    /* Responsive adjustments */
                    @media (max-width: 768px) {
                        div[style*="padding: 80px 20px"] { /* Main section padding */
                            padding: 60px 15px !important;
                        }
                        div[style*="padding: 40px"] { /* Card padding */
                            padding: 30px !important;
                        }
                        h2[style*="font-size: clamp(36px, 5vw, 48px)"] { /* Main title */
                            font-size: clamp(32px, 6vw, 40px) !important;
                            margin-bottom: 25px !important;
                        }
                        h3[style*="font-size: clamp(28px, 3.5vw, 36px)"] { /* Services title */
                            font-size: clamp(24px, 4.5vw, 32px) !important;
                            margin-bottom: 15px !important;
                        }
                        p[style*="font-size: clamp(18px, 2.2vw, 20px)"] { /* Contact/Address text */
                            font-size: clamp(16px, 2.8vw, 18px) !important;
                        }
                        h4[style*="font-size: clamp(18px, 2.2vw, 22px)"] { /* Service name */
                            font-size: clamp(17px, 2.5vw, 20px) !important;
                        }
                        p[style*="font-size: clamp(15px, 1.8vw, 17px)"] { /* Service description */
                            font-size: clamp(14px, 2.2vw, 16px) !important;
                        }
                        li[style*="padding: 15px 20px"] { /* Service list item padding */
                            padding: 12px 15px !important;
                        }
                        svg[style*="margin-right: 15px"] { /* Icon margin */
                            margin-right: 10px !important;
                        }
                    }

                    @media (max-width: 480px) {
                        div[style*="padding: 80px 20px"] { /* Main section padding */
                            padding: 40px 10px !important;
                        }
                        div[style*="padding: 40px"] { /* Card padding */
                            padding: 20px !important;
                        }
                        h2[style*="font-size: clamp(36px, 5vw, 48px)"] { /* Main title */
                            font-size: clamp(28px, 7vw, 36px) !important;
                            margin-bottom: 20px !important;
                        }
                        h3[style*="font-size: clamp(28px, 3.5vw, 36px)"] { /* Services title */
                            font-size: clamp(22px, 5vw, 28px) !important;
                            margin-bottom: 10px !important;
                        }
                        p[style*="font-size: clamp(18px, 2.2vw, 20px)"] { /* Contact/Address text */
                            font-size: clamp(15px, 3.5vw, 17px) !important;
                        }
                        h4[style*="font-size: clamp(18px, 2.2vw, 22px)"] { /* Service name */
                            font-size: clamp(16px, 3.8vw, 19px) !important;
                        }
                        p[style*="font-size: clamp(15px, 1.8vw, 17px)"] { /* Service description */
                            font-size: clamp(13px, 3vw, 15px) !important;
                        }
                        li[style*="padding: 15px 20px"] { /* Service list item padding */
                            padding: 10px 12px !important;
                        }
                        svg[style*="margin-right: 15px"] { /* Icon margin */
                            margin-right: 8px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};


const DiagnosticCentersList = () => {
    const [centers, setCenters] = useState([]);
    const [filteredCenters, setFilteredCenters] = useState([]); // State for filtered results
    const [animated, setAnimated] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCenterData, setSelectedCenterData] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Combined search term

    useEffect(() => {
        // Simulate data fetching with a delay
        const timer = setTimeout(() => {
            const sortedCenters = dummyDiagnosticCenters.sort((a, b) => a.name.localeCompare(b.name));
            setCenters(sortedCenters);
            setFilteredCenters(sortedCenters); // Initialize filtered list with all centers
            setAnimated(true); // Trigger animation
        }, 500); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = () => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        if (!lowerCaseSearchTerm) {
            setFilteredCenters(centers); // If search term is empty, show all centers
            return;
        }

        const results = centers.filter(center => {
            // Check if search term matches location
            const matchesLocation = center.address.toLowerCase().includes(lowerCaseSearchTerm);

            // Check if search term matches any service name or description
            const matchesService = center.services.some(service =>
                service.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                service.description.toLowerCase().includes(lowerCaseSearchTerm)
            );

            return matchesLocation || matchesService; // Match if it's in location OR service
        });
        setFilteredCenters(results);
    };

    const baseTransition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    // If a center is selected, render the detail component instead of the list
    if (selectedCenterData) {
        return <DiagnosticCenterDetail centerData={selectedCenterData} onBackToList={() => setSelectedCenterData(null)} />;
    }

    return (
        <div
            style={{
                padding: '80px 20px',
                background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)',
                fontFamily: "'Inter', sans-serif",
                color: '#4a5568',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <h2 style={{
                    fontSize: 'clamp(32px, 4.5vw, 40px)', fontWeight: 800, color: '#004d4f',
                    textAlign: 'center', marginBottom: '40px'
                }}>
                    Our Diagnostic <span style={{ color: '#007a7e' }}>Centers</span>
                </h2>

                {/* Single Search and Filter Section */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap', // Allow wrapping on smaller screens
                    gap: '15px',
                    marginBottom: '40px',
                    justifyContent: 'center',
                    padding: '20px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 8px 20px rgba(0, 122, 126, 0.08)',
                    transition: baseTransition,
                    opacity: animated ? 1 : 0,
                    transform: animated ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: '0.1s',
                }}>
                    <input
                        type="text"
                        placeholder="Search by Location or Service (e.g., Bangalore, X-Ray)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => { // Allow pressing Enter to search
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        style={{
                            flex: '1 1 300px', // Flexible width, min 300px
                            padding: '12px 15px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            color: '#4a5568',
                            outline: 'none',
                            transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            '&:focus': {
                                borderColor: '#007a7e',
                                boxShadow: '0 0 0 2px rgba(0, 122, 126, 0.2)',
                            }
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            flexShrink: 0, // Prevent shrinking
                            background: '#007a7e',
                            color: '#ffffff',
                            border: 'none',
                            padding: '12px 25px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '600',
                            boxShadow: '0 4px 10px rgba(0, 122, 126, 0.2)',
                            transition: baseTransition,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#004d4f'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#007a7e'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <Search size={18} style={{ marginRight: '8px' }} /> Search
                    </button>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
                        gap: '30px',
                        justifyContent: 'center',
                    }}
                >
                    {filteredCenters.length === 0 ? (
                        <p style={{ textAlign: 'center', gridColumn: '1 / -1', fontSize: '18px', color: '#5a6778' }}>
                            No diagnostic centers found matching your criteria.
                        </p>
                    ) : (
                        filteredCenters.map((center, i) => (
                            <div
                                key={center.id}
                                style={{
                                    background: '#ffffff',
                                    borderRadius: '16px',
                                    boxShadow: hoveredCard === center.id ? '0 18px 40px rgba(0, 122, 126, 0.2)' : '0 8px 20px rgba(0, 122, 126, 0.08)',
                                    padding: '30px',
                                    textAlign: 'left',
                                    transition: baseTransition,
                                    opacity: animated ? 1 : 0,
                                    transform: animated ? "translateY(0)" : "translateY(40px)",
                                    transitionDelay: `${0.2 + i * 0.1}s`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer', // Indicate clickable
                                }}
                                onMouseEnter={() => setHoveredCard(center.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => setSelectedCenterData(center)} // Pass the entire center object
                            >
                                <div>
                                    <h5 style={{ fontSize: 'clamp(22px, 2.8vw, 26px)', fontWeight: '700', color: '#004d4f', marginBottom: '10px' }}>
                                        {center.name}
                                    </h5>
                                    <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: '#5a6778', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                        <Phone size={18} style={{ marginRight: '10px', color: '#007a7e' }} />
                                        {center.contact}
                                    </p>
                                    <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: '#5a6778', display: 'flex', alignItems: 'flex-start', marginBottom: '0' }}>
                                        <MapPin size={18} style={{ marginRight: '10px', color: '#007a7e', marginTop: '3px' }} />
                                        {center.address}
                                    </p>
                                </div>
                                <button
                                    style={{
                                        marginTop: '20px',
                                        background: '#007a7e',
                                        color: '#ffffff',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 10px rgba(0, 122, 126, 0.2)',
                                        transition: baseTransition,
                                        alignSelf: 'flex-start', // Align button to start
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#004d4f'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#007a7e'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Keyframes for animations */}
            <style>
                {`
                    @keyframes floatShape1 {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(20px, 20px) rotate(5deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }
                    @keyframes floatShape2 {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(-20px, -20px) rotate(-5deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }

                    /* Responsive adjustments */
                    @media (max-width: 768px) {
                        div[style*="padding: 80px 20px"] { /* Main section padding */
                            padding: 60px 15px !important;
                        }
                        h2[style*="font-size: clamp(32px, 4.5vw, 40px)"] { /* Title */
                            font-size: clamp(28px, 5.5vw, 36px) !important;
                            margin-bottom: 30px !important;
                        }
                        div[style*="grid-template-columns"] { /* Grid columns */
                            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
                            gap: 25px !important;
                        }
                        div[style*="padding: 30px"] { /* Card padding */
                            padding: 25px !important;
                        }
                        h5[style*="font-size: clamp(22px, 2.8vw, 26px)"] { /* Card Title */
                            font-size: clamp(20px, 3.5vw, 24px) !important;
                        }
                        p[style*="font-size: clamp(16px, 2vw, 18px)"] { /* Card text */
                            font-size: clamp(15px, 2.8vw, 17px) !important;
                        }
                        button[style*="padding: 10px 20px"] { /* Button */
                            padding: 8px 16px !important;
                            font-size: 14px !important;
                        }
                        /* Search and Filter Section Responsive */
                        div[style*="display: flex"][style*="flex-wrap: wrap"][style*="gap: 15px"] {
                            flex-direction: column !important;
                            align-items: stretch !important; /* Stretch items to full width */
                            padding: 15px !important;
                        }
                        input[type="text"][style*="flex: 1 1 300px"] { /* Single search input */
                            flex: 1 1 auto !important; /* Allow inputs to take full width */
                            width: 100% !important;
                        }
                        button[style*="flex-shrink: 0"] {
                            width: 100% !important; /* Button takes full width */
                            padding: 10px 20px !important;
                            font-size: 15px !important;
                        }
                    }

                    @media (max-width: 480px) {
                        div[style*="padding: 80px 20px"] { /* Main section padding */
                            padding: 40px 10px !important;
                        }
                        h2[style*="font-size: clamp(32px, 4.5vw, 40px)"] { /* Title */
                            font-size: clamp(24px, 7vw, 30px) !important;
                            margin-bottom: 25px !important;
                        }
                        div[style*="grid-template-columns"] { /* Grid columns */
                            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
                            gap: 20px !important;
                        }
                        div[style*="padding: 30px"] { /* Card padding */
                            padding: 20px !important;
                        }
                        h5[style*="font-size: clamp(22px, 2.8vw, 26px)"] { /* Card Title */
                            font-size: clamp(18px, 4vw, 22px) !important;
                        }
                        p[style*="font-size: clamp(16px, 2vw, 18px)"] { /* Card text */
                            font-size: clamp(14px, 3.5vw, 16px) !important;
                        }
                        button[style*="padding: 10px 20px"] { /* Button */
                            padding: 7px 14px !important;
                            font-size: 13px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default DiagnosticCentersList;
