import { GET_ALL_TESTS, GET_ALL_TESTS_FAIL } from '../actions/types';
const initialState = {
  testDetails: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TESTS:
      return {
        ...state,
        testDetails: payload,
        loading: false,
      };

    case GET_ALL_TESTS_FAIL:
      return {
        ...state,
        testDetails: null,
        loading: false,
      };

    default:
      return state;
  }
}
