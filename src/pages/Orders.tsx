import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Calendar, FileText, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GetOrderRequest } from "@/Request/OrderRequest";
import { UserProfile } from "@/Request/AuthRequest";
import { GetProductById } from "@/Request/ProductRequest";
import { toast } from "react-toastify"; // For user feedback
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import { baseURL } from "../hooks/UseAxiosSecure";

const Orders = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [products, setProducts] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(null); // Track orderId being processed
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const res = await GetOrderRequest(userData.userId);
        const fetchedOrders = res.data || [];
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);

        const productIds = [
          ...new Set(
            fetchedOrders.flatMap((order) =>
              order.orderItems.map((item) => item.productId),
            ),
          ),
        ];
        const productPromises = productIds.map((id) => GetProductById(id));
        const productResponses = await Promise.all(productPromises);

        const productMap = productResponses.reduce((acc, res) => {
          if (res.data) {
            acc[res.data.productId] = res.data;
          }
          return acc;
        }, {});
        setProducts(productMap);
      } catch (error) {
        console.error("Failed to fetch orders or products:", error);
        toast.error("Failed to load orders. Please refresh the page.");
      }
    })();

    (async () => {
      try {
        const res = await UserProfile();
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast.error("Failed to load user profile.");
      }
    })();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...orders];

    try {
      // Apply date filters
      const now = new Date();
      if (activeFilter === "last30days") {
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        result = result.filter(
          (order) => new Date(order.orderDate) >= thirtyDaysAgo,
        );
      } else if (activeFilter === "last3months") {
        const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
        result = result.filter(
          (order) => new Date(order.orderDate) >= threeMonthsAgo,
        );
      } else if (activeFilter === "archived") {
        result = result.filter((order) => order.isArchived === true);
      }

      // Apply search query
      if (searchQuery.trim()) {
        const lowerQuery = searchQuery.toLowerCase();
        result = result.filter(
          (order) =>
            order.orderId.toLowerCase().includes(lowerQuery) ||
            order.orderItems.some((item) =>
              item.productName.toLowerCase().includes(lowerQuery),
            ),
        );
      }

      setFilteredOrders(result);
    } catch (error) {
      console.error("Error applying filters:", error);
      toast.error("Error filtering orders. Showing all orders.");
      setFilteredOrders(orders);
    }
  }, [activeFilter, searchQuery, orders]);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSearchQuery(""); // Reset search when changing filters
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
  };

  const generateInvoice = async (order) => {
    setIsGeneratingInvoice(order.orderId);
    try {
      // LaTeX template
      const latexTemplate = `
% Setting up the document class for a professional invoice
\\documentclass[a4paper,12pt]{article}

% Including necessary packages from texlive-full
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{booktabs}
\\usepackage{array}
\\usepackage{calc}
\\usepackage{eurosym}
\\usepackage{fancyhdr}
\\usepackage{lastpage}
\\usepackage{datetime}

% Configuring page geometry for a clean layout
\\geometry{left=2cm,right=2cm,top=2cm,bottom=2cm}

% Setting up fonts
\\usepackage{lmodern}

% Defining custom commands for consistent styling
\\newcommand{\\companyName}{Your Company Name}
\\newcommand{\\companyAddress}{123 Business Street, Dhaka, Bangladesh}
\\newcommand{\\companyEmail}{support@yourcompany.com}

% Setting up header and footer
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{\\textbf{\\companyName}}
\\fancyhead[R]{Invoice}
\\fancyfoot[C]{\\thepage\\ of \\pageref{LastPage}}

% Formatting the date
\\newdateformat{invoiceDate}{\\monthname[\\THEMONTH] \\THEDAY, \\THEYEAR}

\\begin{document}

% Adding company header
\\begin{center}
    \\textbf{\\LARGE \\companyName} \\\\
    \\vspace{0.2cm}
    \\companyAddress \\\\
    \\companyEmail \\\\
    \\vspace{0.5cm}
    \\textbf{Invoice} \\\\
    \\vspace{0.2cm}
    Invoice \\#: ${order.orderId} \\\\
    Date: \\invoiceDate\\${new Date(order.orderDate)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "")}
\\end{center}

% Adding billing information
\\vspace{0.5cm}
\\begin{tabular}{@{}p{0.45\\textwidth} p{0.45\\textwidth}@{}}
    \\textbf{Billed To:} & \\\\
    ${userData.firstName || "Unknown"} ${userData.lastName || "User"} & \\\\
    ${(userData.address || "No address provided").replace(/&/g, "\\&")} & \\\\
\\end{tabular}

% Adding order items table
\\vspace{0.5cm}
\\begin{center}
    \\begin{tabular}{p{0.5\\textwidth} r r r}
        \\toprule
        \\textbf{Description} & \\textbf{Qty} & \\textbf{Unit Price} & \\textbf{Total} \\\\
        \\midrule
        ${order.orderItems
          .map(
            (item) =>
              `${(item.productName || "Unknown Item").replace(/&/g, "\\&")} & ${
                item.quantity || 1
              } & \\$${(item.unitPrice || 0).toFixed(2)} & \\$${(
                (item.quantity || 1) * (item.unitPrice || 0)
              ).toFixed(2)} \\\\`,
          )
          .join("\n        ")}
        \\midrule
        \\multicolumn{3}{r}{\\textbf{Total}} & \\textbf{\$${
          order.totalAmount?.toFixed(2) || "0.00"
        }} \\\\
        \\bottomrule
    \\end{tabular}
\\end{center}

% Adding footer note
\\vspace{0.5cm}
\\begin{center}
    Thank you for your business! \\\\
    For inquiries, please contact \\companyEmail
\\end{center}

\\end{document}
`;

      // Download .tex file as fallback
      const blob = new Blob([latexTemplate], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${order.orderId}.tex`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success(
        "Invoice file generated. Compile it using a LaTeX editor (e.g., Overleaf) to view the PDF.",
      );
    } catch (error) {
      console.error("Failed to generate invoice:", error);
      toast.error("Failed to generate invoice. Please try again.");
    } finally {
      setIsGeneratingInvoice(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Your Orders & Returns
        </h1>
        <Link to="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="orders" className="text-lg">
            Orders
          </TabsTrigger>
          <TabsTrigger value="returns" className="text-lg">
            Returns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Filter Orders</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("all")}>
                  All Orders
                </Button>
                <Button
                  variant={
                    activeFilter === "last30days" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleFilterChange("last30days")}>
                  Last 30 Days
                </Button>
                <Button
                  variant={
                    activeFilter === "last3months" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleFilterChange("last3months")}>
                  Last 3 Months
                </Button>

                <Button
                  variant={activeFilter === "archived" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("archived")}>
                  Archived Orders
                </Button>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Search by order ID or product name"
              className="w-full p-2 border rounded-md mb-4"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="mb-4 text-gray-600">
                No orders match your filter or search criteria.
              </p>
              <Link to="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div
                    className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between gap-4 cursor-pointer"
                    onClick={() => toggleOrder(order.orderId)}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">
                          ORDER #:
                        </span>
                        <span className="font-medium">{order.orderId}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Placed on {formatDate(order.orderDate)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">
                          TOTAL:
                        </span>
                        <span className="font-medium">
                          ${order.totalAmount?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium 
                            ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                          {order.status || "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {expandedOrder === order.orderId ? (
                        <ArrowUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ArrowDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedOrder === order.orderId && (
                    <div className="p-4 border-t border-gray-200 animate-fade-in">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">
                            Items in this order
                          </h3>
                          <div className="space-y-4">
                            {order?.orderItems?.map((item) => {
                              const product = products[item.productId];
                              const imageUrl = `${baseURL}${product.imageUrls[0]}`;

                              return (
                                <div
                                  key={item.orderItemId}
                                  className="flex gap-4">
                                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                    <img
                                      src={imageUrl}
                                      alt={item.productName || "Product"}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium line-clamp-1">
                                      {item.productName || "Unknown Item"}
                                    </h4>
                                    <div className="text-sm text-gray-600 mt-1">
                                      <span>Qty: {item.quantity || 1}</span>
                                      <span className="ml-3">
                                        ${(item.unitPrice || 0).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="mt-2">
                                      {order.status === "Delivered" && (
                                        <>
                                          <Link
                                            to={`/returns/${order.orderId}?itemId=${item.orderItemId}`}>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="mr-2">
                                              Return
                                            </Button>
                                          </Link>
                                          <Button variant="ghost" size="sm">
                                            Buy Again
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }) || (
                              <p className="text-sm text-gray-600">
                                No items found for this order.
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="md:w-1/3">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-3">Shipping Info</h3>
                            <p className="text-sm mb-3">
                              {userData?.address || "Address not available"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Tracking information not available
                            </p>
                          </div>

                          <div className="mt-4 flex flex-col space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="justify-start"
                              onClick={() => generateInvoice(order)}
                              disabled={isGeneratingInvoice === order.orderId}>
                              <FileText className="h-4 w-4 mr-2" />
                              {isGeneratingInvoice === order.orderId
                                ? "Generating..."
                                : "View Invoice"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="justify-start">
                              <Package className="h-4 w-4 mr-2" />
                              Get help with this order
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="returns" className="space-y-6">
          {returns.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No returns found</h3>
              <p className="mb-4 text-gray-600">
                You haven't made any returns yet.
              </p>
              <Link to="/orders">
                <Button variant="outline">View Your Orders</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {returns.map((returnItem) => (
                <div
                  key={returnItem.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">
                          RETURN #:
                        </span>
                        <span className="font-medium">{returnItem.id}</span>
                        <span className="text-sm text-gray-500">
                          for order {returnItem.orderId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Requested on {formatDate(returnItem.date)}
                        </span>
                      </div>
                      <div className="mt-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                          {returnItem.status || "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">
                          REFUND:
                        </span>
                        <span className="font-medium">
                          ${(returnItem.refundAmount || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800`}>
                          {returnItem.refundStatus || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-medium mb-2">Return Items</h3>
                  <div className="space-y-4">
                    {returnItem?.items?.map((item) => {
                      const product = products[item.productId];
                      const imageUrl = `${baseURL}${product?.imageUrls[0]}`;

                      return (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={imageUrl}
                              alt={item.name || "Product"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium line-clamp-1">
                              {item.name || "Unknown Item"}
                            </h4>
                            <div className="text-sm text-gray-600 mt-1">
                              <span>Qty: {item.quantity || 1}</span>
                              <span className="ml-3">
                                ${(item.price || 0).toFixed(2)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Reason:</span>{" "}
                              {item.reason || "No reason provided"}
                            </p>
                          </div>
                        </div>
                      );
                    }) || (
                      <p className="text-sm text-gray-600">
                        No items found for this return.
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <Button size="sm" variant="outline">
                      Get Return Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
