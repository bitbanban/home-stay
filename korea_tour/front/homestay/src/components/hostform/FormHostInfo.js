import React from 'react';
import { Button, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DaumPostcode from 'react-daum-postcode';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function FormHostInfo(props) {
  const [hostInfo, setHostInfo] = props.info;

  const handleChange = e => {
    setHostInfo({ ...hostInfo, [e.target.name]: e.target.value });
  };
  const handleCreataeMap = data => {
    setHostInfo({ ...hostInfo, addr1: data.address });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        주소검색
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">주소검색</DialogTitle>
        <DialogContent>
          <DialogContentText>
            홈스테이를 등록할 집의 주소를 입력해주세요!
          </DialogContentText>
          <DaumPostcode onComplete={handleCreataeMap} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        label="주소"
        margin="normal"
        value={hostInfo.addr1}
        name="addr1"
        onChange={handleChange}
      />
      <TextField
        label="상세주소"
        margin="normal"
        value={hostInfo.addr2}
        name="addr2"
        onChange={handleChange}
      />
      <TextField
        label="email"
        margin="normal"
        value={hostInfo.email1}
        name="email1"
        onChange={handleChange}
      />
      <TextField
        label="도메인"
        margin="normal"
        value={hostInfo.email2}
        name="email2"
        onChange={handleChange}
      />
      <InputLabel id="domain">선택하세요</InputLabel>
      <Select
        labelId="domain"
        id="domain-select"
        value={hostInfo.email2}
        name="email2"
        onChange={handleChange}
      >
        <MenuItem value="gmail.com">gmail.com</MenuItem>
        <MenuItem value="naver.com">naver.com</MenuItem>
        <MenuItem value="hanmail.net">hanmail.net</MenuItem>
        <MenuItem value="nate.com">nate.com</MenuItem>
        <MenuItem>직접입력</MenuItem>
      </Select>
      <TextField
        label="연락처"
        margin="normal"
        value={hostInfo.hp}
        name="hp"
        onChange={handleChange}
      />
    </div>
  );
}
