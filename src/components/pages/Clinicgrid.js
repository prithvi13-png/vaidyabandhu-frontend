import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../layouts/Headertwo';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/clinic-grid/Content';

const pagelocation = "Clinic Grid";

class Clinicgrid extends Component {
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
                    catId={this.props.match.params.catId}
                />
                <Footer />
            </Fragment>
        );
    }
}

export default Clinicgrid;