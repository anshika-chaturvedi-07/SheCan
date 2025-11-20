"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Upload,
  Package,
  BarChart3,
  Settings,
  Palette,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Mango Pickle",
    price: 150,
    stock: 45,
    category: "Pickles",
    description: "Traditional mango pickle",
    image: "🥭",
  },
  {
    id: "2",
    name: "Mixed Vegetable Pickle",
    price: 180,
    stock: 32,
    category: "Pickles",
    description: "Mixed vegetables pickle",
    image: "🥒",
  },
];

export default function ManageStorePage() {
  const params = useParams();
  const router = useRouter();
  const storeName = params.storeName as string;
  const [products, setProducts] = React.useState<Product[]>(sampleProducts);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      category: newProduct.category,
      description: newProduct.description,
      image: "📦",
    };
    setProducts([...products, product]);
    setIsAddOpen(false);
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-main/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      {/* Header */}
      <header className="border-b-2 bg-background/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="neutral" size="sm" className="gap-2" asChild>
                <Link href="/business-setup/store-builder">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-heading font-bold capitalize flex items-center gap-2">
                  <Settings className="h-6 w-6 text-main" />
                  Manage {storeName.replace(/-/g, " ")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Update products and store settings
                </p>
              </div>
            </div>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-main to-chart-2 hover:shadow-xl" asChild>
              <Link href={`/store/${storeName}`} target="_blank">
                <Eye className="h-4 w-4" />
                Preview Store
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md h-12 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-main/10 to-chart-2/10 border-2 border-main/20 backdrop-blur-sm"
            >
              <div>
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                  <Package className="h-6 w-6 text-main" />
                  Products
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {products.length} products in your store
                </p>
              </div>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-main to-chart-2 hover:shadow-xl" size="lg">
                    <Plus className="h-5 w-5" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-2 bg-background/95 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-main/5 to-chart-2/5 rounded-lg -z-10" />
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      <Plus className="h-6 w-6 text-main" />
                      Add New Product
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      Add a product to your store inventory
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <div className="relative">
                      <Label className="text-sm font-semibold mb-2 block">Product Name</Label>
                      <Input
                        placeholder="e.g., Mango Pickle"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="h-12 border-2 rounded-xl bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Label className="text-sm font-semibold mb-2 block">Price (₹)</Label>
                        <Input
                          type="number"
                          placeholder="150"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                          className="h-12 border-2 rounded-xl bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                      <div className="relative">
                        <Label className="text-sm font-semibold mb-2 block">Stock</Label>
                        <Input
                          type="number"
                          placeholder="50"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: e.target.value,
                            })
                          }
                          className="h-12 border-2 rounded-xl bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Label className="text-sm font-semibold mb-2 block">Category</Label>
                      <Input
                        placeholder="e.g., Pickles"
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="h-12 border-2 rounded-xl bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="relative">
                      <Label className="text-sm font-semibold mb-2 block">Description</Label>
                      <Textarea
                        placeholder="Product description..."
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        className="border-2 rounded-xl bg-background/50 backdrop-blur-sm resize-none"
                        rows={4}
                      />
                    </div>
                    <Button
                      className="w-full h-14 text-base font-semibold bg-gradient-to-r from-main to-chart-2 hover:shadow-2xl rounded-xl"
                      onClick={handleAddProduct}
                      disabled={
                        !newProduct.name ||
                        !newProduct.price ||
                        !newProduct.stock ||
                        !newProduct.category
                      }
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                <Card className="border-2 hover:shadow-2xl transition-all bg-gradient-to-br from-background to-secondary-background">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-5xl bg-gradient-to-br from-main/10 to-chart-2/10 p-3 rounded-xl">{product.image}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-semibold">₹{product.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Stock</span>
                        <Badge
                          variant={
                            product.stock > 20 ? "default" : "neutral"
                          }
                        >
                          {product.stock} units
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Category</span>
                        <Badge variant="neutral">{product.category}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="neutral" size="sm" className="flex-1 hover:bg-main/10 hover:border-main">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="neutral"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:border-red-600"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>
                  Customize your store appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input
                    defaultValue={storeName.replace(/-/g, " ")}
                    className="capitalize"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Tell customers about your store..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Store Theme</Label>
                  <Select defaultValue="natural">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern Minimal</SelectItem>
                      <SelectItem value="elegant">Elegant Classic</SelectItem>
                      <SelectItem value="colorful">Vibrant & Bold</SelectItem>
                      <SelectItem value="natural">Earthy & Natural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Total Views", value: "342", icon: Eye },
                { title: "Total Sales", value: "28", icon: Package },
                { title: "Revenue", value: "₹4,200", icon: BarChart3 },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
