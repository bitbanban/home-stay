import React from 'react';
import HouseName from './HouseName';
import HouseLike from './HouseLike';
import HouseStarAvg from './HouseStarAvg';
import './HouseDetailCss/HouseName.css';
import HouseAddr from './HouseAddr';
import HouseShare from './HouseShare';

function HouseHeader(props) {
    return (
        <div>
            <HouseName />
            <div id="infoBox">
                <div className="infoBox__sub">
                    <span id="houseStar__span"><HouseStarAvg /></span>
                    <HouseAddr/>
                </div>
                <div className="infoBox__sub">
                    <HouseShare />
                    <HouseLike />
                </div>
            </div>
        </div>
    );
}

export default HouseHeader;