import React, { useState } from 'react';
import UserService from '../services/UserService';

const CreateUserModal = ({ isOpen, onClose }) => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: '', // Date of Birth
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.createUser(userData);
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                {/* Form fields for user data */}
                <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
                {/* Add other input fields similarly */}
                <button type="submit">Create User</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CreateUserModal;