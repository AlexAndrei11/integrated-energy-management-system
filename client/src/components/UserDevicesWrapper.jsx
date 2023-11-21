import React from 'react';
import { useParams } from 'react-router-dom';
import UserDevicesComponent from './UserDevicesComponent';

function UserDevicesWrapper() {
    const { userId } = useParams();
    return <UserDevicesComponent userId={userId} />;
}

export default UserDevicesWrapper;