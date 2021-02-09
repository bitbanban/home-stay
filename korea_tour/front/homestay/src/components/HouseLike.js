import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function HouseLike(props) {
    const [likeBtn, setLikeBtn] = useState(true);

    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];

    const addLike = async () => {
        try {
          const response = await axios.post(
            `http://localhost:9003/homestays/mark?homeStayNum=${houseNum}`
          ).then(res=>{console.log(res)});
    
          
        } catch (e) {
          console.log(e);
        }
      };
    
      const DeleteLike = async () => {
        try {
          const response = await axios.delete(
            `http://localhost:9003/homestays/mark?homeStayNum=${houseNum}`
          );
          console.log("삭제성공");
           
        } catch (e) {
          console.log(e);
          
        }
      };

   


    return (
        <div>
            <span>
                {
                    likeBtn === true
                    ? <span className="favorite" onClick={ ()=>{ setLikeBtn(!likeBtn);addLike();alert("즐겨찾기 추가했습니다!!") } }><FavoriteBorderIcon color="error"/></span>
                    : <span className="favorite" onClick={ ()=>{ setLikeBtn(!likeBtn);DeleteLike();alert("즐겨찾기 삭제했습니다..") } }><FavoriteIcon color="error" /></span>
                }
            </span>
        </div>
    );
}

export default HouseLike;