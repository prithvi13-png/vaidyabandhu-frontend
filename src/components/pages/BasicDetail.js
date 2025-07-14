import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../layouts/Header';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/basic-detail/Content';

const pagelocation = "Basic Details";

class BasicDetail extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>VaidyaBandhu</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </Helmet>
               <Header />
                <Breadcrumbs breadcrumb={{ pagename: pagelocation }} />
                <Content
                />
                <Footer />
            </Fragment>
        );
    }
}

export default BasicDetail;