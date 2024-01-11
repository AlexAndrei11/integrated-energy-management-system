import React, { useState, useEffect } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;
const ChatRoom = () => {
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: "",
        receivername: "",
        connected: false,
        message: ""
    });
    const [isTyping, setIsTyping] = useState(false);
    let typingTimer;

    // Function to send typing notification
    const sendTypingNotification = (isTypingStatus) => {
        if (stompClient) {
            let notification = {
                senderName: userData.username,
                receiverName: tab, // Assuming 'tab' is the current chat partner
                notificationType: isTypingStatus ? 'TYPING' : 'NOT_TYPING'
            };
            stompClient.send('/app/notify-typing', {}, JSON.stringify(notification));
        }
    };

    // Function to send seen notification
    const sendSeenNotification = (receiverName) => {
        if (stompClient) {
            let notification = {
                senderName: userData.username,
                receiverName: receiverName,
                notificationType: 'SEEN'
            };
            stompClient.send('/app/notify-seen', {}, JSON.stringify(notification));
        }
    };

    // Function to handle incoming notifications
    const onNotificationReceived = (payload) => {
        let notification = JSON.parse(payload.body);

        if (notification.notificationType === 'SEEN' && notification.senderName === userData.username) {
            const chatsWithUser = privateChats.get(notification.senderName);
            if (chatsWithUser && chatsWithUser.length > 0) {
                // Create a new array with updated 'seen' property
                const updatedChats = chatsWithUser.map((chat, index) => {
                    if (index === chatsWithUser.length - 1) {
                        return { ...chat, seen: true };
                    }
                    return chat;
                });

                // Update the state immutably
                setPrivateChats(new Map(privateChats.set(notification.senderName, updatedChats)));
            }
        }
        // Handle other notification types as needed
    };


    const handleUserClick = (senderName) => {
        // Set the current tab or conversation to this user
        setTab(senderName);

        // Send a 'SEEN' notification to the sender
        sendSeenNotification(senderName);
    };

    const handleValue = (event) => {
        const { value, name } = event.target;
        setUserData({ ...userData, [name]: value });

        // Detect typing
        if (!isTyping) {
            setIsTyping(true);
            sendTypingNotification(true);
        }
        // Debounce logic to send 'not typing' status
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            setIsTyping(false);
            sendTypingNotification(false);
        }, 5000); // Adjust delay as needed
    };

    const registerUser = () => {
        let Sock = new SockJS('http://localhost:8083/websocket');
        stompClient =  over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected":true})
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/queue/notifications', onNotificationReceived);
        userJoin();
    }

    const userJoin=()=>{
        let chatMessage = {
            senderName: userData.username,
            status:'JOIN'
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessageReceived = (payload)=>{
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const sendPublicMessage=()=>{
        if(stompClient){
            let chatMessage={
                senderName:userData.username,
                message:userData.message,
                status:'MESSAGE'
            };
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message":""});
        }
    }

    const sendPrivateMessage=()=>{
        if(stompClient){
            let chatMessage={
                senderName:userData.username,
                receiverName:tab,
                message:userData.message,
                status:'MESSAGE'
            };
            if(userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message":""});
        }
    }

    return (
        <div className="container">
            {userData.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateChats.keys()].map((name,index)=>(
                                <li onClick={() => handleUserClick(name)} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab==="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat,index)=>(
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className='send-message'>
                            <input type='text' className='input-message' name='message' placeholder='enter public message' value={userData.message} onChange={handleValue} />
                            <button type='button' className='send-button' onClick={sendPublicMessage}>send</button>
                        </div>
                    </div>}
                    {tab!=="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {privateChats.get(tab)?.map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                    {chat.seen && <div className="seen-indicator">Seen</div>}
                                </li>
                            ))}
                        </ul>

                        <div className='send-message'>
                            <input type='text' className='input-message' name='message' placeholder={`enter private message for ${tab}`} value={userData.message} onChange={handleValue} />
                            <button type='button' className='send-button' onClick={sendPrivateMessage}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className='register'>
                    <input
                        id='user-name'
                        name='username'
                        placeholder='Enter the user name'
                        value={userData.username}
                        onChange={handleValue}
                    />
                    <button type='button' onClick={registerUser}>
                        connect
                    </button>
                </div>}
        </div>
    )
}

export default ChatRoom;
