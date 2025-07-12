import React, { Component, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/services/Content';

const pagelocation = "Bandhu Seva";

// Class component (renamed)
class ServicesClass extends Component {
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
                    catId={this.props.catId}
                />
                <Footer />
            </Fragment>
        );
    }
}

// Wrapper function component using hooks
function Services() {
    const { catId } = useParams();
    
    return <ServicesClass catId={catId} />;
}

export default Services;