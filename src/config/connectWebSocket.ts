import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://localhost:8080/ws'; // your backend WebSocket endpoint

let stompClient: Client | null = null;

export const connectWebSocket = (
  groupId: string,
  onMessageReceived: (msg) => void
) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('Connected to WebSocket');

      stompClient?.subscribe(`/user/${groupId}/private`, (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    }
  });

  stompClient.activate();
};

export const sendMessage = (groupId: string, message) => {    
  stompClient?.publish({
    destination: `/app/chat/${groupId}`,
    body: JSON.stringify(message)
  });
};

export const disconnectWebSocket = () => {
  stompClient?.deactivate();
};
