import React, { Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/clinic-details/Content';
import { useParams } from 'react-router-dom'; // To get the params from the URL
import Header from '../layouts/Header';

const pagelocation = "Clinic Details";

const Clinicdetails = () => {
  // Using useParams hook to get the 'id' from the URL
  const { id } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>VaidyaBandhu - Doctors Appointment Booking - React Template | {pagelocation}</title>
        <meta
          name="description"
          content="#"
        />
      </Helmet>
      <Header />
      <Breadcrumbs breadcrumb={{ pagename: pagelocation }} />
      <Content detailId={id} /> {/* Pass the 'id' as prop to the Content component */}
      <Footer />
    </Fragment>
  );
};

export default Clinicdetails;
