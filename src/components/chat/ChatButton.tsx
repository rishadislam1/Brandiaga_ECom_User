
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatInterface from "./ChatInterface";

const ChatButton = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="rounded-full bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-black shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="ml-2">Chat Support</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Chat Support</SheetTitle>
          </SheetHeader>
          <ChatInterface />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatButton;
