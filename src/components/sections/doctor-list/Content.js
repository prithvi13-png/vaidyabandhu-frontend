import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '../../../helper/helper';
// import Sidebar from '../../layouts/Doctorsidebar';
import Pagination from "react-js-pagination";
import axios from 'axios';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],       // Departments from API
            activePage: 1,
            itemPerpage: 3,
            loader: false,
        };
    }

    componentDidMount() {
        this.fetchDepartments();
        this.setState({ loader: true });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
    }

    fetchDepartments = async () => {
        this.setState({ loader: true });
        try {
            const response = await axios.get('http://3.27.214.105/api/doctors/');
            // Use `data.data` from the API structure
            this.setState({ departments: response.data.data, loader: false });
            console.log('Departments:', response.data.data);
        } catch (error) {
            this.setState({ loader: false });
            console.error('Error fetching departments:', error);
        }
    }

    render() {
        const { departments, activePage, itemPerpage } = this.state;

        const indexOfLastItem = activePage * itemPerpage;
        const indexOfFirstItem = indexOfLastItem - itemPerpage;
        const currentDepartments = departments.slice(indexOfFirstItem, indexOfLastItem);

        console.log('Current Departments:', currentDepartments);

        return (
            <div className="sidebar-style-9">
                <div className="section section-padding">
                    <div className="container">
                        <div className="row">
                            { this.state.loader ? (<div className="col-lg-12 text-center">Fetching doctor list...</div>) : 
                                (<div className="col-lg-8">
                                    {currentDepartments?.map((item) => (
                                        <div className="sigma_team style-17" key={item.id}>
                                            <div className="row no-gutters">
                                                <div className="col-md-3">
                                                    <div className="sigma_team-thumb">
                                                        <img src={process.env.PUBLIC_URL + "/" + item.photo} alt={item.name} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5 col-sm-6">
                                                    <div className="sigma_team-body">
                                                        <h5>
                                                            <Link to={"/doctor-details/" + item.id}>{item.name}</Link>
                                                        </h5>
                                                        <div className="sigma_team-categories">
                                                            {item?.speciality?.map((item, index) => (
                                                                 <Link to={"/doctor-details/" + item.id} className="sigma_team-category">{item.description}{index !== item?.speciality?.length - 1 && ', '}</Link>
                                                            ))}
                                                        </div>
                                                        <p>{item.qualification}</p>
                                                        <div className="d-flex align-items-center mt-4">
                                                            <Link to={"/doctor-details/" + item.id} className="sigma_btn">View More</Link>
                                                            <div className="sigma_team-controls ml-3">
                                                                <Link to="#" className={this.state.favorite === item ? 'active' : ''} onClick={(e) => this.favoriteTrigger(item)}>
                                                                    <i className="fal fa-heart" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-6">
                                                    <div className="sigma_team-footer">
                                                        <div className="sigma_team-info">
                                                            <span>
                                                                <i className="fal fa-map-marker-alt" />
                                                                {item?.location || 'Not specified'}
                                                            </span>
                                                            <span>
                                                                <i className="fal fa-award" />
                                                                {item.experience} Yrs Experience
                                                            </span>
                                                            <span>
                                                                <i className="fal fa-calendar" />
                                                                {item?.available?.map((data, i) => (
                                                                    <b key={i}>{data}, </b>
                                                                ))}
                                                            </span>
                                                        </div>
                                                        <div className="sigma_rating">
                                                            {Rating(item.rating || 0)}
                                                            <span className="ml-3">({item?.reviews?.length})</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Pagination */}
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemPerpage}
                                        totalItemsCount={departments.length}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                        innerClass="pagination"
                                        activeClass="active"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
