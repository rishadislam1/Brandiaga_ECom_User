
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const SellerPolicy = () => {
  const lastUpdated = "April 21, 2025";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Seller Policy</h1>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
        </div>
        
        <div className="prose prose-gray max-w-none">
          <p>
            This Seller Policy ("Policy") outlines the terms and conditions for selling products on the Brandiaga marketplace. By registering as a seller on our platform, you agree to comply with this Policy and our Terms of Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Table of Contents</h2>
          <ul className="space-y-2 list-disc list-inside mb-6">
            <li><a href="#eligibility" className="text-brandiaga-yellow-600 hover:underline">Seller Eligibility</a></li>
            <li><a href="#registration" className="text-brandiaga-yellow-600 hover:underline">Seller Registration</a></li>
            <li><a href="#listings" className="text-brandiaga-yellow-600 hover:underline">Product Listings</a></li>
            <li><a href="#pricing" className="text-brandiaga-yellow-600 hover:underline">Pricing and Fees</a></li>
            <li><a href="#fulfillment" className="text-brandiaga-yellow-600 hover:underline">Order Fulfillment</a></li>
            <li><a href="#returns" className="text-brandiaga-yellow-600 hover:underline">Returns and Refunds</a></li>
            <li><a href="#seller-performance" className="text-brandiaga-yellow-600 hover:underline">Seller Performance Standards</a></li>
            <li><a href="#intellectual-property" className="text-brandiaga-yellow-600 hover:underline">Intellectual Property</a></li>
            <li><a href="#prohibited-products" className="text-brandiaga-yellow-600 hover:underline">Prohibited Products</a></li>
            <li><a href="#termination" className="text-brandiaga-yellow-600 hover:underline">Termination</a></li>
            <li><a href="#changes" className="text-brandiaga-yellow-600 hover:underline">Changes to Policy</a></li>
            <li><a href="#contact" className="text-brandiaga-yellow-600 hover:underline">Contact Information</a></li>
          </ul>
          
          <Separator className="my-8" />
          
          <section id="eligibility">
            <h2 className="text-xl font-semibold mb-4">Seller Eligibility</h2>
            
            <p className="mb-4">
              To become a seller on Brandiaga, you must:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Be at least 18 years of age or the age of legal majority in your jurisdiction</li>
              <li>Have a valid email address and phone number</li>
              <li>Provide accurate and complete business information</li>
              <li>Have a valid bank account for receiving payments</li>
              <li>Have all necessary licenses and permits required to sell your products</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
            
            <p className="mb-4">
              Brandiaga reserves the right to approve or reject seller applications at its sole discretion.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="registration">
            <h2 className="text-xl font-semibold mb-4">Seller Registration</h2>
            
            <p className="mb-4">
              To register as a seller, you must:
            </p>
            
            <ol className="list-decimal list-inside space-y-2 mb-4 pl-4">
              <li>Create a Brandiaga account or log in to your existing account</li>
              <li>Navigate to the Seller Central section and click "Register as a Seller"</li>
              <li>Provide your business information, including:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>Business name and address</li>
                  <li>Tax identification number</li>
                  <li>Contact information</li>
                  <li>Bank account details for payments</li>
                </ul>
              </li>
              <li>Submit required documentation for identity and business verification</li>
              <li>Review and accept the Seller Agreement and related policies</li>
              <li>Complete the seller profile with your brand information</li>
            </ol>
            
            <p className="mb-4">
              Once your application is approved, you'll gain access to the Seller Dashboard where you can manage your products, orders, and account settings.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="listings">
            <h2 className="text-xl font-semibold mb-4">Product Listings</h2>
            
            <p className="mb-4">
              When creating product listings, you must:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Provide accurate, complete, and up-to-date information about your products</li>
              <li>Include clear, high-quality images that accurately represent the product</li>
              <li>Use descriptive titles and detailed product descriptions</li>
              <li>Specify all relevant product attributes (size, color, material, etc.)</li>
              <li>List accurate inventory quantities</li>
              <li>Include any warranty information or disclaimers</li>
              <li>Comply with all category-specific requirements</li>
            </ul>
            
            <p className="mb-4">
              All product listings are subject to Brandiaga's approval. We reserve the right to remove or modify listings that violate our policies or applicable laws.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="pricing">
            <h2 className="text-xl font-semibold mb-4">Pricing and Fees</h2>
            
            <p className="mb-4">
              Sellers are responsible for setting their own product prices, which should include:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>The cost of the product</li>
              <li>Any applicable shipping costs (if not using Brandiaga's fulfillment services)</li>
              <li>Consideration of Brandiaga's fees</li>
            </ul>
            
            <p className="mb-4">
              Brandiaga charges the following fees:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li><strong>Subscription fee:</strong> Monthly fee based on your seller plan</li>
              <li><strong>Referral fee:</strong> Percentage of each sale, varying by category (typically 8-15%)</li>
              <li><strong>Fulfillment fees:</strong> If using Brandiaga's fulfillment services</li>
              <li><strong>Advertising fees:</strong> Optional fees for promotional services</li>
              <li><strong>Refund administration fee:</strong> Applied when processing customer refunds</li>
            </ul>
            
            <p className="mb-4">
              Detailed fee information is available in the Seller Dashboard. Brandiaga reserves the right to change fees with 30 days' notice.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="fulfillment">
            <h2 className="text-xl font-semibold mb-4">Order Fulfillment</h2>
            
            <p className="mb-4">
              Sellers may choose between:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li><strong>Self-fulfillment:</strong> You manage storage, packing, and shipping of products</li>
              <li><strong>Brandiaga Fulfillment:</strong> Brandiaga handles storage, packing, and shipping</li>
            </ul>
            
            <p className="mb-4 font-semibold">Self-fulfillment requirements:</p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Process and ship orders within 2 business days of receipt</li>
              <li>Provide tracking information for all shipments</li>
              <li>Use appropriate packaging to prevent damage during transit</li>
              <li>Include any necessary product documentation, warranties, or manuals</li>
              <li>Maintain accurate inventory levels to prevent overselling</li>
            </ul>
            
            <p className="mb-4 font-semibold">Brandiaga Fulfillment requirements:</p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Prepare products according to our fulfillment guidelines</li>
              <li>Ship inventory to designated Brandiaga fulfillment centers</li>
              <li>Maintain sufficient inventory levels</li>
              <li>Pay applicable fulfillment fees based on product size and weight</li>
            </ul>
          </section>
          
          <Separator className="my-8" />
          
          <section id="returns">
            <h2 className="text-xl font-semibold mb-4">Returns and Refunds</h2>
            
            <p className="mb-4">
              All sellers must comply with Brandiaga's Return Policy, which generally includes:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Accepting returns within 30 days of delivery for most products</li>
              <li>Processing refunds promptly after receiving returned items</li>
              <li>Covering return shipping costs for items that are defective, damaged, or not as described</li>
            </ul>
            
            <p className="mb-4">
              Sellers may establish more generous return policies but cannot offer less favorable terms than Brandiaga's standard policy.
            </p>
            
            <p className="mb-4">
              For certain product categories (e.g., personal hygiene products, perishable goods), special return restrictions may apply.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="seller-performance">
            <h2 className="text-xl font-semibold mb-4">Seller Performance Standards</h2>
            
            <p className="mb-4">
              Brandiaga evaluates seller performance based on the following metrics:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li><strong>Order defect rate:</strong> Should be less than 1%</li>
              <li><strong>Late shipment rate:</strong> Should be less than 4%</li>
              <li><strong>Cancellation rate:</strong> Should be less than 2.5%</li>
              <li><strong>Customer response time:</strong> Should be within 24 hours</li>
              <li><strong>Customer feedback:</strong> Should maintain at least a 4-star rating</li>
            </ul>
            
            <p className="mb-4">
              Sellers who fail to meet these standards may:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Receive performance improvement notifications</li>
              <li>Have their listings' visibility reduced</li>
              <li>Face temporary suspension of selling privileges</li>
              <li>Have their selling account terminated in severe cases</li>
            </ul>
          </section>
          
          <Separator className="my-8" />
          
          <section id="intellectual-property">
            <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
            
            <p className="mb-4">
              Sellers must:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Have the legal right to sell all products listed</li>
              <li>Not infringe on any third-party intellectual property rights</li>
              <li>Only use images and content that you own or have permission to use</li>
              <li>Respect trademarks, patents, copyrights, and other intellectual property</li>
            </ul>
            
            <p className="mb-4">
              Brandiaga takes intellectual property violations seriously and may remove listings, suspend accounts, or take other actions in response to valid infringement claims.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="prohibited-products">
            <h2 className="text-xl font-semibold mb-4">Prohibited Products</h2>
            
            <p className="mb-4">
              The following products are prohibited from sale on Brandiaga:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Illegal items or items that promote illegal activities</li>
              <li>Counterfeit goods or unauthorized replicas</li>
              <li>Prescription drugs or controlled substances</li>
              <li>Weapons, ammunition, and certain weapon accessories</li>
              <li>Pornographic materials</li>
              <li>Products that promote hate, violence, or discrimination</li>
              <li>Recalled products</li>
              <li>Products that pose significant health or safety hazards</li>
              <li>Tobacco products and e-cigarettes</li>
              <li>Live animals</li>
              <li>Any products prohibited by law in the jurisdictions where we operate</li>
            </ul>
            
            <p className="mb-4">
              This list is not exhaustive, and Brandiaga reserves the right to prohibit additional products at its discretion.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="termination">
            <h2 className="text-xl font-semibold mb-4">Termination</h2>
            
            <p className="mb-4">
              Brandiaga may suspend or terminate your seller account for:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
              <li>Violation of this Seller Policy or our Terms of Service</li>
              <li>Consistent failure to meet performance standards</li>
              <li>Selling prohibited items</li>
              <li>Engaging in deceptive, fraudulent, or illegal activities</li>
              <li>Receiving excessive customer complaints</li>
              <li>Providing false information during registration</li>
              <li>Any other actions that harm Brandiaga or our customers</li>
            </ul>
            
            <p className="mb-4">
              Sellers may voluntarily terminate their account by contacting Seller Support. Upon termination, Brandiaga will disburse any remaining balance owed to the seller after deducting any applicable fees or charges.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="changes">
            <h2 className="text-xl font-semibold mb-4">Changes to Policy</h2>
            
            <p className="mb-4">
              Brandiaga reserves the right to modify this Seller Policy at any time. We will notify sellers of material changes via email or through the Seller Dashboard at least 30 days before the changes take effect.
            </p>
            
            <p className="mb-4">
              Continued use of the Brandiaga selling platform after policy changes constitutes acceptance of the updated terms.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section id="contact">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <p className="mb-4">
              For questions or concerns regarding this Seller Policy, please contact:
            </p>
            
            <p className="mb-4">
              Brandiaga Seller Support<br />
              Email: sellers@brandiaga.com<br />
              Phone: +1 (800) 234-5678<br />
              Hours: Monday-Friday, 9AM-6PM EST
            </p>
          </section>
          
          <div className="mt-12 flex justify-between items-center">
            <Link to="/privacy-policy" className="text-brandiaga-yellow-600 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-brandiaga-yellow-600 hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPolicy;
