import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../layouts/Header';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Content from '../sections/about/Content';
import Footer from '../layouts/Footer';

const pagelocation = "About Vaidya Bandhu";

class About extends Component {
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
                <Content />
               <Footer/>
            </Fragment>
        );
    }
}

export default About;