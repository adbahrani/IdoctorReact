import React, { Fragment, useState, useContext } from "react";
import Navigation from "./common_components/navigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ReduxToastr, {
  reducer as toastrReducer,
  toastr
} from "react-redux-toastr";

import PatientContext from "./patientContext";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Search from "./search";
import NewPatient from "./newPatient";
import { Route, BrowserRouter as Router } from "react-router-dom";


export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const reducers = combineReducers({
    toastr: toastrReducer
  });
  const store = createStore(reducers);
  return (
    <Fragment>
      <Navigation />
      <Provider store={store}>
        <div>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            //  getState={state => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </div>
      </Provider>
      <Search />
      {/* <NewPatient />  */}
      {/* <Router>
        <div className="App">
          <Route path="/main" component={Search} />
          <Route path="/newPatient" component={NewPatient} />
        </div>
      </Router> */}
    </Fragment>
  );
};

export default Main;
