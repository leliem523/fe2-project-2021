import React from 'react';
import '../Styles/TopSectionStyle.css';
import '../Scripts/topsection.js';

import TopHeader from './TopHeader';
import Nav from './Nav';
import Intro from './Intro';
import Links from './Links';

const TopSection = () => {
    return (
        <div className="top-section">
            <TopHeader />
            <Nav />
            <Intro />
            <Links />
        </div>
    )
}

export default TopSection;