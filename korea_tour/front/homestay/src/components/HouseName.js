import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '_utils/api';




function HouseName(props) {
    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];
    //console.log(courseNum);

    
    useEffect( () => {
        const getTitle = async () =>{
            try{
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `${URL}/${houseNum}/name`
                    );
                    setContent(response.data);
                    console.log(response.data);
            } catch (e){
                setError(e);
            }
            setLoading(false);
        };
        getTitle();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.</p>;
    if (!content) return null;
    
     

    return (
        <div>
            <h1>{content.title}</h1>
        </div>
    );
    

}
export default HouseName;