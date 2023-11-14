import React, { useState } from 'react';
import CreateUserModal from './CreateUserModal';
import ListUsersComponent from './ListUsersComponent';
import ListDevicesComponent from './ListDevicesComponent';

const AdminComponent = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Create New User</button>
            <CreateUserModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <ListUsersComponent />
            <ListDevicesComponent />
        </div>
    );
};

export default AdminComponent;
