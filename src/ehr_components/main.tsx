import React, { Fragment, useState, useContext } from "react";
import Navigation from "./common_components/navigation";

import { Spinner } from "react-bootstrap";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";

import options from "./options";
import AutoComplete from "./common_components/autoComplete";

import PatientContext from "./patientContext";

import "react-bootstrap-typeahead/css/Typeahead.css";
import Search from "./search";
import NewPatient from "./newPatient";

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  return (
    <Fragment>
      <Navigation />
      <Search />
      <NewPatient />
    </Fragment>
  );
};

export default Main;
