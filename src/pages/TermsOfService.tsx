
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const lastUpdated = "April 21, 2025";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
        </div>
        
        <div className="prose prose-gray max-w-none">
          <p>
            Welcome to Brandiaga. Please read these Terms of Service ("Terms", "Terms of Service") carefully before using our website (the "Service") operated by Brandiaga, Inc. ("us", "we", "our").
          </p>
          
          <p className="mt-4">
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          
          <p className="mt-4">
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Table of Contents</h2>
          <ul className="space-y-2 list-disc list-inside mb-6">
            <li><a href="#purchases" className="text-brandiaga-yellow-600 hover:underline">Purchases</a></li>
            <li><a href="#account" className="text-brandiaga-yellow-600 hover:underline">Account Registration</a></li>
            <li><a href="#intellectual-property" className="text-brandiaga-yellow-600 hover:underline">Intellectual Property</a></li>
            <li><a href="#user-content" className="text-brandiaga-yellow-600 hover:underline">User-Generated Content</a></li>
            <li><a href="#prohibited-uses" className="text-brandiaga-yellow-600 hover:underline">Prohibited Uses</a></li>
            <li><a href="#termination" className="text-brandiaga-yellow-600 hover:underline">Termination</a></li>
            <li><a href="#warranties" className="text-brandiaga-yellow-600 hover:underline">Disclaimer of Warranties</a></li>
            <li><a href="#liability" className="text-brandiaga-yellow-600 hover:underline">Limitation of Liability</a></li>
            <li><a href="#governing-law" className="text-brandiaga-yellow-600 hover:underline">Governing Law</a></li>
            <li><a href="#changes" className="text-brandiaga-yellow-600 hover:underline">Changes to Terms</a></li>
            <li><a href="#contact" className="text-brandiaga-yellow-600 hover:underline">Contact Information</a></li>
          </ul>
          
          <Separator className="my-8" />
          
          <section id="purchases">
            <h2 className="text-xl font-semibold mb-4">Purchases</h2>
            
            <p className="mb-4">
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
            </p>
            
            <p className="mb-4">
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct, and complete.
            </p>
            
            <p className="mb-4">
              By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases.
            </p>
            
            <p className="mb-4">
              We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order, or other reasons.
            </p>
            
            <p className="mb-4">
              We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="account">
            <h2 className="text-xl font-semibold mb-4">Account Registration</h2>
            
            <p className="mb-4">
              You may need to create an account to use some features of our Service. When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.
            </p>
            
            <p className="mb-4">
              You must notify us immediately of any breach of security or unauthorized use of your account. We will not be liable for any losses caused by any unauthorized use of your account.
            </p>
            
            <p className="mb-4">
              You may control your user profile and how you interact with the Service by changing the settings in your account settings page. By providing us with your email address, you consent to our using the email address to send you Service-related notices, including any notices required by law, in lieu of communication by postal mail.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="intellectual-property">
            <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
            
            <p className="mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Brandiaga, Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Brandiaga, Inc.
            </p>
            
            <p className="mb-4">
              The names, logos, product and service names, designs, and slogans are trademarks of Brandiaga or its affiliates or licensors. You must not use such marks without the prior written permission of Brandiaga. All other names, logos, product and service names, designs, and slogans on this website are the trademarks of their respective owners.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="user-content">
            <h2 className="text-xl font-semibold mb-4">User-Generated Content</h2>
            
            <p className="mb-4">
              Our Service may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
            </p>
            
            <p className="mb-4">
              By posting Content to the Service, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post, or display on or through the Service, and you are responsible for protecting those rights.
            </p>
            
            <p className="mb-4">
              You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="prohibited-uses">
            <h2 className="text-xl font-semibold mb-4">Prohibited Uses</h2>
            
            <p className="mb-4">
              You agree not to use the Service:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation</li>
              <li>To impersonate or attempt to impersonate Brandiaga, a Brandiaga employee, another user, or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Brandiaga or users of the Service or expose them to liability</li>
              <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service</li>
              <li>To attack the Service via a denial-of-service attack or a distributed denial-of-service attack</li>
              <li>To use the Service in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Service</li>
            </ul>
          </section>
          
          <Separator className="my-8" />
          
          <section id="termination">
            <h2 className="text-xl font-semibold mb-4">Termination</h2>
            
            <p className="mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <p className="mb-4">
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service, or you may contact us requesting account deletion.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="warranties">
            <h2 className="text-xl font-semibold mb-4">Disclaimer of Warranties</h2>
            
            <p className="mb-4">
              The Service is provided "as is" and "as available" without any warranty or representation, express or implied. Brandiaga, Inc. disclaims all warranties of any kind, whether express or implied, statutory or otherwise, including but not limited to any warranties of merchantability, non-infringement, and fitness for a particular purpose.
            </p>
            
            <p className="mb-4">
              Brandiaga does not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="liability">
            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            
            <p className="mb-4">
              In no event shall Brandiaga, Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="governing-law">
            <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
            
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of the United States and the State of California, without regard to its conflict of law provisions.
            </p>
            
            <p className="mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="changes">
            <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
            
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <p className="mb-4">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="contact">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            
            <p className="mb-4">
              Brandiaga, Inc.<br />
              1234 Market Street<br />
              San Francisco, CA 94103<br />
              Email: legal@brandiaga.com<br />
              Phone: +1 (800) 123-4567
            </p>
          </section>
          
          <div className="mt-12 flex justify-between items-center">
            <Link to="/privacy-policy" className="text-brandiaga-yellow-600 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/seller-policy" className="text-brandiaga-yellow-600 hover:underline">
              Seller Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
