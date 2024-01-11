package com.iems.chatmicroservice.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationModel {

    private String senderName;
    private String receiverName;
    private NotificationType notificationType;
}
