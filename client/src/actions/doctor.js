import axios from 'axios';
import { GET_ALL_DOCTORS_FAIL, GET_ALL_DOCTORS } from './types';
import { setAlert } from './alert';

//Login
export const addDoctor = (name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name });
  try {
    const res = await axios.post('/api/doctor', body, config);
    dispatch(setAlert(res.data, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

//Login
export const getAllDoctors = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/doctor');
    dispatch({ type: GET_ALL_DOCTORS, payload: res.data });
  } catch (err) {
    dispatch(GET_ALL_DOCTORS_FAIL);
  }
};
