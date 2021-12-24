import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Home from "./components/Home";
import Main from "./components/Main";
import Loader from "./components/common_components/ui/Loader";
import Auth from "./landingPage/Auth";

import { AuthContextProvider } from "./store/auth-context";
import { useAuth } from "./hooks/auth-hook";

const App: React.FC = () => {
  const { userData, login, logout, checkedStorage } = useAuth();

  const reducers = combineReducers({
    toastr: toastrReducer
  });
  const store = createStore(reducers);

  let routes;
  if (userData?.token) {
    routes = (
      <Switch>
        <Route path="/main" component={Main} />
        <Redirect to="/main" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Auth} />
        <Route path="/signup" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  if (!checkedStorage) {
    return <Loader />;
  }

  return (
    <ReduxProvider store={store}>
      <AuthContextProvider
        value={{
          isLoggedIn: !!userData?.token,
          ...userData,
          login,
          logout
        }}
      >
        <div className="App">
          <Router>{routes}</Router>
        </div>
      </AuthContextProvider>
    </ReduxProvider>
  );
};

export default App;
