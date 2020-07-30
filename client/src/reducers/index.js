import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import doctor from './doctor';
import test from './test';

export default combineReducers({ alert, auth, user, doctor, test });
