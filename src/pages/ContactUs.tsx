
import React from 'react';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, 
          need help with an order, or want to partner with us, our team is ready to answer your questions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <div className="bg-brandiaga-yellow-100 p-3 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-brandiaga-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">Our Location</h3>
          <p className="text-gray-600">
            1234 Market Street<br />
            San Francisco, CA 94103<br />
            United States
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <div className="bg-brandiaga-yellow-100 p-3 rounded-full mb-4">
            <Mail className="h-6 w-6 text-brandiaga-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600 mb-2">
            For general inquiries:
          </p>
          <a href="mailto:info@brandiaga.com" className="text-brandiaga-yellow-600 hover:underline">
            info@brandiaga.com
          </a>
          <p className="text-gray-600 mt-2 mb-1">
            For support:
          </p>
          <a href="mailto:support@brandiaga.com" className="text-brandiaga-yellow-600 hover:underline">
            support@brandiaga.com
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <div className="bg-brandiaga-yellow-100 p-3 rounded-full mb-4">
            <Phone className="h-6 w-6 text-brandiaga-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600 mb-2">
            Customer Service:
          </p>
          <a href="tel:+18001234567" className="text-brandiaga-yellow-600 hover:underline">
            +1 (800) 123-4567
          </a>
          <p className="text-gray-600 mt-2 mb-1">
            Business Hours:
          </p>
          <p className="text-gray-600">
            Mon-Fri: 9AM - 6PM (EST)
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-brandiaga-yellow-600">How do I track my order?</h4>
                <p className="text-gray-600 text-sm mt-1">
                  You can track your order in your account dashboard or on our Track Order page using your order number and email.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-brandiaga-yellow-600">What is your return policy?</h4>
                <p className="text-gray-600 text-sm mt-1">
                  We accept returns within 30 days of delivery. Items must be in original condition with tags attached.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-brandiaga-yellow-600">Do you ship internationally?</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-600 mb-4">
              Follow us on social media for the latest updates, promotions, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.957 0 1.734.81 1.734 1.811 0 .716-.352 1.334-.895 1.647a3.72 3.72 0 0 1 .129.98c0 3.413-3.582 6.189-8.005 6.189C9.571 19.874 6 17.101 6 13.688a4.42 4.42 0 0 1 .127-.967c-.523-.316-.871-.934-.871-1.654 0-.994.77-1.8 1.718-1.8.494 0 .935.201 1.237.526 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12.25a1.25 1.25 0 1 0 0 2.498 1.25 1.25 0 0 0 0-2.498zm5.5 0a1.25 1.25 0 1 0 0 2.498 1.25 1.25 0 0 0 0-2.498z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
