import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddUser } from "./Components/users/AddUser";
import { EditUser } from "./Components/users/EditUser";
import React from "react";
import { UserList } from "./Components/users/UserList";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add-user">
            <AddUser />
          </Route>
          <Route path="/edit-user">
            <EditUser />
          </Route>
          <Route path="/">
            <UserList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
