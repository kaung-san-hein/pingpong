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

function App() {
  return (
    <Router>
      <Layout>
        <div className="bg-gray-300 h-screen">
          <Switch>
            <GuestRoute path="/login" component={Login} />
            <GuestRoute path="/register" component={Register} />
            <AuthRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
