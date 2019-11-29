import React, { Component } from "react";
import axios from "axios";
import Error from "./common/Error";
class UsersEdit extends Component {
  state = {
    data: { name: "" },
    roles: [],
    errors: {}
  };
  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const { data } = await axios.get(
        "http://localhost:8080/pingpong-api/public/api/admin/users/" + id
      );
      this.setState({
        data: data[0],
        roles: data[1]
      });
      console.log(data);
    } catch (ex) {
      if (ex.response) {
        const { data: errors } = ex.response;
        this.setState({
          errors
        });
      }
    }
  }
  handleInput = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    console.log(data);
  };
  handleForm = async event => {
    event.preventDefault();
    try {
      const { id } = this.props.match.params;
      const { data } = this.state;
      await axios.put(
        "http://localhost:8080/pingpong-api/public/api/admin/users/update/" +
          id,
        data
      );
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
    const { errors, roles } = this.state;
    return (
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Update User</h1>
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
                {/* <Error error={errors["name"] ? errors["name"] : null} /> */}
              </div>
              <div className="mt-4">
                <label>Roles</label>
                <select
                  name="role[]"
                  multiple
                  className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                  onChange={this.handleInput}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
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

export default UsersEdit;
