import React from 'react';
import DetailInfoReservation from './DetailInfoReservation';
import DetailMap from './DetailMap';
import DetailPhotos from './DetailPhotos';
import HouseCarousel from './HouseCarousel';
import HouseHeader from './HouseHeader';
import ReviewList from './ReviewList';


function HouseDetail(props) {
    return (
        <div>
            홈디테일
            {/* header */}

            {/* 집이름,즐겨찾기,별점 */}
            <HouseHeader />
                {/* <HouseName /> */}
                {/* <HouseLike> */}
                {/* <HouseStarAvg> */}

            {/* 사진 DetailPhotos */}
            <DetailPhotos />
            
            {/* DetailInfoReservation */}
            <DetailInfoReservation />
                {/* DetailInfo */}
                    {/* HouseInfo */}
                    {/* HouseIntro */}
                    {/* HouseService */}
                {/* DetailReservation */}
                    {/* CalendarCheckIn */}
                    {/* AddPerson */}

            {/* ReviewList */}
            <ReviewList />
                {/* ReviewStarAvg */}
                {/* Review */}

            {/* DetailMap */}
            <DetailMap />
            
            

            {/* Footer */}
        </div>
    );
}

export default HouseDetail;