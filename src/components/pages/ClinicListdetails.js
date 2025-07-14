import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/clinic-list-details/Content';
import Header from '../layouts/Header';

const pagelocation = "Diagnostics Details";

class ClinicListdetails extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>VaidyaBandhu - Doctors Appointment Booking - Diagnostics details | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Breadcrumbs breadcrumb={{ pagename: pagelocation, lastPagePath: '/clinic-list', page: 'Diagnostics' }} />
                <Content
                    detailId={this.props.match.params.id}
                />
                <Footer />
            </Fragment>
        );
    }
}

export default ClinicListdetails;