import axios from 'axios';
import { GET_ALL_TESTS_FAIL, GET_ALL_TESTS } from './types';
import { setAlert } from './alert';

//Login
export const addTest = (name, price) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, price });
  try {
    const res = await axios.post('/api/test', body, config);
    dispatch(setAlert(res.data, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

//Login
export const getAllTests = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/test');
    dispatch({ type: GET_ALL_TESTS, payload: res.data });
  } catch (err) {
    dispatch(GET_ALL_TESTS_FAIL);
  }
};
