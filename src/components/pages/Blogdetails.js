import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headertwo';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/blog-details/Content';

const pagelocation = "Blog Details";

class Blogdetails extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>VaidyaBandhu - Doctors Appointment Booking - React Template | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
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

export default Blogdetails;