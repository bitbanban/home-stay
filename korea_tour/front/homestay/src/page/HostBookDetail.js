import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
function HostBookDetail({ match, history }) {
  const { num } = match.params;
  const bookNum = num.split('=')[1];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fatchData = async bookNum => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:9003/homestays/reservation/${bookNum}`
        );
        setData(response.data.detail);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fatchData(bookNum);
  }, []);

  if (loading) {
    return <p>대기중....</p>;
  }
  //articles 값이 설정되지 않았을때
  if (!data) {
    return null;
  }
  // articles 값이 유효할때
  let appoval = data.appoval;

  return (
    <div>
      <div className="guestInfo">
        <span>이름 :{data.name}</span> 생년월일: {data.birthYear}년
        {data.birthMonth}월 {data.birthDay}성별:
        {data.gender == 'M' ? '남자' : '여자'}이메일: {data.email1}@
        {data.email2}
      </div>
      <div className="bookInfo">
        체크인일자:{data.checkInDay} 체크아웃일자: {data.checkOutDay}인원:
        {data.numberOfPeople}금액:{data.totalPrice}
      </div>
      <Button type="button" onClick={history.goBack}>
        목록으로
      </Button>
    </div>
  );
}

export default HostBookDetail;
