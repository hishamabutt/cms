import React, { useEffect } from 'react';
import NavbarComponent from './components/layout/NavbarComponent';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Report from './components/report/Report';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadAdmin } from './actions/auth';

import './App.css';
import Dashboard from './components/dasboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AddDoctor from './components/dasboard/AddDoctor';
import AddTest from './components/dasboard/AddTest';
import UploadFile from './components/dasboard/UploadFile';
import AddUser from './components/dasboard/AddUser';
import PrintInvoice from './components/dasboard/PrintInvoice';
import Invoice from './components/dasboard/Invoice';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadAdmin());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <NavbarComponent />
          <Route exact path='/' component={Landing}></Route>
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/report' component={Report}></Route>
              <PrivateRoute
                exact
                path='/dashboard'
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/adddoctor'
                component={AddDoctor}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/addtest'
                component={AddTest}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/uploadreport'
                component={UploadFile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/adduser'
                component={AddUser}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/printinvoice'
                component={PrintInvoice}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/previewinvoice'
                component={Invoice}
              ></PrivateRoute>
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
