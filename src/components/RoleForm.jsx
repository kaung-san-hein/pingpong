import React, { Component } from "react";
import axios from "axios";
import Error from "./common/Error";
class RoleForm extends Component {
  state = {
    data: { name: "" },
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
      await axios.post(
        "http://localhost:8080/pingpong-api/public/api/admin/roles/create",
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
    const { errors } = this.state;
    return (
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Create Role</h1>
              <div className="mt-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Create Role Name"
                  onChange={this.handleInput}
                  className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error error={errors["name"] ? errors["name"] : null} />
              </div>
              <div className="mt-4">
                <input
                  type="submit"
                  value="Create"
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

export default RoleForm;
