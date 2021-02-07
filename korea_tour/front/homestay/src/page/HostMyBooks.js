import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyBookRow from 'components/MyBookRow';
import { withRouter } from 'react-router-dom';
function HostMyBooks({ history }) {
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fatchData = async (userNum, currentPage) => {
      // 승인된 예약
      const approval = 2;
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:9003/homestays/reservation/${userNum}/${approval}/${currentPage}`
        );
        setContents(response.data.list);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fatchData(200, 1);
  }, []);

  if (loading) {
    return <p>대기중....</p>;
  }
  //articles 값이 설정되지 않았을때
  if (!contents) {
    return null;
  }
  // articles 값이 유효할때
  let appoval = contents.appoval;

  return (
    <div>
      호스트 승인된 예약
      <table>
        <thead>
          <tr>
            <th>예약자</th>
            <th>인원</th>
            <th>체크인시간</th>
            <th>체크아웃시간</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(content => (
            <MyBookRow
              key={content.homeStayReservationNum}
              content={content}
              history={history}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HostMyBooks;
