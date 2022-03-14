import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import Auth from "./components/Pages/Auth/Auth";
import Browse from "./components/Pages/Browse/Browse";
import Dashboard from "./components/UI/Dashboard";
import Title from "./components/Pages/Title/Title";
import User from "./components/Pages/User/User";
import CreateUser from "./components/Pages/User/CreateUser";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/auth" />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/users" exact>
        <User />
      </Route>
      <Route path="/users/create">
        <CreateUser />
      </Route>
      <Dashboard>
        <Route path="/browse">
          <Browse />
        </Route>
        <Route path="/browse/:id" exact>
          <Title />
        </Route>
        <Route path="/media/:media" exact>
          <Browse />
        </Route>
      </Dashboard>
    </Switch>
  );
};

export default App;
