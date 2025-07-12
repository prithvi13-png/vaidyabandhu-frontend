import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/services/Content';

const pagelocation = "Bandhu Seva";

class Services extends Component {
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

export default Services;