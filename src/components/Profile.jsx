import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Error from "./common/Error";
import store from "../store";
import cookie from "js-cookie";
class Profile extends Component {
  state = {
    data: { name: this.props.name, email: this.props.email },
    errors: {}
  };
  componentDidMount() {
    let token = cookie.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://localhost:8080/pingpong-api/public/api/auth/me")
        .then(res => {
          store.dispatch({ type: "SET_LOGIN", payload: res.data });
        });
    }
  }
  handleInput = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  handleForm = async event => {
    event.preventDefault();
    try {
      const { data } = this.state;
      await axios.put(
        "http://localhost:8080/pingpong-api/public/api/auth/update",
        data
      );
    } catch (ex) {
      if (ex.response) {
        const { data: errors } = ex.response;
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
              <h1 className="text-lg border-b border-gray-500">
                Edit Your Details
              </h1>
              <div className="mt-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your greate name"
                  onChange={this.handleInput}
                  value={this.state.data.name}
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
                  value={this.state.data.email}
                  className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error error={errors["email"] ? errors["email"] : null} />
              </div>
              <div className="mt-4">
                <input
                  type="submit"
                  value="Update"
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

const mapStateToProps = state => {
  return {
    name: state.auth.user.name,
    email: state.auth.user.email
  };
};
export default connect(mapStateToProps)(Profile);
