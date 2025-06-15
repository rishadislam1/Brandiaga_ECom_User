import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin" | "anonymous";
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.sub);
    } else {
      setUserId("anonymous-" + Math.random().toString(36).substr(2, 9));
    }

    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5147/livechatHub", {
        accessTokenFactory: () => token || "",
      })
      .withAutomaticReconnect()
      .build();

    newConnection.on("ReceiveMessage", (message, senderId) => {
      console.log("Received message from", senderId, ":", message);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: message, sender: "admin" },
      ]);
    });

    newConnection.on("Connected", (connectionId) => {
      console.log("Connected with ID:", connectionId);
    });

    newConnection.on("UserDisconnected", (connectionId) => {
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
  }, [userId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !connection || !userId) return;

    const adminId = "550e8400-e29b-41d4-a716-446655440000"; // Match admin's token UserId
    try {
      await connection.invoke("SendMessageToAdmin", adminId, newMessage);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
      if (error.message.includes("No connected client")) {
        alert("Admin is currently offline. Try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
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
          <Button type="submit" className="bg-brandiaga-yellow-400 text-black hover:bg-brandiaga-yellow-500">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;