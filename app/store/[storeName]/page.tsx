"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Store,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Package,
  Truck,
  Shield,
  ChevronLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Mango Pickle",
    price: 150,
    originalPrice: 200,
    image: "🥭",
    category: "Pickles",
    rating: 4.5,
    reviews: 24,
    inStock: true,
  },
  {
    id: "2",
    name: "Mixed Vegetable Pickle",
    price: 180,
    image: "🥒",
    category: "Pickles",
    rating: 4.8,
    reviews: 31,
    inStock: true,
  },
  {
    id: "3",
    name: "Lemon Pickle",
    price: 120,
    image: "🍋",
    category: "Pickles",
    rating: 4.3,
    reviews: 18,
    inStock: true,
  },
  {
    id: "4",
    name: "Chilli Pickle",
    price: 140,
    originalPrice: 170,
    image: "🌶️",
    category: "Pickles",
    rating: 4.6,
    reviews: 22,
    inStock: false,
  },
];

export default function SingleStorePage() {
  const params = useParams();
  const storeName = Array.isArray(params?.storeName) 
    ? params.storeName[0] 
    : params?.storeName || "";
  const [cart, setCart] = React.useState<string[]>([]);

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-white relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      {/* Header */}
      <header className="border-b-2 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="neutral" size="sm" asChild>
                <Link href="/business-setup/store-builder">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🥒</div>
                <div>
                  <h1 className="text-xl font-heading font-bold capitalize">
                    {storeName.replace(/-/g, " ")}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Authentic homemade products
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="neutral" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2 relative">
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-600 h-5 w-5 p-0 flex items-center justify-center">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Store Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
        <Card className="mb-8 border-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">100% Authentic</p>
                  <p className="text-xs text-muted-foreground">
                    Traditional recipes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">On orders above ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">Safe & encrypted</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Products */}
        <motion.div 
          className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-2 border-violet-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-heading font-bold flex items-center gap-2">
            <Package className="h-7 w-7 text-violet-600" />
            Our Products
          </h2>
          <p className="text-muted-foreground mt-1">{sampleProducts.length} products available</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sampleProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
            <Card
              className="border-2 hover:shadow-2xl hover:shadow-violet-500/20 transition-all bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center text-6xl relative">
                  {product.image}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-red-600">
                      SALE
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <Badge variant="neutral">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                    <Button
                      variant="neutral"
                      size="sm"
                      className="h-8 w-8 p-0 shrink-0"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <Badge variant="neutral" className="text-xs">
                    {product.category}
                  </Badge>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <Button
                    className="w-full gap-2"
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-base font-semibold mb-2">
            Powered by <strong className="text-violet-600">SheCan</strong> ✨
          </p>
          <p className="text-sm text-muted-foreground">
            Create your own store at shecan.com
          </p>
        </div>
      </footer>
    </div>
  );
}