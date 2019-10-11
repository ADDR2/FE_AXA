import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LandingContainer from './containers/LandingContainer';

export default () => {
  return (
    <Router>
        <Switch>
            <Route path="/home">
                <LandingContainer />
            </Route>
            <Route path="*">
                <Redirect to="/home"/>
            </Route>
        </Switch>
    </Router>
  );
};