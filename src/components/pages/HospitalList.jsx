import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../layouts/Header';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import HospitalListContent from '../sections/hospital';

const pagelocation = "Find a Hospital";

class HospitalList extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>VaidyaBandhu </title>
                    <meta
                        name="description"
                        content="#"
                    />
                </Helmet>
                <Header />
                <Breadcrumbs breadcrumb={{ pagename: pagelocation }} />
                <HospitalListContent />
                <Footer />
            </Fragment>
        );
    }
}

export default HospitalList;