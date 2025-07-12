import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/doctor-grid/Content';
import Header from '../layouts/Header';

const pagelocation = "Expert Care Areas";

class Doctorgrid extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>VaidyaBandhu</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
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

export default Doctorgrid;