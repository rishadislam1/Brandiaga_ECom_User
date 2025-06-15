
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "April 21, 2025";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
        </div>
        
        <div className="prose prose-gray max-w-none">
          <p>
            At Brandiaga, we respect your privacy and are committed to protecting it through our compliance with this privacy policy ("Policy"). This Policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Table of Contents</h2>
          <ul className="space-y-2 list-disc list-inside mb-6">
            <li><a href="#information-we-collect" className="text-brandiaga-yellow-600 hover:underline">Information We Collect</a></li>
            <li><a href="#how-we-use-information" className="text-brandiaga-yellow-600 hover:underline">How We Use Your Information</a></li>
            <li><a href="#disclosure-of-information" className="text-brandiaga-yellow-600 hover:underline">Disclosure of Your Information</a></li>
            <li><a href="#cookies" className="text-brandiaga-yellow-600 hover:underline">Cookies and Tracking Technologies</a></li>
            <li><a href="#data-security" className="text-brandiaga-yellow-600 hover:underline">Data Security</a></li>
            <li><a href="#your-rights" className="text-brandiaga-yellow-600 hover:underline">Your Rights Regarding Your Information</a></li>
            <li><a href="#children" className="text-brandiaga-yellow-600 hover:underline">Children's Privacy</a></li>
            <li><a href="#changes" className="text-brandiaga-yellow-600 hover:underline">Changes to Our Privacy Policy</a></li>
            <li><a href="#contact" className="text-brandiaga-yellow-600 hover:underline">Contact Information</a></li>
          </ul>
          
          <Separator className="my-8" />
          
          <section id="information-we-collect">
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            
            <p className="mb-4">We collect several types of information from and about users of our website, including:</p>
            
            <h3 className="text-lg font-medium mt-6 mb-3">Personal Information</h3>
            <p className="mb-4">
              Personal information you provide to us when you register on our website, make a purchase, sign up for our newsletter, respond to a survey, fill out a form, or otherwise communicate with us. This may include:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Contact information (such as name, email address, mailing address, and phone number)</li>
              <li>Payment information (such as credit card numbers, billing address)</li>
              <li>Account credentials (such as username and password)</li>
              <li>Order history and preferences</li>
              <li>Demographic information</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-6 mb-3">Usage Information</h3>
            <p className="mb-4">
              Information about your internet connection, the equipment you use to access our website, and usage details. This information is collected automatically as you navigate through our site and may include:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>IP address and device identifiers</li>
              <li>Browsing actions and patterns</li>
              <li>Information about your visit, including the pages you view, the links you click, and other actions you take</li>
              <li>Information about your device, such as your operating system and browser type</li>
              <li>Referral URLs</li>
            </ul>
          </section>
          
          <Separator className="my-8" />
          
          <section id="how-we-use-information">
            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            
            <p className="mb-4">We use information that we collect about you or that you provide to us, including any personal information:</p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>To present our website and its contents to you</li>
              <li>To provide you with information, products, or services that you request from us</li>
              <li>To fulfill any other purpose for which you provide it</li>
              <li>To provide you with notices about your account, including expiration and renewal notices</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us</li>
              <li>To notify you about changes to our website or any products or services we offer or provide</li>
              <li>To improve our website, products or services, marketing, or customer relationships</li>
              <li>To personalize your website experience and to deliver content and product and service offerings relevant to your interests</li>
              <li>In any other way we may describe when you provide the information</li>
              <li>For any other purpose with your consent</li>
            </ul>
          </section>
          
          <Separator className="my-8" />
          
          <section id="disclosure-of-information">
            <h2 className="text-xl font-semibold mb-4">Disclosure of Your Information</h2>
            
            <p className="mb-4">We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>To our subsidiaries and affiliates</li>
              <li>To contractors, service providers, and other third parties we use to support our business</li>
              <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets</li>
              <li>To fulfill the purpose for which you provide it</li>
              <li>For any other purpose disclosed by us when you provide the information</li>
              <li>With your consent</li>
            </ul>
            
            <p className="mb-4">We may also disclose your personal information:</p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request</li>
              <li>To enforce or apply our terms of use and other agreements, including for billing and collection purposes</li>
              <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of our company, our customers, or others</li>
            </ul>
          </section>
          
          <Separator className="my-8" />
          
          <section id="cookies">
            <h2 className="text-xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
            
            <p className="mb-4">
              We use cookies and similar tracking technologies to track the activity on our website and store certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. They are sent to your browser from a website and stored on your device.
            </p>
            
            <p className="mb-4">
              These technologies help us to store your preferences, customize content, target ads, and analyze site traffic. We use the following types of cookies:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li><strong>Essential cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Functional cookies:</strong> Enable enhanced functionality and personalization</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements and track ad campaign performance</li>
            </ul>
            
            <p className="mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="data-security">
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            
            <p className="mb-4">
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
            </p>
            
            <p className="mb-4">
              The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
            </p>
            
            <p className="mb-4">
              Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the website.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="your-rights">
            <h2 className="text-xl font-semibold mb-4">Your Rights Regarding Your Information</h2>
            
            <p className="mb-4">
              You have certain rights regarding your personal information, which may include:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Accessing the personal information we hold about you</li>
              <li>Correcting any inaccuracies in your personal information</li>
              <li>Deleting your personal information</li>
              <li>Restricting or objecting to our processing of your personal information</li>
              <li>Obtaining a copy of your personal information in a structured, machine-readable format</li>
              <li>Withdrawing consent where we process your information based on your consent</li>
            </ul>
            
            <p className="mb-4">
              To exercise these rights, please contact us using the contact information provided at the end of this Policy.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="children">
            <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
            
            <p className="mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on this website or on or through any of its features, make any purchases through the website, or provide any information about yourself to us, including your name, address, telephone number, email address, or any screen name or username you may use.
            </p>
            
            <p className="mb-4">
              If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="changes">
            <h2 className="text-xl font-semibold mb-4">Changes to Our Privacy Policy</h2>
            
            <p className="mb-4">
              It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page or by email to the email address specified in your account.
            </p>
            
            <p className="mb-4">
              The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our website and this privacy policy to check for any changes.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="contact">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <p className="mb-4">
              To ask questions or comment about this privacy policy and our privacy practices, contact us at:
            </p>
            
            <p className="mb-4">
              Brandiaga, Inc.<br />
              1234 Market Street<br />
              San Francisco, CA 94103<br />
              Email: privacy@brandiaga.com<br />
              Phone: +1 (800) 123-4567
            </p>
          </section>
          
          <div className="mt-12 flex justify-between items-center">
            <Link to="/terms" className="text-brandiaga-yellow-600 hover:underline">
              Terms of Service
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

export default PrivacyPolicy;
