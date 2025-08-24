import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { Message } from '../model/Message';

const SOCKET_URL = 'http://localhost:8080/ws'; // Backend WebSocket endpoint

let stompClient: Client | null = null;

export const connectWebSocket = (groupId: string, onMessageReceived: (msg:Message) => void) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('Connected to WebSocket');
      console.log(`Subscribing to /user/${groupId}/private`);
            
      stompClient?.subscribe(`/user/${groupId}/private`, (message) => {
        console.log('Message received:', message.body);
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },onDisconnect: () => {
      console.log('Disconnected from WebSocket');
    }
  });

  stompClient.activate();
};

export const sendMessage = (groupId: string, message:Message) => {
  stompClient?.publish({
    destination: `/app/chat/${groupId}`,
    body: JSON.stringify(message)
  });
};

export const disconnectWebSocket = () => {
  stompClient?.deactivate();
};
