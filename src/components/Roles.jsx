import React, { Component } from "react";
import axios from "axios";
class Roles extends Component {
  state = {
    roles: [],
    errors: {}
  };
  async componentDidMount() {
    try {
      const { data: roles } = await axios.get(
        "http://localhost:8080/pingpong-api/public/api/admin/roles"
      );
      this.setState({ roles });
    } catch (ex) {
      if (ex.response) {
        const { data: errors } = ex.response;
        this.setState({
          errors
        });
      }
    }
  }
  render() {
    const { roles } = this.state;
    return (
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-1/3 mt-10 p-4 bg-white">
          <h1 className="text-lg border-b border-gray-500">All Roles</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Roles</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="border px-4 py-2">{role.id}</td>
                  <td className="border px-4 py-2">{role.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Roles;
