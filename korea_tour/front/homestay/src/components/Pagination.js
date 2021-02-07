import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      justifyContent:"center",
      display:'flex',
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function PaginationRounded(props) {
  const classes = useStyles();
  //const [currentPage, setPage] = React.useState(1);
  //const handleChange = (event, value) => {
  //  setPage(value);
  //}

  // <Pagination totalPages={totalPages} currentPage={currentPage}
  // onChange={handleChange} />

  return (
    <div className={classes.root}>
      
      <Pagination count={10}  variant="outlined" shape="rounded" />
    </div>
  );
}

