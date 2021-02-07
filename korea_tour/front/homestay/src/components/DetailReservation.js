import React from 'react';
import AddPerson from './AddPerson';
import CalendarCheckIn from './CalendarCheckIn';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function DetailReservation(props) {
    return (
        <div>
            <h3>요금을 확인하려면 날짜를 입력하세요</h3>
                <div><CalendarCheckIn /></div>
                <div><AddPerson /></div>
                <Link to="/homestay/reservationconfirm" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary">
                        예약하기
                    </Button>
                </Link>
        </div>
    );
}

export default DetailReservation;