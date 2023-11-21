import React, { Component } from 'react';

class CreateUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.isEditMode && this.props.currentUser ? {
            ...this.props.currentUser,
            errors: {}
        } : {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dob: '',
            errors: {}
        };
    }

    validateFirstName = (firstName) => {
        return firstName.length > 1 ? '' : 'First name must be longer than 1 letter.';
    }

    validateLastName = (lastName) => {
        return lastName.length > 1 ? '' : 'Last name must be longer than 1 letter.';
    }


    validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email) ? '' : 'Email must be a valid email address.';
    }

    validatePassword = (password) => {
        return password.length >= 8 ? '' : 'Password must be longer than 8 characters.';
    }

    validateDOB = (dob) => {
        const age = this.calculateAge(dob);
        return age >= 18 ? '' : 'User must be over 18 years old.';
    }

    calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const diffMs = Date.now() - birthDate.getTime();
        const ageDt = new Date(diffMs);
        return ageDt.getUTCFullYear() - 1970;
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        const errors = {...this.state.errors};

        switch (name) {
            case 'firstName':
                errors.firstName = this.validateFirstName(value);
                break;
            case 'lastName':
                errors.lastName = this.validateLastName(value);
                break;
            case 'email':
                errors.email = this.validateEmail(value);
                break;
            case 'password':
                errors.password = this.validatePassword(value);
                break;
            case 'dob':
                errors.dob = this.validateDOB(value);
                break;
            default:
                break;
        }

        this.setState({ [name]: value, errors });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = this.validateForm();

        if (Object.keys(formErrors).every(key => formErrors[key] === '')) {
            this.props.onSubmit(this.state);
            this.resetForm();
        } else {
            this.setState({ errors: formErrors });
        }
    }

    resetForm = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dob: '',
            errors: {}
        });
    }

    validateForm = () => {
        const { firstName, lastName, email, password, dob } = this.state;
        return {
            firstName: this.validateFirstName(firstName),
            lastName: this.validateLastName(lastName),
            email: this.validateEmail(email),
            password: this.validatePassword(password),
            dob: this.validateDOB(dob)
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isEditMode !== prevProps.isEditMode || this.props.currentUser !== prevProps.currentUser) {
            if (this.props.isEditMode && this.props.currentUser) {
                this.setState({
                    ...this.props.currentUser,
                    errors: {}
                });
            } else {
                // The additional check ensures that this only happens when transitioning from edit mode to add mode
                if (prevProps.isEditMode && !this.props.isEditMode) {
                    this.resetForm();
                }
            }
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal-overlay">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add User</h5>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input type="text" className="form-control" name="firstName" onChange={this.handleInputChange} value={this.state.firstName} />
                                    {this.state.errors.firstName && <div className="error">{this.state.errors.firstName}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input type="text" className="form-control" name="lastName" onChange={this.handleInputChange} value={this.state.lastName} />
                                    {this.state.errors.lastName && <div className="error">{this.state.errors.lastName}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" name="email" onChange={this.handleInputChange} value={this.state.email} />
                                    {this.state.errors.email && <div className="error">{this.state.errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" name="password" onChange={this.handleInputChange} value={this.state.password} />
                                    {this.state.errors.password && <div className="error">{this.state.errors.password}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth:</label>
                                    <input type="date" className="form-control" name="dob" onChange={this.handleInputChange} value={this.state.dob} />
                                    {this.state.errors.dob && <div className="error">{this.state.errors.dob}</div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-danger" onClick={this.props.onClose}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserModal;
