import React from 'react';
import { useParams } from 'react-router-dom';
import UserDevicesComponent from './UserDevicesComponent';
import ChatRoom from "./ChatRoom";

function UserDevicesWrapper() {
    const { userId } = useParams();
    return (
        <div>
            <UserDevicesComponent userId={userId} />
            <ChatRoom />
        </div>
    );
}

export default UserDevicesWrapper;