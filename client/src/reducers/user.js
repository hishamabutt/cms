import { USER_FAIL, USER_SUCCESS, CLEAR_USER } from '../actions/types';
const initialState = {
  file: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_SUCCESS:
      return {
        ...state,
        file: payload,
        loading: false,
      };

    case USER_FAIL:
      return {
        ...state,
        file: null,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        file: null,
        loading: true,
      };
    default:
      return state;
  }
}
