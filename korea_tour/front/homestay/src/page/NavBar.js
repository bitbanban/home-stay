import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import GoogleButton from 'components/GoogleButton';
import KakaoButton from 'components/KakaoButton';
import NaverButton from 'components/NaverButton';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { signOut } from '_actions/user';
import {changeArea} from "_actions/search"
import store from '_store/Store';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { data } from 'browserslist';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const NavBar = ({ signOut ,changeArea}) => {
  const classes = useStyles();
  const auth = store.getState().userReducer.auth;
  const host = store.getState().userReducer.host;
  const avatar = store.getState().userReducer.avatar;
  const [anchorEl, setAnchorEl] = useState(null);
  console.log(store.getState().searchReducer)
  const area = store.getState().searchReducer.area;
  const  checkin =store.getState().searchReducer.checkin;
  const  checkout= store.getState().searchReducer.checkout;
  const  count=store.getState().searchReducer.count;
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    signOut();
    setAnchorEl(null);
    console.log('로그아웃');
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          라온 홈스테이
        </Typography>
        <Paper>
        <InputBase
       className={classes.input}
       placeholder="장소"
       value={area}
       onChange={(e)=>{console.log(e.target.value) ;changeArea(e.target.value)}}
       inputProps={{ 'aria-label': '' }}
     />
      <InputBase
       className={classes.input}
       placeholder="체크인"
       value={checkin}
       inputProps={{ 'aria-label': '' }}
     />
      <InputBase
       className={classes.input}
       placeholder="체크아웃"
       value={checkout}
       inputProps={{ 'aria-label': '' }}
     />
     <InputBase
       className={classes.input}
       placeholder="인원"
       value={count}
       inputProps={{ 'aria-label': '' }}
     />
     <IconButton type="submit" className={classes.iconButton} 
      >
       <SearchIcon />
     </IconButton>
     </Paper>
        {!auth && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <KakaoButton />
              </MenuItem>
              <MenuItem>
                <NaverButton />
              </MenuItem>
              <MenuItem>
                <GoogleButton />
              </MenuItem>
            </Menu>
          </div>
        )}
        {auth && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt="avatar" src={avatar} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/homestay/mypage">마이페이지</Link>
              </MenuItem>
              {host == 'N' && (
                <MenuItem>
                  <Link to="/homestay/apply">호스트되기 </Link>
                </MenuItem>
              )}
              {host == 'Y' && (
                <MenuItem onClick={handleClose}>
                  <Link to="/homestay/host">호스트관리</Link>
                </MenuItem>
              )}
              <MenuItem onClick={logOut}>로그아웃</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default connect(null, dispatch => ({
  signOut: () => dispatch(signOut()),
  changeArea:()=>dispatch(changeArea(data))
}))(NavBar);
