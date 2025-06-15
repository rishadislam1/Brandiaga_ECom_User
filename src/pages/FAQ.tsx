
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle } from "lucide-react";
import NewsletterSubscription from "@/components/NewsletterSubscription";

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      id: 'ordering',
      name: 'Ordering',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You\'ll need to provide shipping information and payment details to complete your purchase.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Yes, you can modify or cancel your order as long as it hasn\'t been shipped yet. Please go to your account dashboard and view your recent orders to make changes. If you don\'t see the option to modify, please contact our customer service team immediately.'
        },
        {
          question: 'Do you offer gift wrapping?',
          answer: 'Yes, we offer gift wrapping services for an additional fee. You can select this option during checkout. You can also add a personalized gift message that will be printed on a card and included with your order.'
        }
      ]
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      faqs: [
        {
          question: 'What shipping methods do you offer?',
          answer: 'We offer Standard (5-7 business days), Express (2-3 business days), and Next Day delivery options. Shipping costs and availability vary based on your location and the items in your order.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by location. Please note that you may be responsible for import duties and taxes.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a shipping confirmation email with a tracking number. You can use this number to track your package on our website or the carrier\'s website. You can also view tracking information in your account dashboard.'
        }
      ]
    },
    {
      id: 'returns',
      name: 'Returns & Refunds',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 30 days of delivery. Items must be in original condition with tags attached. Some products, like personal care items or underwear, cannot be returned for hygiene reasons.'
        },
        {
          question: 'How do I return an item?',
          answer: 'To return an item, go to your account dashboard, find the order containing the item, and select "Return Item". Follow the instructions to print a return label and arrange pickup or drop-off. Once we receive and process your return, we\'ll issue a refund.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive your return. The time it takes for the refund to appear in your account depends on your payment method and financial institution, typically an additional 3-10 business days.'
        },
        {
          question: 'Do I need to pay for return shipping?',
          answer: 'If you\'re returning due to a defective product or our error, return shipping is free. For all other returns, a shipping fee may be deducted from your refund unless you\'re an Prime member with return shipping benefits.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Orders',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking on the "Sign In" button at the top of the page and selecting "Create Account". You\'ll need to provide your email address and create a password. You can also create an account during the checkout process.'
        },
        {
          question: 'How can I reset my password?',
          answer: 'If you\'ve forgotten your password, click on the "Sign In" button, then select "Forgot Password". Enter your email address, and we\'ll send you a link to reset your password. Please check your spam folder if you don\'t see the email in your inbox.'
        },
        {
          question: 'Where can I see my order history?',
          answer: 'You can view your order history by signing into your account and navigating to the "Orders" section in your account dashboard. Here, you can see details of all your past orders, including order status, items purchased, and shipping information.'
        }
      ]
    },
    {
      id: 'products',
      name: 'Product Information',
      faqs: [
        {
          question: 'Are your product measurements accurate?',
          answer: 'Yes, we make every effort to provide accurate measurements for all our products. Please refer to our size guides for specific information. If you\'re between sizes, we generally recommend sizing up for a more comfortable fit.'
        },
        {
          question: 'Do you offer warranty on products?',
          answer: 'Warranty policies vary by product. Most electronics come with a manufacturer\'s warranty of 1-2 years. Please check the product description or contact customer service for specific warranty information on the item you\'re interested in.'
        },
        {
          question: 'How do I know if a product is in stock?',
          answer: 'Product availability is displayed on each product page. If an item is in stock, you\'ll see the available quantity or simply "In Stock". If an item is out of stock, you may have the option to be notified when it becomes available again.'
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredCategories = searchQuery
    ? categories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : categories;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our products, ordering, shipping, returns, and more.
        </p>
        
        {/* FAQ Search Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            )}
          </div>
          
          {searchQuery && filteredCategories.length === 0 && (
            <p className="text-gray-500 text-sm mt-2">
              No FAQs found matching "{searchQuery}". Try a different search term.
            </p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Navigation (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <a 
                    href={`#${category.id}`} 
                    className="block py-2 px-3 rounded-md transition-colors hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-brandiaga-yellow-50 rounded-md border border-brandiaga-yellow-200">
              <div className="flex items-center mb-2">
                <HelpCircle className="h-5 w-5 text-brandiaga-yellow-500 mr-2" />
                <h4 className="font-semibold text-gray-800">Still need help?</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Can't find the answer you're looking for? Please contact our customer support team.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-brandiaga-yellow-300 text-brandiaga-yellow-700 hover:bg-brandiaga-yellow-100"
                onClick={() => window.location.href = '/contact-us'}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
        
        {/* FAQ Accordion */}
        <div className="lg:col-span-3">
          {filteredCategories.map((category) => (
            <div key={category.id} id={category.id} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">
                {category.name}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <AccordionItem 
                    key={`${category.id}-${index}`} 
                    value={`${category.id}-${index}`}
                    className="border rounded-lg p-2 shadow-sm"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left font-medium">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
          
          {/* Contact Support (Mobile) */}
          <div className="lg:hidden mt-8 p-5 bg-brandiaga-yellow-50 rounded-lg border border-brandiaga-yellow-200">
            <div className="flex items-center mb-3">
              <HelpCircle className="h-5 w-5 text-brandiaga-yellow-500 mr-2" />
              <h4 className="font-semibold text-gray-800">Still need help?</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Can't find the answer you're looking for? Please contact our customer support team.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-brandiaga-yellow-300 text-brandiaga-yellow-700 hover:bg-brandiaga-yellow-100"
              onClick={() => window.location.href = '/contact-us'}
            >
              Contact Support
            </Button>
          </div>
          
          {/* Newsletter */}
          <div className="mt-12">
            <NewsletterSubscription />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
