import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/home/Content';

const pagelocation = "Homepage";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Vaidya Bandhu</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </Helmet>
                <Header />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default Home;