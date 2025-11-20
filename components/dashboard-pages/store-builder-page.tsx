"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Store,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Settings,
  Package,
  ShoppingCart,
  Eye,
  Copy,
  CheckCircle2,
  Sparkles,
  Globe,
  Palette,
  Image as ImageIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StoreData {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  theme: string;
  logo: string;
  products: number;
  views: number;
  sales: number;
  status: "active" | "draft";
  createdAt: string;
}

const categories = [
  "Food & Beverages",
  "Handicrafts",
  "Beauty & Cosmetics",
  "Textiles & Clothing",
  "Home Decor",
  "Jewelry & Accessories",
  "Organic Products",
  "Baked Goods",
];

const themes = [
  { value: "modern", label: "Modern Minimal", preview: "🎨" },
  { value: "elegant", label: "Elegant Classic", preview: "✨" },
  { value: "colorful", label: "Vibrant & Bold", preview: "🌈" },
  { value: "natural", label: "Earthy & Natural", preview: "🌿" },
];

// Cloudinary images for stores
const storeImages = {
  food: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
  handicrafts: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
  beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  textiles: "https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=800&q=80",
  jewelry: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  default: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
};

const sampleStores: StoreData[] = [
  {
    id: "1",
    name: "Priya's Pickles",
    slug: "priyas-pickles",
    description: "Authentic homemade pickles with traditional recipes passed down through generations",
    category: "Food & Beverages",
    theme: "natural",
    logo: storeImages.food,
    products: 12,
    views: 342,
    sales: 28,
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Anjali Handicrafts",
    slug: "anjali-handicrafts",
    description: "Beautiful handmade home decor items crafted with love and tradition",
    category: "Handicrafts",
    theme: "elegant",
    logo: storeImages.handicrafts,
    products: 24,
    views: 521,
    sales: 45,
    status: "active",
    createdAt: "2025-01-10",
  },
  {
    id: "3",
    name: "Beauty by Sara",
    slug: "beauty-by-sara",
    description: "Natural beauty products for glowing skin, made with organic ingredients",
    category: "Beauty & Cosmetics",
    theme: "modern",
    logo: storeImages.beauty,
    products: 8,
    views: 156,
    sales: 12,
    status: "draft",
    createdAt: "2025-01-20",
  },
];

export default function StoreBuilderPage() {
  const router = useRouter();
  const [stores, setStores] = React.useState<StoreData[]>(sampleStores);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);
  const [newStore, setNewStore] = React.useState({
    name: "",
    description: "",
    category: "",
    theme: "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleCreateStore = () => {
    const slug = generateSlug(newStore.name);
    const store: StoreData = {
      id: Date.now().toString(),
      name: newStore.name,
      slug,
      description: newStore.description,
      category: newStore.category,
      theme: newStore.theme,
      logo: "🏪",
      products: 0,
      views: 0,
      sales: 0,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setStores([...stores, store]);
    setIsCreateOpen(false);
    setNewStore({ name: "", description: "", category: "", theme: "" });
    router.push(`/store/${slug}/manage`);
  };

  const handleDeleteStore = (id: string) => {
    setStores(stores.filter((store) => store.id !== id));
  };

  const copyStoreLink = (slug: string) => {
    const link = `${window.location.origin}/store/${slug}`;
    navigator.clipboard.writeText(link);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-main/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-chart-3/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-main/10 via-chart-2/10 to-chart-3/10 border border-main/20 backdrop-blur-sm"
      >
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1 flex items-center gap-2">
            <Store className="w-8 h-8 text-main" />
            Your Stores
          </h1>
          <p className="text-foreground/70">
            Create and manage your online stores with ease
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-main hover:bg-main/90 shadow-lg shadow-main/30" size="lg">
              <Plus className="h-4 w-4" />
              Create New Store
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl border-2 bg-background/95 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-main/5 via-chart-2/5 to-chart-3/5 rounded-lg -z-10" />
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </motion.div>
                Create Your Store
              </DialogTitle>
              <DialogDescription className="text-base">
                Set up your online store in minutes ✨
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* Store Name - Floating Label */}
              <div className="relative group">
                <Input
                  id="storeName"
                  placeholder=" "
                  value={newStore.name}
                  onChange={(e) =>
                    setNewStore({ ...newStore, name: e.target.value })
                  }
                  className="peer h-14 pt-6 pb-2 px-4 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
                />
                <Label 
                  htmlFor="storeName" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-main peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Store Name
                </Label>
                <AnimatePresence>
                {newStore.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 px-3 py-2 rounded-lg bg-main/10 border border-main/20"
                  >
                    <p className="text-xs text-main font-medium flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Your store URL: <span className="font-mono">/store/{generateSlug(newStore.name)}</span>
                    </p>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>

              {/* Description - Floating Label */}
              <div className="relative group">
                <Textarea
                  id="description"
                  placeholder=" "
                  rows={4}
                  value={newStore.description}
                  onChange={(e) =>
                    setNewStore({ ...newStore, description: e.target.value })
                  }
                  className="peer pt-6 pb-2 px-4 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none"
                />
                <Label 
                  htmlFor="description" 
                  className="absolute left-4 top-4 text-muted-foreground transition-all pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-main peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Store Description
                </Label>
              </div>

              {/* Category & Theme - Modern Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <Label htmlFor="category" className="text-xs font-semibold text-muted-foreground mb-2 block">Category</Label>
                  <Select
                    value={newStore.category}
                    onValueChange={(value) =>
                      setNewStore({ ...newStore, category: value })
                    }
                  >
                    <SelectTrigger id="category" className="h-12 border-2 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="rounded-lg">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Label htmlFor="theme" className="text-xs font-semibold text-muted-foreground mb-2 block">Store Theme</Label>
                  <Select
                    value={newStore.theme}
                    onValueChange={(value) =>
                      setNewStore({ ...newStore, theme: value })
                    }
                  >
                    <SelectTrigger id="theme" className="h-12 border-2 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all">
                      <SelectValue placeholder="Pick a theme" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2">
                      {themes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value} className="rounded-lg">
                          {theme.preview} {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Create Button - Gradient & Animated */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full gap-2 h-14 text-base font-semibold bg-gradient-to-r from-main via-violet-600 to-chart-2 hover:shadow-2xl hover:shadow-main/50 transition-all duration-300 rounded-xl"
                  onClick={handleCreateStore}
                  disabled={
                    !newStore.name ||
                    !newStore.description ||
                    !newStore.category ||
                    !newStore.theme
                  }
                >
                  <Sparkles className="h-5 w-5" />
                  Create Store
                </Button>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            title: "Total Stores",
            value: stores.length,
            icon: Store,
            color: "main",
          },
          {
            title: "Active Stores",
            value: stores.filter((s) => s.status === "active").length,
            icon: CheckCircle2,
            color: "chart-2",
          },
          {
            title: "Total Products",
            value: stores.reduce((acc, s) => acc + s.products, 0),
            icon: Package,
            color: "chart-3",
          },
          {
            title: "Total Sales",
            value: stores.reduce((acc, s) => acc + s.sales, 0),
            icon: ShoppingCart,
            color: "chart-4",
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="border-2 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-secondary-background">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                <CardContent className="p-4 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-${stat.color}/10 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 text-${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-foreground/70">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stores Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
        {stores.map((store, idx) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
          >
          <Card className="border-2 hover:shadow-2xl hover:shadow-main/20 transition-all duration-300 overflow-hidden group bg-gradient-to-br from-background to-secondary-background relative">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-main/5 rounded-full blur-3xl group-hover:bg-main/10 transition-colors" />
            
            {/* Store Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-main/10 to-chart-2/10">
              <Image
                src={store.logo}
                alt={store.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                priority={idx < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge
                variant={store.status === "active" ? "default" : "neutral"}
                className={`absolute top-3 right-3 ${store.status === "active" ? "bg-green-600" : ""}`}
              >
                {store.status}
              </Badge>
            </div>
            
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-xl">{store.name}</CardTitle>
              <CardDescription className="text-sm line-clamp-2">
                {store.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-main/5 hover:bg-main/10 transition-colors">
                  <Package className="w-4 h-4 text-main mx-auto mb-1" />
                  <p className="text-xs text-foreground/70 mb-1">Products</p>
                  <p className="font-bold text-lg">{store.products}</p>
                </div>
                <div className="p-3 rounded-xl bg-chart-2/5 hover:bg-chart-2/10 transition-colors">
                  <Eye className="w-4 h-4 text-chart-2 mx-auto mb-1" />
                  <p className="text-xs text-foreground/70 mb-1">Views</p>
                  <p className="font-bold text-lg">{store.views}</p>
                </div>
                <div className="p-3 rounded-xl bg-chart-3/5 hover:bg-chart-3/10 transition-colors">
                  <ShoppingCart className="w-4 h-4 text-chart-3 mx-auto mb-1" />
                  <p className="text-xs text-foreground/70 mb-1">Sales</p>
                  <p className="font-bold text-lg">{store.sales}</p>
                </div>
              </div>

              {/* Store Info */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="neutral" className="text-xs">
                    {store.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Store URL</span>
                  <button
                    onClick={() => copyStoreLink(store.slug)}
                    className="flex items-center gap-1 text-violet-600 hover:underline"
                  >
                    {copiedSlug === store.slug ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>/store/{store.slug}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="neutral"
                  size="sm"
                  className="gap-1 hover:bg-main/10 hover:text-main hover:border-main"
                  asChild
                >
                  <Link href={`/store/${store.slug}`} target="_blank">
                    <Eye className="h-4 w-4" />
                    View Store
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="gap-1 bg-main hover:bg-main/90"
                  asChild
                >
                  <Link href={`/store/${store.slug}/manage`}>
                    <Settings className="h-4 w-4" />
                    Manage
                  </Link>
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="neutral"
                  size="sm"
                  className="flex-1 gap-1 hover:bg-chart-2/10 hover:text-chart-2 hover:border-chart-2"
                  onClick={() => copyStoreLink(store.slug)}
                >
                  {copiedSlug === store.slug ? (
                    <><CheckCircle2 className="h-4 w-4" /> Copied!</>
                  ) : (
                    <><ExternalLink className="h-4 w-4" /> Share</>
                  )}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="neutral" size="sm" className="text-red-600 hover:bg-red-50 hover:border-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Store?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete &quot;{store.name}&quot; and all its
                        products. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteStore(store.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        ))}
        </AnimatePresence>

        {/* Create New Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: stores.length * 0.1 }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
        <Card
          className="border-2 border-dashed hover:border-main hover:shadow-2xl hover:shadow-main/20 transition-all duration-300 cursor-pointer bg-gradient-to-br from-main/5 to-chart-2/5 relative overflow-hidden group"
          onClick={() => setIsCreateOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-main/10 to-chart-2/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center min-h-[400px] relative z-10">
            <motion.div 
              className="bg-main/20 p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Plus className="h-10 w-10 text-main" />
            </motion.div>
            <h3 className="font-bold text-xl mb-2">Create New Store</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Set up a new online store in minutes
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="neutral" className="text-xs">✓ Easy Setup</Badge>
              <Badge variant="neutral" className="text-xs">✓ Custom Design</Badge>
              <Badge variant="neutral" className="text-xs">✓ ONDC Ready</Badge>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
      <Card className="border-2 bg-gradient-to-br from-main/10 via-chart-2/10 to-chart-3/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-main/10 rounded-full blur-3xl" />
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-main/20 p-4 rounded-2xl shrink-0">
              <Globe className="h-8 w-8 text-main" />
            </div>
            <div className="space-y-3 flex-1">
              <h3 className="font-bold text-2xl">
                Your stores are live on the web!
              </h3>
              <p className="text-foreground/70">
                Each store gets a unique URL that you can share with customers.
                Manage products, track sales, and customize your store design from
                the manage panel. Start selling in minutes!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                <Badge variant="neutral" className="justify-center py-2">✓ Custom branding</Badge>
                <Badge variant="neutral" className="justify-center py-2">✓ Multiple stores</Badge>
                <Badge variant="neutral" className="justify-center py-2">✓ Product management</Badge>
                <Badge variant="neutral" className="justify-center py-2">✓ Sales tracking</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}