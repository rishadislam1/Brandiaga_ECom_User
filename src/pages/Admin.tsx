
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Users, MessageSquare } from "lucide-react";

// Define the Product type
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  featured: boolean;
  stock: number;
};

// Define the Subscriber type
type Subscriber = {
  id: string;
  email: string;
  date: string;
};

// Define the Contact Message type
type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
};

const Admin = () => {
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "",
    featured: false,
    stock: 0,
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  
  // Newsletter subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  
  // Contact messages state
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    // Load products from local storage on component mount
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    
    // Load subscribers from local storage
    const storedSubscribers = localStorage.getItem("subscribers");
    if (storedSubscribers) {
      setSubscribers(JSON.parse(storedSubscribers));
    }
    
    // Load contact messages from local storage
    const storedMessages = localStorage.getItem("contactMessages");
    if (storedMessages) {
      setContactMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save products to local storage whenever the products state changes
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  
  useEffect(() => {
    // Save subscribers to local storage
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
  }, [subscribers]);
  
  useEffect(() => {
    // Save contact messages to local storage
    localStorage.setItem("contactMessages", JSON.stringify(contactMessages));
  }, [contactMessages]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      setNewProduct((prev) => ({ ...prev, [name]: numberValue }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: 0 })); // Default to 0 if not a number
    }
  };

  // Fixed: Changed to use CheckedState directly
  const handleFeaturedChange = (checked: boolean) => {
    setNewProduct((prev) => ({ ...prev, featured: checked }));
  };

  const handleAddProduct = () => {
    const productWithId = {
      ...newProduct,
      id: `product-${Date.now()}`, // Generate a temporary ID
    };
    setProducts((prev) => [...prev, productWithId]);

    // Reset form
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      description: "",
      image: "",
      featured: false,
      stock: 0,
    });

    toast({
      title: "Product Added",
      description: "Product added successfully.",
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleEditedInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => {
      if (prev) {
        return { ...prev, [name]: value };
      } else {
        return prev;
      }
    });
  };

  const handleEditedNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseFloat(value);
    setEditedProduct((prev) => {
      if (prev) {
        return { ...prev, [name]: isNaN(numberValue) ? 0 : numberValue };
      } else {
        return prev;
      }
    });
  };

  // Fixed: Changed to use CheckedState directly
  const handleEditedFeaturedChange = (checked: boolean) => {
    setEditedProduct((prev) => {
      if (prev) {
        return { ...prev, featured: checked };
      } else {
        return prev;
      }
    });
  };

  const handleSaveProduct = () => {
    if (editedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editedProduct.id ? editedProduct : product
        )
      );
      setEditingProductId(null);
      setEditedProduct(null);
      toast({
        title: "Product Saved",
        description: "Product saved successfully.",
      });
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    toast({
      title: "Product Deleted",
      description: "Product deleted successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct(null);
  };
  
  const handleMarkAsRead = (messageId: string) => {
    setContactMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId ? { ...message, read: true } : message
      )
    );
  };
  
  const handleDeleteMessage = (messageId: string) => {
    setContactMessages(prevMessages =>
      prevMessages.filter(message => message.id !== messageId)
    );
    toast({
      title: "Message Deleted",
      description: "Contact message deleted successfully.",
    });
  };
  
  const handleDeleteSubscriber = (subscriberId: string) => {
    setSubscribers(prevSubscribers =>
      prevSubscribers.filter(subscriber => subscriber.id !== subscriberId)
    );
    toast({
      title: "Subscriber Deleted",
      description: "Subscriber removed successfully.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="subscribers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Subscribers</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Products Tab Content */}
        <TabsContent value="products">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Fill in the details to add a new product.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    type="text"
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleNumberInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    type="number"
                    id="stock"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleNumberInputChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  type="text"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={newProduct.featured}
                  onCheckedChange={handleFeaturedChange}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </CardContent>
          </Card>

          {/* Product List Table */}
          <Table>
            <TableCaption>A list of your products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    {editingProductId === product.id ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={handleSaveProduct}>
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={() => handleEditProduct(product)}>
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete
                                the product from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        {/* Subscribers Tab Content */}
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Subscribers</CardTitle>
              <CardDescription>Manage your newsletter subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of newsletter subscribers.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Date Subscribed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        No subscribers yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>{subscriber.date}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove this subscriber from your newsletter list.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSubscriber(subscriber.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Contact Messages Tab Content */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>Messages received through the contact form</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of contact form messages.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No messages yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    contactMessages.map((message) => (
                      <TableRow key={message.id} className={message.read ? "" : "bg-gray-50"}>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{message.date}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${message.read ? "bg-gray-200" : "bg-blue-100 text-blue-800"}`}>
                            {message.read ? "Read" : "Unread"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleMarkAsRead(message.id)}
                              disabled={message.read}
                            >
                              Mark as Read
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this message.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteMessage(message.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Product Modal */}
      {editingProductId && editedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="editName">Name</Label>
                <Input
                  type="text"
                  id="editName"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleEditedInputChange}
                />
              </div>
              <div>
                <Label htmlFor="editCategory">Category</Label>
                <Input
                  type="text"
                  id="editCategory"
                  name="category"
                  value={editedProduct.category}
                  onChange={handleEditedInputChange}
                />
              </div>
              <div>
                <Label htmlFor="editPrice">Price</Label>
                <Input
                  type="number"
                  id="editPrice"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleEditedNumberInputChange}
                />
              </div>
              <div>
                <Label htmlFor="editStock">Stock</Label>
                <Input
                  type="number"
                  id="editStock"
                  name="stock"
                  value={editedProduct.stock}
                  onChange={handleEditedNumberInputChange}
                />
              </div>
              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleEditedInputChange}
                />
              </div>
              <div>
                <Label htmlFor="editImage">Image URL</Label>
                <Input
                  type="text"
                  id="editImage"
                  name="image"
                  value={editedProduct.image}
                  onChange={handleEditedInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="editFeatured"
                  checked={editedProduct.featured}
                  onCheckedChange={handleEditedFeaturedChange}
                />
                <Label htmlFor="editFeatured">Featured</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button size="sm" onClick={handleSaveProduct}>
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
