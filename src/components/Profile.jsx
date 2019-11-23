import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
class Profile extends Component {
  state = {
    data: { name: this.props.name, email: this.props.email },
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
        .patch("http://localhost:8080/pingpong-api/public/api/auth/update", data)
        .then(res => {
          console.log(res.data);
          // this.props.updateUser(res.data.user);
        });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const { data: errors } = ex.response;
        this.setState({
          errors
        });
      }
    }
  };
  render() {
    return (
      <div className="flex w-full">
        <aside className="w-1/6 bg-black h-screen">
          <ul className="text-white p-4">
            <Link to="/profile">
              <li className="bg-gray-900 py-1 px-3 rounded">Profile</li>
            </Link>
          </ul>
        </aside>
        <section className="w-5/6 m-2 bg-white flex justify-center">
          <form
            className="border border-gray-500 w-1/2 my-5 rounded"
            onSubmit={this.handleForm}
          >
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
        </section>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     updateUser: () =>
//   }
// }

export default connect(mapStateToProps)(Profile);
