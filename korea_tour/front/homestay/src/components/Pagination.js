import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  //const classes = useStyles();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
    <div>
      <div>
        {pageNumbers.map(number => (
          <div key={number}>
            <div onClick={() => paginate(number)} >
              {number}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};


export default Pagination;
