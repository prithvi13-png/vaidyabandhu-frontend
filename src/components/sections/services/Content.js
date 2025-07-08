import React, { Component, Fragment } from 'react';
import Testimonials from './Testimonials';
import Galleryslider from '../../layouts/Galleryslider';
import { Link } from 'react-router-dom';
import serviceblock from '../../../data/service/service.json';
import { getFilteredPosts } from '../../../helper/serviceHelper';
import Pagination from "react-js-pagination";
import ServicesPreview from '../home/Services';
import HowToBecomeMember from './HowToBecomeMember';
import MembershipCardBenefits from '../home/MembershipCardBenefits';
import ClientLogosCarousel from '../home/ClientLogosCarousel';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getPosts(),
            activePage: 1,
            itemPerpage: 6
        }
    }
    getPosts() {
        var cat = this.props.catId ? this.props.catId : '';
        var filteredItems = getFilteredPosts(serviceblock, { cat });
        return filteredItems;
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    render() {
        const paginationData = this.state.data.slice((this.state.activePage - 1) * this.state.itemPerpage, this.state.activePage * this.state.itemPerpage).map((item, i) => {
            return <div className="col-lg-4 col-md-6" key={i}>
                <div className="sigma_service style-18 has-bg">
                    <div className="sigma_service-thumb">
                        <i className={item.icon} />
                    </div>
                    <div className="sigma_service-body">
                        <h5>
                            <Link to={"/service-details/" + item.id}>{item.title}</Link>
                        </h5>
                        <p>{item.shorttext.slice(0, 70)}</p>
                    </div>
                </div>
            </div>
        });
        return (
            <Fragment>
                <ServicesPreview/>
             <HowToBecomeMember/>
             <MembershipCardBenefits/>
               <ClientLogosCarousel/>
                <Testimonials />
            </Fragment>
        );
    }
}

export default Content;