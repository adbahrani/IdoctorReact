import React, { useState, useEffect } from "react";

export interface InputProps {
  value: string;
  name: string;
  placeholder?: string;
  append?: string;
  type?: string;
  onChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  validateValue?: (value: string) => boolean;
  formatValue?: (value: string) => string;
  isFormSubmitted?: boolean;
  resetToggle?: boolean;
  classes?: string;
}

const Input = (props: InputProps) => {
  let {
    value,
    name,
    onChange,
    append = "",
    validateValue,
    formatValue,
    errorMessage,
    isFormSubmitted,
    resetToggle,
    classes
  } = props;

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      setTouched(true);
    }
  }, [isFormSubmitted]);

  useEffect(() => {
    setTouched(false);
  }, [resetToggle]);

  const showError = validateValue ? !validateValue(value) && touched : false;
  value = formatValue ? formatValue(value) : value;

  function _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(name, event);
  }

  function _onBlur() {
    setTouched(true);
  }

  function getInput() {
    return (
      <input
        {...props}
        className={`form-control ${showError ? "is-invalid" : ""} ${classes}`}
        onChange={_onChange}
        onInput={_onChange}
        onBlur={_onBlur}
        value={value}
      />
    );
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center w-100">
        {Boolean(append) ? (
          <div className="input-group">
            {getInput()}
            <div className="input-group-append">
              <span className="input-group-text">{append}</span>
            </div>
          </div>
        ) : (
          getInput()
        )}
        {showError && <small className="text-danger">{errorMessage}</small>}
      </div>
    </>
  );
};

export default Input;
