import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Searchform from './Searchform';
import Services from './Services';
import Whyus from './Whyus';
import Counter from './Counter';
import Servicesimage from './Servicesimage';
import Newsletter from './Newsletter';
import Clients from './Clients';
import Workprocess from './Workprocess';
import Team from './Team';
import Blogs from './Blogs';
import Testimonials from './Testimonials';
import Galleryslider from '../../layouts/Galleryslider';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <Searchform />

                <Services />
                <div className="section bg-secondary-1" >
                    <div className="container">
                        <Whyus />
                        <Counter />
                    </div>
                </div>
                <div style={{ marginTop: "150px" }}>
                    <Workprocess />
                </div>
                  <Testimonials />
              
                <div className="container-fluid p-0">
                    <Galleryslider />
                </div>
            </Fragment>
        );
    }
}

export default Content;