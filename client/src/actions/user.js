import axios from 'axios';
import { USER_FAIL, USER_SUCCESS, CLEAR_USER } from './types';
import { setAlert } from './alert';

//Login
export const getReport = (key, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ key, password });
  try {
    const res = await axios.post('/api/file/report', body, config);
    if (res.data === 'Report is not ready yet') {
      dispatch(setAlert(res.data, 'danger'));
    } else {
      dispatch({ type: USER_SUCCESS, payload: res.data });
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USER_FAIL });
  }
};

export const clearUser = () => async (dispatch) => {
  dispatch({ type: CLEAR_USER });
};
