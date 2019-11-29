import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
class Users extends Component {
  state = {
    users: [],
    errors: {}
  };
  async componentDidMount() {
    try {
      const { data: users } = await axios.get(
        "http://localhost:8080/pingpong-api/public/api/admin/users"
      );
      this.setState({ users });
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
    const { users } = this.state;
    return (
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-1/3 mt-10 p-4 bg-white">
          <h1 className="text-lg border-b border-gray-500">All Users</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Users</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2"><Link to={`/users/${user.id}`}>{user.email}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
