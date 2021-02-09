import React from 'react';
import HouseCarousel from './HouseCarousel';
import './HouseDetailCss/DetailPhotos.css';
import CancelIcon from '@material-ui/icons/Cancel';


function HouseModal(props) {
    return (
        <div id="mainModal">
            <h1 id="cancelIconBox" onClick={ ()=> { props.setModal(false) } }>
                <CancelIcon id="cancelIcon"/>
            </h1>
            <HouseCarousel />
        </div>
    );
}

export default HouseModal;