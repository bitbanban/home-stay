import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ListRow from "components/ListRow";

const LikeList  =()=> {
    

    const [likeList,setLikeList] = useState(null);
    const [loading,setLoading] = useState(false);

   useEffect(() =>{
       // async를 사용하는 함수 따로 선언
       const fatchData = async ()=> {
           setLoading(true);
           try {
               const response = await axios.get(
                   'http://localhost:9003/homestays/mypage/marks/681/1'
               );
               setLikeList(response.data.marks);
               console.log(response.data.marks)
           } catch (e) {
               console.log(e);
           }
           setLoading(false);
       };
       fatchData();
   }, []); 

   if (loading) {
       return <p>대기중....</p>;
   }
   //articles 값이 설정되지 않았을때
   if (!likeList) {
    return null;
   }
   // articles 값이 유효할때   
        return (
           <div>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <b>좋아요 리스트</b>
           <div className="like-List">
               {likeList.map((likeList,index)=>
              (<ListRow
                likeNum ={likeList.homeStayMarkNum}
                homeStayNum = {likeList.homeStayNum}
                title = {likeList.title}
                hostNum ={likeList.hostNum}
                hostName = {likeList.hostName}
                addr={likeList.addr1}
                photo={likeList.homeStayPhoto}
                star={likeList.avgOfStars}
                key={index}
              />) 
               )}
              
           </div>
           </div>
        );
    
}
export default LikeList;