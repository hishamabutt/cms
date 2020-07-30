import axios from 'axios';
// import { UPLOAD_REPORT, UPLOAD_REPORT_FAIL } from './types';
import { setAlert } from './alert';

//Login
export const uploadReport = (key, file) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      //   'Content-Type': 'application/json',
    },
  };

  const formData = new FormData();
  formData.append('file', file);
  formData.append('key', key);
  //   const body = {
  //     key: JSON.stringify({ key }),
  //     formData,
  //   };
  //   const body = JSON.stringify({ key });
  try {
    const res = await axios.post('api/file/upload', formData, config);
    dispatch(setAlert(res.data, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
