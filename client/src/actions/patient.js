import axios from 'axios';
import { setAlert } from './alert';
// import {} from './types';

//Login
export const addPatient = (
  name,
  mobileNo,
  age,
  sex,
  totalBill,
  discount,
  referedBy,
  tests
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    name,
    mobileNo,
    age,
    sex,
    totalBill,
    discount,
    referedBy,
    tests,
  });
  try {
    const res = await axios.post('/api/user', body, config);
    dispatch(setAlert(res.data, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// //LOGOUT
// export const logout = () => (dispatch) => {
//   dispatch({ type: LOGOUT });
// };
