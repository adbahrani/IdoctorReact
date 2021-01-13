import React, { useEffect, useState } from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./ehr_components/home";
import Search from "./ehr_components/search";
// import Home from "./ehr_components/search"

// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </div>
    </Router>
  );
};

export default App;
