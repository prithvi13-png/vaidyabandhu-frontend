import React, { Component } from 'react';

class Newsletter extends Component {
    render() {
        return (
            <div className="sigma_cta style-14">
                <div className="sigma_cta-content d-block d-sm-flex align-items-center">
                    <i className="flaticon-message" />
                    <h4 className="mt-3 mt-sm-0">Stay Informed with Vaidya Bandhu</h4>
                </div>
                <p className="text-white">Be part of a growing health-conscious community — free updates, always relevant.</p>
                <form>
                    <div className="input-group has-border">
                        <input type="email" name="email" placeholder="Email Address" required />
                        <div className="input-group-append">
                            <button type="button" className="light">
                                <i className="fal fa-envelope mr-2" />
                                Subscribe
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Newsletter;