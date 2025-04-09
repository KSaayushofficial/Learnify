"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Users,
  BookOpen,
  FileText,
  Settings,
  PlusCircle,
  Edit,
  Trash,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Bell,
  Brain,
  UserPlus,
  Zap,
  Globe,
  Gauge,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedButton } from "@/components/animated-button"
import {
  BarChart as BarChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timeRange, setTimeRange] = useState("week")

  // Button with roaming light effect
  const RoamingLightButton = ({ children, ...props }) => {
    return (
      <motion.div
        className="relative overflow-hidden rounded-full"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button className="relative z-10 w-full rounded-full" {...props}>
          {children}
        </Button>
        <motion.div
          className="absolute top-0 left-0 size-10 bg-white/20 rounded-full blur-xl"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.div>
    )
  }

  // Sample data for charts
  const userActivityData = [
    { name: "Mon", users: 120 },
    { name: "Tue", users: 145 },
    { name: "Wed", users: 180 },
    { name: "Thu", users: 165 },
    { name: "Fri", users: 190 },
    { name: "Sat", users: 210 },
    { name: "Sun", users: 185 },
  ]

  const questionTypeData = [
    { name: "MCQs", value: 65, color: "#3B82F6" },
    { name: "Short Answers", value: 25, color: "#10B981" },
    { name: "Long Answers", value: 10, color: "#F59E0B" },
  ]

  const coursePopularityData = [
    { name: "BCA", students: 12500, questions: 4500 },
    { name: "BSc.CSIT", students: 15000, questions: 5200 },
    { name: "BIM", students: 9800, questions: 3800 },
    { name: "BIT", students: 7500, questions: 2900 },
    { name: "BE Computer", students: 8200, questions: 3100 },
  ]

  const recentQuestions = [
    {
      id: 1,
      question: "Explain the concept of polymorphism in OOP",
      subject: "OOP in Java",
      type: "Long Answer",
      status: "approved",
      date: "2023-11-28",
    },
    {
      id: 2,
      question: "What is the time complexity of heapify operation?",
      subject: "Data Structures",
      type: "Short Answer",
      status: "pending",
      date: "2023-11-27",
    },
    {
      id: 3,
      question: "Differentiate between TCP and UDP protocols",
      subject: "Computer Networks",
      type: "Short Answer",
      status: "approved",
      date: "2023-11-26",
    },
    {
      id: 4,
      question: "What is normalization in database design?",
      subject: "Database Systems",
      type: "MCQ",
      status: "rejected",
      date: "2023-11-25",
    },
    {
      id: 5,
      question: "Explain the working of virtual memory",
      subject: "Operating Systems",
      type: "Long Answer",
      status: "approved",
      date: "2023-11-24",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Aayush Sharma",
      email: "aayush@example.com",
      role: "Student",
      university: "Tribhuvan University",
      joinDate: "2023-11-20",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      role: "Student",
      university: "Pokhara University",
      joinDate: "2023-11-18",
      status: "active",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      role: "Teacher",
      university: "Kathmandu University",
      joinDate: "2023-11-15",
      status: "inactive",
    },
    {
      id: 4,
      name: "Sita Thapa",
      email: "sita@example.com",
      role: "Student",
      university: "Tribhuvan University",
      joinDate: "2023-11-12",
      status: "active",
    },
    {
      id: 5,
      name: "Binod Adhikari",
      email: "binod@example.com",
      role: "Admin",
      university: "Pokhara University",
      joinDate: "2023-11-10",
      status: "active",
    },
  ]

  const aiGenerationStats = [
    {
      id: 1,
      type: "MCQ Generation",
      count: 12500,
      growth: 15,
      status: "increasing",
    },
    {
      id: 2,
      type: "Short Answer Generation",
      count: 8700,
      growth: 12,
      status: "increasing",
    },
    {
      id: 3,
      type: "Long Answer Generation",
      count: 4300,
      growth: 8,
      status: "increasing",
    },
    {
      id: 4,
      type: "Answer Explanations",
      count: 18900,
      growth: 22,
      status: "increasing",
    },
  ]

  const platformInsights = [
    {
      title: "User Engagement",
      value: "85%",
      change: "+12%",
      status: "positive",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      description: "Active users engaging with content daily",
    },
    {
      title: "Content Quality",
      value: "92%",
      change: "+5%",
      status: "positive",
      icon: <FileText className="h-5 w-5 text-green-500" />,
      description: "Questions rated as high quality by users",
    },
    {
      title: "AI Accuracy",
      value: "94%",
      change: "+7%",
      status: "positive",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      description: "AI-generated answers matching expert responses",
    },
    {
      title: "System Performance",
      value: "99.8%",
      change: "+0.3%",
      status: "positive",
      icon: <Gauge className="h-5 w-5 text-amber-500" />,
      description: "Platform uptime and response efficiency",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Rotating Globe Component
  const RotatingGlobe = () => {
    return (
      <div className="relative size-16 md:size-20">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotateY: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Globe className="size-12 md:size-16 text-primary" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/80 to-transparent rounded-full blur-sm"></div>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <RotatingGlobe />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage courses, questions, and monitor platform activity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full relative">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                  <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 font-medium border-b">Admin Notifications</div>
                <div className="py-2 px-3 text-sm">
                  <div className="mb-2 pb-2 border-b">
                    <div className="font-medium">5 new questions need review</div>
                    <div className="text-muted-foreground text-xs">10 minutes ago</div>
                  </div>
                  <div className="mb-2 pb-2 border-b">
                    <div className="font-medium">New user registration spike detected</div>
                    <div className="text-muted-foreground text-xs">2 hours ago</div>
                  </div>
                  <div>
                    <div className="font-medium">AI model training completed</div>
                    <div className="text-muted-foreground text-xs">Yesterday</div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/admin/settings">
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="font-bold">A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} initial="hidden" animate="show">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">24,892</p>
                  <p className="text-xs text-green-500">+842 this month</p>
                </div>
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">48</p>
                  <p className="text-xs text-green-500">+3 this month</p>
                </div>
                <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Total Questions</p>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">25,430</p>
                  <p className="text-xs text-green-500">+1,245 this month</p>
                </div>
                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">AI Generations</p>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">44,400</p>
                  <p className="text-xs text-green-500">+5,320 this month</p>
                </div>
                <div className="size-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Brain className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users, courses, or questions..."
            className="pl-10 pr-4 rounded-full w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/admin/courses/new">
            <AnimatedButton>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Course
            </AnimatedButton>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="overview" className="rounded-full">
              Overview
            </TabsTrigger>
            <TabsTrigger value="questions" className="rounded-full">
              Questions
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-full">
              Users
            </TabsTrigger>
            <TabsTrigger value="ai-stats" className="rounded-full">
              AI Stats
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {platformInsights.map((insight, index) => (
              <motion.div key={index} variants={item}>
                <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="size-10 rounded-full bg-background flex items-center justify-center">
                        {insight.icon}
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          insight.status === "positive"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {insight.change}
                      </Badge>
                    </div>
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-3xl font-bold mt-1">{insight.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">User Activity (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userActivityData}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Question Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChartComponent>
                      <Pie
                        data={questionTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {questionTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    </PieChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Course Popularity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChartComponent data={coursePopularityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                      <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="students" name="Students" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="questions" name="Questions" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center justify-between">
                  <span>Recent Questions</span>
                  <Link href="/admin/questions">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuestions.map((question) => (
                    <motion.div
                      key={question.id}
                      className="p-3 rounded-lg border border-border/10 bg-background/80"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              {question.subject}
                            </Badge>
                            <Badge variant="outline" className="bg-muted/50">
                              {question.type}
                            </Badge>
                          </div>
                          <p className="text-sm">{question.question}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            question.status === "approved"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : question.status === "pending"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                          }
                        >
                          {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Added on {new Date(question.date).toLocaleDateString()}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center justify-between">
                  <span>Recent Users</span>
                  <Link href="/admin/users">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      className="p-3 rounded-lg border border-border/10 bg-background/80"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-muted/50">
                            {user.role}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "active"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Joined on {new Date(user.joinDate).toLocaleDateString()}</span>
                        <span>{user.university}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Question Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Link href="/admin/questions/new">
                    <AnimatedButton size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Question
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentQuestions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium">{question.id}</TableCell>
                        <TableCell className="max-w-xs truncate">{question.question}</TableCell>
                        <TableCell>{question.subject}</TableCell>
                        <TableCell>{question.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              question.status === "approved"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : question.status === "pending"
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(question.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Trash className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem>Reject</DropdownMenuItem>
                                <DropdownMenuItem>Generate AI Answer</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" className="rounded-full">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">User Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Link href="/admin/users/new">
                    <AnimatedButton size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.university}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "active"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Trash className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                <DropdownMenuItem>Disable Account</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" className="rounded-full">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-stats">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aiGenerationStats.map((stat) => (
              <motion.div key={stat.id} variants={item} initial="hidden" animate="show">
                <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.type}</p>
                      <Brain className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{stat.count.toLocaleString()}</p>
                        <p className="text-xs text-green-500">+{stat.growth}% this month</p>
                      </div>
                      <div className="size-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <Zap className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">AI Generation Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", mcq: 92, short: 88, long: 85 },
                        { month: "Feb", mcq: 93, short: 89, long: 86 },
                        { month: "Mar", mcq: 94, short: 90, long: 87 },
                        { month: "Apr", mcq: 94, short: 91, long: 88 },
                        { month: "May", mcq: 95, short: 92, long: 89 },
                        { month: "Jun", mcq: 96, short: 93, long: 90 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="mcq" name="MCQ Accuracy" stroke="#3B82F6" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="short"
                        name="Short Answer Accuracy"
                        stroke="#10B981"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="long"
                        name="Long Answer Accuracy"
                        stroke="#F59E0B"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">AI Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Time</span>
                      <span className="font-medium">1.2 seconds</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground">15% faster than last month</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>User Satisfaction</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground">Based on user feedback</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Error Rate</span>
                      <span className="font-medium">3.5%</span>
                    </div>
                    <Progress value={3.5} className="h-2" />
                    <p className="text-xs text-muted-foreground">1.2% lower than last month</p>
                  </div>

                  <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span>AI Model Status</span>
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">All systems operational</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Last model update: 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">AI Generation Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "AI-12345",
                          type: "MCQ Generation",
                          subject: "Computer Networks",
                          user: "system",
                          status: "success",
                          time: "2023-11-28 14:32:15",
                          duration: "1.3s",
                        },
                        {
                          id: "AI-12346",
                          type: "Short Answer",
                          subject: "Database Systems",
                          user: "aayush@example.com",
                          status: "success",
                          time: "2023-11-28 14:30:22",
                          duration: "2.1s",
                        },
                        {
                          id: "AI-12347",
                          type: "Long Answer",
                          subject: "OOP in Java",
                          user: "system",
                          status: "success",
                          time: "2023-11-28 14:28:05",
                          duration: "3.5s",
                        },
                        {
                          id: "AI-12348",
                          type: "Explanation",
                          subject: "Data Structures",
                          user: "priya@example.com",
                          status: "failed",
                          time: "2023-11-28 14:25:18",
                          duration: "0.8s",
                        },
                        {
                          id: "AI-12349",
                          type: "MCQ Generation",
                          subject: "Operating Systems",
                          user: "system",
                          status: "success",
                          time: "2023-11-28 14:20:45",
                          duration: "1.2s",
                        },
                      ].map((log, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{log.id}</TableCell>
                          <TableCell>{log.type}</TableCell>
                          <TableCell>{log.subject}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                log.status === "success"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : "bg-red-500/10 text-red-500 border-red-500/20"
                              }
                            >
                              {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.time}</TableCell>
                          <TableCell>{log.duration}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 rounded-full">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

