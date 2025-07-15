import React, { Component, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/doctor-details/Content';
import Header from '../layouts/Header';

const pagelocation = "Doctor Details";

// Class component (renamed)
class DoctordetailsClass extends Component {
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
                <Content
                    detailId={this.props.detailId}
                />
                <Footer />
            </Fragment>
        );
    }
}

// Wrapper function component using hooks
function Doctordetails() {
    const { id } = useParams();
    
    return <DoctordetailsClass detailId={id} />;
}

export default Doctordetails;