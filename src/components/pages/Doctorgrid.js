import React, { Component, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Breadcrumbs from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/doctor-grid/Content';
import Header from '../layouts/Header';

const pagelocation = "Expert Care Areas";

// Class component (renamed)
class DoctorgridClass extends Component {
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
                    catId={this.props.catId}
                />
                <Footer />
            </Fragment>
        );
    }
}

// Wrapper function component using hooks
function Doctorgrid() {
    const { catId } = useParams();
    
    return <DoctorgridClass catId={catId} />;
}

export default Doctorgrid;