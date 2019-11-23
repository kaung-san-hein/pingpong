import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { connect } from "react-redux";
import Error from "./common/Error";
class Register extends Component {
  state = {
    data: { name: "", email: "", password: "", password_confirmation: "" },
    errors: {}
  };

  handleInput = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleForm = async event => {
    event.preventDefault();
    try {
      const { data } = this.state;
      await axios
        .post(
          "http://localhost:8080/pingpong-api/public/api/auth/register",
          data
        )
        .then(res => {
          cookie.set("token", res.data.access_token);
          this.props.setLogin(res.data.user);
          this.props.history.push("/profile");
        });
    } catch (ex) {
      if (ex.response) {
        const { errors } = ex.response.data;
        this.setState({
          errors
        });
      }
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Pong Here</h1>
              <div className="mt-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your greate name"
                  onChange={this.handleInput}
                  className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error error={errors["name"] ? errors["name"] : null} />
              </div>
              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Lovely Email"
                  onChange={this.handleInput}
                  className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error error={errors["email"] ? errors["email"] : null} />
              </div>
              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Super Duper Secret Password"
                  onChange={this.handleInput}
                  className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error error={errors["password"] ? errors["password"] : null} />
              </div>
              <div className="mt-4">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  onChange={this.handleInput}
                  className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                <input
                  type="submit"
                  value="Register"
                  className="mt-2 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
  };
};
export default connect(null, mapDispatchToProps)(Register);
