import React from 'react';
import { Route } from 'react-router-dom';
import Home from 'page/Home';
import HostForm from 'page/HostForm';
import HouseDetail from 'components/HouseDetail';
import ReservationConfirm from 'components/ReservationConfirm';
import ReviewForm from 'page/ReviewForm';
import ReservationList from 'page/ReservationList';
import ReservationDetail from 'page/ReservationDetail';
import HostPenddingBooks from 'page/HostPenddingBooks';
import HostBookDetail from 'page/HostBookDetail';
import HostManageHouse from 'page/HostManageHouse';
import HostMain from 'page/HostMain';
import HostMyBooks from 'page/HostMyBooks';
import HouseListFeatured from 'components/HouseListFeatured';

import AdminHouseDetail from 'components/AdminHouseDetail';

function RouteMain(props) {
  return (
    <div>
      {/* 네브바 */}

      {/* 메인 */}
      <Route exact path="/homestay" component={Home} />
      {/* 홈스테이 신청폼 */}
      <Route path="/homestay/apply" component={HostForm} />
      {/* 집목록 */}
      <Route path="/homestay/houselistfeatured" component={HouseListFeatured} />
      {/* 관리자페이지 */}
      <Route
        path="/homestay/adminhousedetail/:num"
        component={AdminHouseDetail}
      />
      {/* 집상세 및 예약 */}
      <Route path="/homestay/housedetail" component={HouseDetail} />
      <Route
        path="/homestay/reservationconfirm"
        component={ReservationConfirm}
      />
      {/* 마이페이지 */}
      <Route path="/homestay/mypage/review/:num" component={ReviewForm} />
      <Route path="/homestay/mypage/Reservation" component={ReservationList} />
      <Route
        path="/homestay/mypage/Reservation/:num"
        component={ReservationDetail}
      />
      {/* 호스트페이지 */}
      <Route path="/homestay/host" component={HostMain} />
      <Route exact path="/homestay/host/books" component={HostMyBooks} />
      <Route path="/homestay/host/manage/books" component={HostPenddingBooks} />
      <Route path="/homestay/host/books/:num" component={HostBookDetail} />
      <Route path="/homestay/host/manage/house" component={HostManageHouse} />
    </div>
  );
}

export default RouteMain;
