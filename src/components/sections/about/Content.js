import React, { Component, Fragment } from 'react';
import Counter from './Counter';
import Team from './Team';
import Whyus from './Whyus';
import Workprocess from './Workprocess';
import Galleryslider from '../../layouts/Galleryslider';
import LeadershipInline from './Leadership';
import OurStory from './Ourstory';
import WhoCanBenefit from './Benifit';

class Content extends Component {
    render() {
        return (
            <Fragment>
                 <LeadershipInline />
                  <OurStory/>
                     <div className="section bg-secondary-1" >
                    <div className="container">
                        <Whyus />
                        <Counter />
                    </div>
                </div>
              
           
                  <Workprocess />
            
                    <WhoCanBenefit/>
            
            </Fragment>
        );
    }
}

export default Content;