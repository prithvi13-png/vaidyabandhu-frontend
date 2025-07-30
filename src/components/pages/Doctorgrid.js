import React from 'react';
import { Helmet } from "react-helmet-async";
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/doctor-grid/Content';
import Header from '../layouts/Header';

const pagelocation = "Expert Care Areas";

const Doctorgrid = () => {
    
    return (
        <>
            <Helmet>
                <title>VaidyaBandhu</title>
                <meta name="description" content="#" />
            </Helmet>
            <Header />
            <Breadcrumbs breadcrumb={{ pagename: pagelocation }} />
            <Content />
            <Footer />
        </>
    );
};

export default Doctorgrid;
