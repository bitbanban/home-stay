import React from 'react';
import HouseInfo from './HouseInfo';
import HouseIntro from './HouseIntro';
import HouseService from './HouseService';

function DetailInfo(props) {
    return (
        <div>
            <HouseInfo />
            <HouseIntro />
            <HouseService />
        </div>
    );
}

export default DetailInfo;