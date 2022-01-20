import React, { Fragment, useContext } from "react";
import Navigation from "./common_components/navigation";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import Search from "./Search";
import History from "./PatientHistory/History";
import NewVisit from "./Visits/NewVisit";
import NewPatient from "./PatientUpdates/NewPatient";
import Visits from "./Visits/";
import Account from "./Account/";
import Reactivate from "./Reactivate";
import Reports from "./Reports";
import Script from "./Script/";

import { HiStatusOnline } from "react-icons/hi";
import { RiWifiOffLine } from "react-icons/ri";

import { AuthContext } from "../store/auth-context";
import ReduxToastr from "react-redux-toastr";

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const authContext = useContext(AuthContext);
  const { path } = useRouteMatch();

  return (
    <Fragment>
      <Navigation />
      <ReduxToastr
        timeOut={8000}
        newestOnTop={true}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />

      {authContext.isDeactivated ? (
        <Reactivate />
      ) : (
        <>
          {window.navigator.onLine ? null : (
            // <p className="text-">
            //   Live
            //   <HiStatusOnline className="text-success mx-2" size={25} />
            // </p>
            <p>
              Offline Mode
              <RiWifiOffLine className="text-warning mx-2" size={20} />
            </p>
          )}
          <Switch>
            <Route path={`${path}/search`} component={Search} />
            <Route path={`${path}/history`} component={History} />
            <Route path={`${path}/visits`} component={Visits} />
            <Route path={`${path}/newVisit`} component={NewVisit} />
            <Route path={`${path}/newPatient`} component={NewPatient} />
            <Route path={`${path}/account`} component={Account} />
            <Route path={`${path}/reports`} component={Reports} />
            <Route path={`${path}/script`} component={Script} />
            <Redirect to={`${path}/search`} />
          </Switch>
        </>
      )}
    </Fragment>
  );
};

export default Main;
