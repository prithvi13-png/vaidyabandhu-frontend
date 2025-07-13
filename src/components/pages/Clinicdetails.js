import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../layouts/Headertwo';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/clinic-details/Content';

const pagelocation = "Clinic Details";

class Clinicdetails extends Component {
    render() {
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
                <Content
                    detailId={this.props.match.params.id}
                />
                <Footer />
            </Fragment>
        );
    }
}

export default Clinicdetails;