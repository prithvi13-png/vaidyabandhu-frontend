import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import category from "../../data/category.json";

class Blogsidebar extends Component {
    render() {
        return (
            <div className="sidebar mb-5">
                {/* Category Widget */}
                <div className="widget widget-categories">
                    <h5 className="widget-title">Categories</h5>
                    <ul>
                        {/* Data */}
                        {category.map((item, i) => (
                            <li key={i}>
                                <Link to={"/blog/cat/" + item.id}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        {/* Data */}
                    </ul>
                </div>
                <div className="widget">
                    <h5 className="widget-title">Recent Posts</h5>
                    <div className="recent-posts">
                        <div className="recent-post-item">
                            <Link to="/blog-details/1">Latest Blog Post</Link>
                            <span className="post-date">March 15, 2023</span>
                        </div>
                        <div className="recent-post-item">
                            <Link to="/blog-details/2">Health Tips</Link>
                            <span className="post-date">March 10, 2023</span>
                        </div>
                    </div>
                </div>
                <div className="widget">
                    <h5 className="widget-title">Tags</h5>
                    <div className="tag-cloud">
                        <Link to="/blog/tag/health" className="tag">Health</Link>
                        <Link to="/blog/tag/medical" className="tag">Medical</Link>
                        <Link to="/blog/tag/wellness" className="tag">Wellness</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Blogsidebar;