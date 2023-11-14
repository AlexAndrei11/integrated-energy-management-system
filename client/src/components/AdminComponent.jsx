import React from 'react';
import ListUsersComponent from './ListUsersComponent';
import ListDevicesComponent from './ListDevicesComponent';

const AdminComponent = () => {
    return (
        <div>
            <ListUsersComponent />
            <ListDevicesComponent />
        </div>
    );
};

export default AdminComponent;
