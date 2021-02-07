import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PetsIcon from '@material-ui/icons/Pets';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LocalParking from '@material-ui/icons/LocalParking';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import Kitchen from '@material-ui/icons/Kitchen';
import EmojiFoodBeverage from '@material-ui/icons/EmojiFoodBeverage';
import AcUnit from '@material-ui/icons/AcUnit';
import Wc from '@material-ui/icons/Wc';
import Bathtub from '@material-ui/icons/Bathtub';
import Wifi from '@material-ui/icons/Wifi';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FormConfirm(props) {
  const [value, setValue] = React.useState(0);

  const hostInfo = props.info;
  const houseIntro = props.intro;
  const [amenities, setAmenities] = props.amenity;
  const houseRules = props.rules;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="호스트 정보" {...a11yProps(0)} />
          <Tab label="숙소 정보" {...a11yProps(1)} />
          <Tab label="홈스테이 소개" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {hostInfo.addr1}
        {hostInfo.addr2}
        {hostInfo.email1}@{hostInfo.email2}
        {hostInfo.hp}
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {houseRules.checkIn}
        {houseRules.checkOut}
        {amenities.dogOk ? (
          <span>
            <PetsIcon />
            반려동물동반
          </span>
        ) : (
          ''
        )}
        {amenities.wifi ? <Wifi /> : ''}
        {amenities.smokingOk ? <SmokingRoomsIcon /> : <SmokeFreeIcon />}
        {amenities.bathroom ? <Wc /> : ''}
        {amenities.parking ? <LocalParking /> : ''}
        {amenities.towel ? <Bathtub /> : ''}
        {amenities.breakfast ? <EmojiFoodBeverage /> : ''}
        {amenities.aircon ? <AcUnit /> : ''}
        {amenities.elecProduct ? <OfflineBolt /> : ''}
        {amenities.kitchen ? <Kitchen /> : ''}
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {houseIntro.title}
        {houseIntro.content}
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </TabPanel>
    </div>
  );
}
