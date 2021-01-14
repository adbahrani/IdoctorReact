import React, { Fragment, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";
import options from "./options";
import "react-bootstrap-typeahead/css/Typeahead.css";

function AutoComplete(props) {
  const [focus, setCount] = useState(false);

  return (
    <Fragment>
      <Typeahead
        id="onclear-example"
        options={options}
        placeholder={"Search " + props.title}
        onFocus={() => setCount(true)}
        onBlur={() => setCount(false)}
      >
        {({ onClear, selected }) => (
          <div className="rbt-aux">
            {selected.length > 0 && <ClearButton onClick={onClear} />}
            {focus && !selected.length && (
              <Spinner animation="grow" size="sm" />
            )}
          </div>
        )}
      </Typeahead>
    </Fragment>
  );
}

export default AutoComplete;
