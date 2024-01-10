package com.iems.chatmicroservice.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageModel {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;
}

