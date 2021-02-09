import axios from 'axios';
import {
  CHANGE_AREA,
  CHANGE_CHECKIN,
  CHANGE_CHECKOUT,
  CHANGE_COUNT,
} from './types';

export function changeArea(area) {
  return {
    type: CHANGE_AREA,
    area
  };
}

export function changeCheckin(checkin) {
  return {
    type: CHANGE_CHECKIN,
    checkin
  };
}

export function changeCheckout(checkout) {
  return {
    type: CHANGE_CHECKOUT,
    checkout
  };
}

export function changeCount(count) {
  return {
    type: CHANGE_COUNT,
    count
  };
}

