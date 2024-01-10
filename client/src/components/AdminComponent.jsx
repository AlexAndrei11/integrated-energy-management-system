import React from 'react';
import ListUsersComponent from './ListUsersComponent';
import ListDevicesComponent from './ListDevicesComponent';
import ChatRoom from "./ChatRoom";

const AdminComponent = () => {
    return (
        <div>
            <ListUsersComponent />
            <ListDevicesComponent />
            <ChatRoom />
        </div>
    );
};

export default AdminComponent;
