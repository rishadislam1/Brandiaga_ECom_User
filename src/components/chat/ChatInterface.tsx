import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import axios from "axios";
import {ScrollArea} from "@radix-ui/react-scroll-area";

interface Message {
  messageId: string;
  text: string;
  sender: "user" | "admin";
  sentAt: string;
  isRead?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

const generateGuid = () => {
  // Create a UUID v4 compatible with .NET Guid.NewGuid()
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  // Set version to 4
  bytes[6] = (bytes[6] & 0x0f) | 0x40;

  // Set variant to 10xxxxxx
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
  }

  return (
    byteToHex[bytes[0]] +
    byteToHex[bytes[1]] +
    byteToHex[bytes[2]] +
    byteToHex[bytes[3]] + '-' +
    byteToHex[bytes[4]] +
    byteToHex[bytes[5]] + '-' +
    byteToHex[bytes[6]] +
    byteToHex[bytes[7]] + '-' +
    byteToHex[bytes[8]] +
    byteToHex[bytes[9]] + '-' +
    byteToHex[bytes[10]] +
    byteToHex[bytes[11]] +
    byteToHex[bytes[12]] +
    byteToHex[bytes[13]] +
    byteToHex[bytes[14]] +
    byteToHex[bytes[15]]
  );
};


  useEffect(() => {
    let storedUserId = localStorage.getItem("chatUserId");
    if (!storedUserId) {
      storedUserId = generateGuid();
      localStorage.setItem("chatUserId", storedUserId);
    }
    setUserId(storedUserId);

    const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5147/livechatHub")
        .withAutomaticReconnect()
        .build();

    newConnection.on("ReceiveMessage", (message: string, senderId: string) => {
      setMessages((prev) => [
        ...prev,
        {
          messageId: Date.now().toString(),
          text: message,
          sender: "admin",
          sentAt: new Date().toISOString(),
        },
      ]);
    });

    newConnection.on("Connected", (connectionId: string) => {
      console.log("Connected with ID:", connectionId);
    });

    newConnection.on("UserDisconnected", (connectionId: string) => {
      console.log("User disconnected:", connectionId);
    });

    newConnection.onclose((error) => {
      console.error("Connection closed:", error);
    });

    newConnection
        .start()
        .then(() => console.log("SignalR connected with UserId:", userId))
        .catch((err) => console.error("SignalR connection failed:", err));

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !connection || !userId) return;

    const adminId = "659F3763-B865-44C3-8171-332FF9A40B57";
    const messageDto = {
      userId: "E6A02992-692F-42A2-BC24-53903AD4745e",
      adminId: adminId,
      message: newMessage,
      isRead: false,
    };

    try {
      const response = await axios.post("http://localhost:5147/api/livechat", messageDto);
      const savedMessage = response.data.data;

      await connection.invoke("SendMessageToAdmin", adminId, newMessage);

      setMessages((prev) => [
        ...prev,
        {
          messageId: savedMessage.messageId,
          text: savedMessage.message,
          sender: "user",
          sentAt: savedMessage.sentAt,
          isRead: savedMessage.isRead,
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.response?.data?.message || error.message);
      if (error.message.includes("No connected client")) {
        alert("Admin is currently offline. Try again later.");
      } else {
        alert(`Error: ${error.response?.data?.data?.message || "Failed to send message"}`);
      }
    }
  };

  return (
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
                <div
                    key={message.messageId}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === "user"
                              ? "bg-brandiaga-yellow-400 text-black"
                              : "bg-gray-100"
                      }`}
                  >
                    {message.text}
                    <div className="text-xs text-gray-500">{new Date(message.sentAt).toLocaleTimeString()}</div>
                  </div>

                </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
            />
            <button
                type="submit"
                className="contained bg-brandiaga-yellow-400 text-black hover:bg-brandiaga-yellow-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
  );
};

export default ChatInterface;