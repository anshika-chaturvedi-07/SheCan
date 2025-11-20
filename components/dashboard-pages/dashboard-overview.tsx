"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  TrendingUp,
  Award,
  Users,
  ShoppingBag,
  Trash2,
  Edit,
  Eye,
  Target,
  ArrowUpRight,
  DollarSign,
  TrendingDown,
  Package,
  Star,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart } from "recharts";

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
  percentage: number;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  product: string | null;
  time: string;
  avatar: string;
  amount?: string;
}

interface Course {
  course: string;
  progress: number;
  students: number;
}

interface Product {
  id: number;
  name: string;
  status: "Active" | "Draft" | "Inactive";
  sales: number;
  revenue: string;
  rating: number;
  stock: number;
}

const revenueData = [
  { month: "January", revenue: 12000, orders: 45 },
  { month: "February", revenue: 15000, orders: 52 },
  { month: "March", revenue: 18000, orders: 61 },
  { month: "April", revenue: 22000, orders: 73 },
  { month: "May", revenue: 28000, orders: 89 },
  { month: "June", revenue: 35000, orders: 102 },
];

const salesData = [
  { category: "Jewelry", sales: 4200 },
  { category: "Skincare", sales: 3800 },
  { category: "Textiles", sales: 3200 },
  { category: "Home Decor", sales: 2900 },
  { category: "Accessories", sales: 2400 },
];

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(280, 80%, 65%)",
  },
  orders: {
    label: "Orders",
    color: "hsl(320, 75%, 70%)",
  },
} satisfies ChartConfig;

const salesChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(260, 70%, 60%)",
  },
} satisfies ChartConfig;

export default function DashboardOverview() {
  const stats: Stat[] = [
    {
      title: "Total Revenue",
      value: "₹1,45,231",
      change: "from last month",
      icon: DollarSign,
      trend: "up",
      percentage: 20.1,
    },
    {
      title: "Active Products",
      value: "24",
      change: "from last month",
      icon: ShoppingBag,
      trend: "up",
      percentage: 12.5,
    },
    {
      title: "Total Orders",
      value: "412",
      change: "from last month",
      icon: Package,
      trend: "up",
      percentage: 8.3,
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "from last month",
      icon: Star,
      trend: "up",
      percentage: 5.2,
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: 1,
      user: "Priya Sharma",
      action: "purchased",
      product: "Handmade Jewelry",
      time: "2h ago",
      avatar: "PS",
      amount: "₹2,499",
    },
    {
      id: 2,
      user: "Anita Desai",
      action: "reviewed",
      product: "Organic Skincare",
      time: "5h ago",
      avatar: "AD",
    },
    {
      id: 3,
      user: "Meera Patel",
      action: "purchased",
      product: "Cotton Saree",
      time: "1d ago",
      avatar: "MP",
      amount: "₹3,999",
    },
    {
      id: 4,
      user: "Kavita Singh",
      action: "added to cart",
      product: "Home Decor Set",
      time: "2d ago",
      avatar: "KS",
    },
  ];

  const learningProgress: Course[] = [
    { course: "Business Fundamentals", progress: 85, students: 234 },
    { course: "Digital Marketing Pro", progress: 60, students: 189 },
    { course: "Financial Management", progress: 40, students: 156 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Handmade Jewelry Collection",
      status: "Active",
      sales: 145,
      revenue: "₹52,500",
      rating: 4.9,
      stock: 23,
    },
    {
      id: 2,
      name: "Organic Skincare Bundle",
      status: "Active",
      sales: 132,
      revenue: "₹48,900",
      rating: 4.8,
      stock: 45,
    },
    {
      id: 3,
      name: "Premium Cotton Sarees",
      status: "Active",
      sales: 98,
      revenue: "₹38,200",
      rating: 4.7,
      stock: 12,
    },
    {
      id: 4,
      name: "Artisan Home Decor",
      status: "Draft",
      sales: 0,
      revenue: "₹0",
      rating: 0,
      stock: 0,
    },
  ];

  const handleDelete = (productId: number) => {
    console.log("Deleting product:", productId);
  };

  return (
    <div className="space-y-6 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-main/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-chart-3/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-main/10 via-chart-2/10 to-chart-3/10 border border-main/20 backdrop-blur-sm"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome Back, Priya!
          </h1>
          <p className="text-sm text-foreground/70 mt-1">
            Here's what's happening with your business today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-main hover:bg-main/90 shadow-lg shadow-main/30">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : TrendingDown;
          const colors = ['main', 'chart-2', 'chart-3', 'chart-4'];
          const color = colors[idx];
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="border-2 h-full relative overflow-hidden group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-secondary-background">
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-${color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                
                <CardHeader className="pb-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-foreground/70">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-xl bg-${color}/10 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 text-${color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 relative z-10">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                      stat.trend === "up" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}>
                      <TrendIcon
                        className={`h-3 w-3 ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      />
                      <span
                        className={
                          stat.trend === "up" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                        }
                      >
                        {stat.percentage}%
                      </span>
                    </div>
                    <span className="text-foreground/60">{stat.change}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4"
        >
        <Card className="border-2 h-full hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-secondary-background relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-main/5 rounded-full blur-3xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Analytics</CardTitle>
            <CardDescription className="text-xs">
              Monthly revenue trends for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig}>
              <AreaChart
                accessibilityLayer
                data={revenueData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="var(--chart-1)"
                  fillOpacity={0.4}
                  stroke="var(--chart-1)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
     
        </Card>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3"
        >
        <Card className="border-2 h-full hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-secondary-background relative overflow-hidden group">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-chart-2/5 rounded-full blur-3xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sales by Category</CardTitle>
            <CardDescription className="text-xs">
              Top performing product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesChartConfig}>
              <BarChart accessibilityLayer data={salesData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 8)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="sales" fill="var(--chart-1)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
            <div className="flex gap-2 leading-none font-medium">
              Jewelry leading sales <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none text-xs">
              Based on last 30 days
            </div>
          </CardFooter>
        </Card>
        </motion.div>
      </div>

      {/* Activity & Learning */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
        <Card className="border-2 h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-secondary-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-chart-2/10 rounded-full blur-2xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 text-sm border-b pb-3 last:border-0 last:pb-0"
                >
                  <Avatar className="h-9 w-9 border-2">
                    <AvatarFallback className="bg-violet-100 text-violet-600 text-xs font-medium">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>
                      {activity.product && (
                        <span className="font-medium"> {activity.product}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                      {activity.amount && (
                        <span className="ml-2 font-medium text-green-600">
                          {activity.amount}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
        <Card className="border-2 h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-secondary-background relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-main/10 rounded-full blur-2xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningProgress.map((course) => (
              <div key={course.course} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium truncate flex-1">
                    {course.course}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {course.students} students enrolled
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        </motion.div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
      <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-secondary-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-main/5 rounded-full blur-3xl" />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Product Management
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                View and manage your product listings
              </CardDescription>
            </div>
            <Button size="sm" className="h-8">
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Product</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Sales</TableHead>
                <TableHead className="text-xs">Revenue</TableHead>
                <TableHead className="text-xs">Rating</TableHead>
                <TableHead className="text-xs">Stock</TableHead>
                <TableHead className="text-right text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-sm">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Active" ? "default" : "neutral"
                      }
                      className="text-xs"
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{product.sales}</TableCell>
                  <TableCell className="text-sm">{product.revenue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.rating || "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm ${
                        product.stock < 20 && product.stock > 0
                          ? "text-orange-600"
                          : ""
                      }`}
                    >
                      {product.stock || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="neutral" size="icon" className="h-7 w-7">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="neutral" size="icon" className="h-7 w-7">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="neutral"
                            size="icon"
                            className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-2">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete {product.name}. This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="border-2 p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-main/5 to-main/10 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-main/20 rounded-xl group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6 text-main" />
            </div>
            <div>
              <h3 className="font-semibold">Create Product</h3>
              <p className="text-sm text-foreground/60">Add new items to sell</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-2 p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-chart-2/5 to-chart-2/10 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-chart-2/20 rounded-xl group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <h3 className="font-semibold">Start Learning</h3>
              <p className="text-sm text-foreground/60">Enroll in new courses</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-2 p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-chart-3/5 to-chart-3/10 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-chart-3/20 rounded-xl group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-chart-3" />
            </div>
            <div>
              <h3 className="font-semibold">Find Partners</h3>
              <p className="text-sm text-foreground/60">Connect with vendors</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
