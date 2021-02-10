import React from 'react';
import { Route } from 'react-router-dom';
import Home from 'page/Home';
import HostForm from 'page/HostForm';
import HouseDetail from 'components/HouseDetail';
import ReservationConfirm from 'components/ReservationConfirm';
import ReviewForm from 'page/ReviewForm';
import ReservationList from 'page/ReservationList';
import ReservationDetail from 'page/ReservationDetail';
import Mypage from 'page/Mypage';
import LikeList from 'page/LikeList';
import MyReviewList from 'page/MyReviewList';
import MyWriteReview from 'page/MyWriteReview';
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
      <Route exact path="/" component={Home} />
      {/* 홈스테이 신청폼 */}
      <Route path="/apply" component={HostForm} />
      {/* 집목록 */}
      <Route
        path="/search/:area/:checkin/:checkout/:guest"
        component={HouseListFeatured}
      />
      {/* 관리자페이지 */}
      <Route path="/admin/house/:num" component={AdminHouseDetail} />
      {/* 집상세 및 예약 */}
      <Route path="/house/:num" component={HouseDetail} />
      <Route path="/reservation/:loginNum/:homeStayNum/:checkInDay/:checkOutDay/:numberOfPeople/:totalPrice" component={ReservationConfirm} />
      {/* 마이페이지 */}
      <Route path="/mypage" component={Mypage} />
      <Route exact path="/mypage/review" component={MyReviewList} />
      <Route exact path="/mypage/myreview" component={MyWriteReview} />
      <Route path="/mypage/review/:num/:num" component={ReviewForm} />
      <Route exact path="/mypage/like" component={LikeList} />
      <Route exact path="/mypage/reservation" component={ReservationList} />
      <Route path="/mypage/reservation/:num" component={ReservationDetail} />
      {/* 호스트페이지 */}
      <Route path="/host" component={HostMain} />
      <Route exact path="/host/books" component={HostMyBooks} />
      <Route path="/host/manage/books" component={HostPenddingBooks} />
      <Route path="/host/books/:num" component={HostBookDetail} />
      <Route path="/host/manage/house" component={HostManageHouse} />
    </div>
  );
}

export default RouteMain;
