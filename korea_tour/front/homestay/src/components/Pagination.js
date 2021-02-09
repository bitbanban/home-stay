import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      
    },
  },
}));


const Paginationrounded = (postsPerPage, totalPosts, paginate) => {
  const classes = useStyles();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className={classes.root}>
      {pageNumbers.map(number => (
        <div key={number} className="page-item">
      <Pagination  onClick={() => paginate(number)} className="page-link" variant="outlined" shape="rounded" />
      {number}
        </div>
           
          ))}
      </div>
    </div>

    
  );
};

export default Pagination;
