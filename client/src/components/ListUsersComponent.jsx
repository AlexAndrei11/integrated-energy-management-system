import React, {Component} from 'react';
import UserService from "../services/UserService";
import CreateUserModal from "../modals/CreateUserModal";
import ListDevicesComponent from "./ListDevicesComponent";

class ListUsersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            showCreateModal: false,
            isEditMode: false,
            currentUser: null
        }
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    openCreateModal = () => {
        this.setState({
            isEditMode: false,
            currentUser: null,
            showCreateModal: true
        });
    }

    closeCreateModal = () => {
        this.setState({
            isEditMode: false,
            currentUser: null,
            showCreateModal: false
        });
    }

    openEditModal = (user) => {
        this.setState({
            isEditMode: true,
            currentUser: user,
            showCreateModal: true
        });
    }

    handleCreateModalSubmit = (userData) => {
        if (this.state.isEditMode) {
            // If in edit mode, update the user
            UserService.updateUser(userData).then(() => {
                this.refreshUserList();
            }).catch(error => {
                console.error("There was an error updating the user:", error);
                // Handle errors here, such as displaying a message to the user
            });
        } else {
            // If not in edit mode, create a new user
            UserService.createUser(userData).then(() => {
                this.refreshUserList();
            }).catch(error => {
                console.error("There was an error creating the user:", error);
                // Handle errors here, such as displaying a message to the user
            });
        }
        this.closeCreateModal();
    }

    handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            UserService.deleteUser(userId).then(response => {
                window.location.reload(); // Reload the entire page
            }).catch(error => {
                console.error("Error deleting user:", error);
            });
        }
    }

    refreshUserList = () => {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Users List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.openCreateModal}> Add User </button>
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
                                        <td>
                                            <button className="btn btn-info" onClick={() => this.openEditModal(user)}> Edit </button>
                                            <button className="btn btn-danger" onClick={() => this.handleDeleteUser(user.id)}> Delete </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <CreateUserModal
                    show={this.state.showCreateModal}
                    onClose={this.closeCreateModal}
                    onSubmit={this.handleCreateModalSubmit}
                    isEditMode={this.state.isEditMode}
                    currentUser={this.state.currentUser}
                />
            </div>
        );
    }
}

export default ListUsersComponent;