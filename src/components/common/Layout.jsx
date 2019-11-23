import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";

function Layout(props) {
  const handleLogout = event => {
    event.preventDefault();
    cookie.remove("token");
    props.logout();
  };
  return (
    <div>
      <nav className="flex justify-between">
        <h1 className="py-4 mx-10">PingPong Authentication</h1>
        <div className="flex justify-between">
          {!props.loggedIn ? (
            <React.Fragment>
              {" "}
              <Link
                to="/login"
                className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
              >
                Register
              </Link>
            </React.Fragment>
          ) : (
            <Link
              to="/logout"
              className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
      {props.children}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "SET_LOGOUT" })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
