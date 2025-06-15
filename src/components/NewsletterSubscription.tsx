
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Store in localStorage for demo purposes
      const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
      const newSubscriber = {
        id: `subscriber-${Date.now()}`,
        email,
        date: new Date().toLocaleDateString()
      };
      
      subscribers.push(newSubscriber);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
      
      setEmail('');
      setIsSubmitting(false);
      
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <Mail className="h-5 w-5 text-brandiaga-yellow-500 mr-2" />
        <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Get the latest updates, deals, and exclusive offers directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
