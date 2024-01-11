package com.iems.chatmicroservice.controller;

import com.iems.chatmicroservice.model.MessageModel;
import com.iems.chatmicroservice.model.NotificationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageModel receivePublicMessage(@Payload MessageModel message){
        return message;
    }

    @MessageMapping("/private-message")
    public MessageModel receivePrivateMessage(@Payload MessageModel message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        return message;
    }

    // Method to handle typing notifications
    @MessageMapping("/notify-typing")
    public void handleTypingNotification(NotificationModel notification) {
        // Broadcast the typing notification to the receiver
        simpMessagingTemplate.convertAndSendToUser(
                notification.getReceiverName(),
                "/queue/notifications",
                notification
        );
    }

    // Method to handle seen notifications
    @MessageMapping("/notify-seen")
    public void handleSeenNotification(NotificationModel notification) {
        // Broadcast the seen notification to the sender
        simpMessagingTemplate.convertAndSendToUser(
                notification.getSenderName(),
                "/queue/notifications",
                notification
        );
        // Update message status in your database/message store as 'seen'
    }
}
