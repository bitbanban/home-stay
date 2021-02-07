import React from 'react';
import { Link } from 'react-router-dom';
import HostBookDetail from './HostBookDetail';
import HostManageHouse from './HostManageHouse';
import HostMyBooks from './HostMyBooks';
import HostPenddingBooks from './HostPenddingBooks';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));
function HostMain(props) {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <Link to="/homestay/host/manage/house">
        <ListItem button>
          <ListItemText primary="집정보" />
        </ListItem>
      </Link>
      <Divider />
      <Link to="/homestay/host/manage/books">
        <ListItem button divider>
          <ListItemText primary="대기중인예약" />
        </ListItem>
      </Link>
      <Link to="/homestay/host/books">
        <ListItem button>
          <ListItemText primary="확정예약" />
        </ListItem>
      </Link>
    </List>
  );
}

export default HostMain;
