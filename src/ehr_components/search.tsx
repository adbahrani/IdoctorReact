import React, { Fragment, useState } from "react";
import Navigation from "./navigation";

import { Spinner } from "react-bootstrap";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";

import options from "./options";
import AutoComplete from "./autoComplete";

import "react-bootstrap-typeahead/css/Typeahead.css";
// import "./styles.css";

const Search: React.FC = () => {
  const [fouce, setCount] = useState(false);

  return (
    <Fragment>
      <Navigation />
      <div className="container pt-2">
        <button className="bttn-custom">Add New Patient</button>
        <br />
        <br />
        <AutoComplete title={"Patient Name"} />
        <br />
        <AutoComplete title={"Patient DOB"} />
        <br />
        <AutoComplete title={"Patient Phone Number"} />
      </div>

      <br />
      <button className="bttn-custom" disabled={true}>Search</button>
    </Fragment>
  );
};

export default Search;
