import React, { Suspense, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import BasicDetail from './components/pages/BasicDetail';

// Home
const Home = React.lazy(() => import("./components/pages/Home"));
const Hometwo = React.lazy(() => import("./components/pages/Hometwo"));
// Blog
const Blog = React.lazy(() => import("./components/pages/Blog"));
const Blogstandard = React.lazy(() => import("./components/pages/Blogstandard"));
const Blogdetails = React.lazy(() => import("./components/pages/Blogdetails"));
// About
const About = React.lazy(() => import("./components/pages/About"));
// Services
const Services = React.lazy(() => import("./components/pages/Services"));
const Servicedetails = React.lazy(() => import("./components/pages/Servicedetails"));
// FAQ's
const Faqs = React.lazy(() => import("./components/pages/Faqs"));
// Appointment
const Appointment = React.lazy(() => import("./components/pages/Appointment"));
// Clinics
const Clinicgrid = React.lazy(() => import("./components/pages/Clinicgrid"));
const Cliniclist = React.lazy(() => import("./components/pages/Cliniclist"));
const Clinicdetails = React.lazy(() => import("./components/pages/Clinicdetails"));
// Doctors
const Doctorgrid = React.lazy(() => import("./components/pages/Doctorgrid"));
const Doctorlist = React.lazy(() => import("./components/pages/Doctorlist"));
const Doctordetails = React.lazy(() => import("./components/pages/Doctordetails"));
// Contact
const Contact = React.lazy(() => import("./components/pages/Contact"));
// Extra
const Errorpage = React.lazy(() => import("./components/pages/Errorpage"));

// Scroll to Top component (updated for React Router v6)
function ScrollToTop({ children }) {
  const location = useLocation();
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children || null;
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<div></div>}>
          <ScrollToTop>
            <Routes>            
              {/* Home */}
              <Route path="/" element={<Home />} />
              <Route path="/home-v2" element={<Hometwo />} />
              
              {/* Blog */}
              <Route path="/blog/cat/:catId" element={<Blog key={window.location.pathname} />} />
              <Route path="/blog/tag/:tagId" element={<Blog key={window.location.pathname} />} />
              <Route path="/blog/search/:query" element={<Blog key={window.location.pathname} />} />
              <Route path="/blog/author/:authorId" element={<Blog key={window.location.pathname} />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-standard" element={<Blogstandard />} />
              <Route path="/blog-details/:id" element={<Blogdetails key={window.location.pathname} />} />
              
              {/* About */}
              <Route path="/about" element={<About />} />
              
              {/* Services */}
              <Route path="/service/cat/:catId" element={<Services key={window.location.pathname} />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-details/:id" element={<Servicedetails key={window.location.pathname} />} />
              
              {/* FAQ's */}
              <Route path="/faqs" element={<Faqs />} />
              
              {/* Appointment */}
              <Route path="/appointment" element={<Appointment />} />
              
              {/* Clinics */}
              <Route path="/clinic/cat/:catId" element={<Clinicgrid key={window.location.pathname} />} />
              <Route path="/clinic-grid" element={<Clinicgrid />} />
              <Route path="/clinic-list" element={<Cliniclist />} />
              <Route path="/clinic-details/:id" element={<Clinicdetails key={window.location.pathname} />} />
              
              {/* Doctors */}
              <Route path="/doctor/cat/:catId" element={<Doctorgrid key={window.location.pathname} />} />
              <Route path="/doctor-grid" element={<Doctorgrid />} />
              <Route path="/doctor-list" element={<Doctorlist />} />
              <Route path="/doctor-details/:id" element={<Doctordetails key={window.location.pathname} />} />
              
              {/* Contact */}
              <Route path="/contact" element={<Contact />} />
              
              {/* Basic Route */}
              <Route path="/basic-details" element={<BasicDetail />} />

              {/* Extra */}
              <Route path="/error-page" element={<Errorpage />} />
              <Route path="*" element={<Errorpage />} />
            </Routes>
          </ScrollToTop>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;