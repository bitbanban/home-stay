import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function AddPerson(props) {
  const [count, setCount] = useState(1);
  const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let courseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getMaxPeople = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${courseNum}/maxpeople`
                );
                setContent(response.data);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getMaxPeople();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;
  return (
    <div>
      <span>인원 수</span>
      <IconButton
        color="primary"
        aria-label="remove"
        component="span"
        onClick={() => {
          setCount(count == 1 ? 1 : count - 1);
        }}
      >
        <RemoveIcon />
      </IconButton>
      <span id="peopleCount">{count}</span>

      <IconButton
        color="primary"
        aria-label="add"
        component="span"
        onClick={() => {
          setCount(count == content.maxPeople ? count : count + 1);
        }}
      >
        <AddIcon />
      </IconButton>
      <span id="maxPeople">최대 ({content.maxPeople}명)</span>
    </div>
  );
}

export default AddPerson;
