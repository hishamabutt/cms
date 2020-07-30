import { GET_ALL_DOCTORS, GET_ALL_DOCTORS_FAIL } from '../actions/types';
const initialState = {
  name: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_DOCTORS:
      return {
        ...state,
        name: payload,
        loading: false,
      };

    case GET_ALL_DOCTORS_FAIL:
      return {
        ...state,
        name: null,
        loading: false,
      };

    default:
      return state;
  }
}
