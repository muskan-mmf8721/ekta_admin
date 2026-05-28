import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

class SocketClient {
  private static instance: SocketClient;
  public socket: Socket;

  private constructor() {
    this.socket = io(SOCKET_URL, {
      autoConnect: false, // We'll connect it manually when the user is authenticated
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });
  }

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  public connect(token: string) {
    if (this.socket.connected) return;
    this.socket.auth = { token };
    this.socket.connect();
  }

  public disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
}

export const socketClient = SocketClient.getInstance();
