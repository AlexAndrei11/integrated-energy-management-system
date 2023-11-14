import React, {Component} from 'react';
import UserService from "../services/UserService";

class ListUsersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Users List</h2>
                <div className="row">
                    <button className="btn btn-primary"> Add User </button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Id </th>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Email </th>
                            <th> Password </th>
                            <th> Date of Birth </th>
                            <th> Age </th>
                            <th> Actions </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td> { user.id } </td>
                                        <td> { user.firstName } </td>
                                        <td> { user.lastName } </td>
                                        <td> { user.email } </td>
                                        <td> { user.password } </td>
                                        <td> { user.dob } </td>
                                        <td> { user.age } </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUsersComponent;