import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

function HouseLike(props) {
    return (
        <div>
            <span>
                <span id="share"><ShareIcon color="error"/></span>
                <span id="favorite"><FavoriteIcon color="error" /></span>
            </span>
        </div>
    );
}

export default HouseLike;