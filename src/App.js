import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import "./css/tailwind.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import GuestRoute from "./components/common/GuestRoute";
import AuthRoute from "./components/common/AuthRoute";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/common/Layout";
import RoleForm from "./components/RoleForm";
import Roles from "./components/Roles";
import Users from "./components/Users";
import UsersEdit from "./components/UsersEdit";

function App() {
  return (
    <Router>
      <Layout>
        <div className="bg-gray-300 h-screen">
          <Switch>
            <GuestRoute path="/login" component={Login} />
            <GuestRoute path="/register" component={Register} />
            <AuthRoute path="/profile" component={Profile} />
            <AuthRoute path="/users/:id" component={UsersEdit} />
            <AuthRoute path="/users" component={Users} />
            <AuthRoute path="/roles/:id" component={RoleForm} />
            <AuthRoute path="/roles" component={Roles} />
          </Switch>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
