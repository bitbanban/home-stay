import React from 'react';
import HouseName from './HouseName';
import HouseLike from './HouseLike';
import HouseStarAvg from './HouseStarAvg';
import './HouseDetailCss/HouseName.css';
import HouseAddr from './HouseAddr';

function HouseHeader(props) {
    return (
        <div>
            <HouseName />
            <div id="infoBox">
                <HouseStarAvg />
                <HouseAddr/>
                <HouseLike />
            </div>
        </div>
    );
}

export default HouseHeader;