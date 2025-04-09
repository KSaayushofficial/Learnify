"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  BookOpen,
  GraduationCap,
  Building,
  Search,
  ChevronRight,
  ArrowRight,
  Globe,
  Layers,
  Clock,
  Users,
  Star,
  Info,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function CourseSelectionPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [university, setUniversity] = useState("")
  const [courseType, setCourseType] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState(null)

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

  const universities = [
    { id: "tu", name: "Tribhuvan University (TU)", location: "Kathmandu", established: 1959, color: "#3B82F6" },
    { id: "pu", name: "Pokhara University (PU)", location: "Pokhara", established: 1997, color: "#10B981" },
    { id: "ku", name: "Kathmandu University (KU)", location: "Dhulikhel", established: 1991, color: "#F59E0B" },
    { id: "purbanchal", name: "Purbanchal University", location: "Biratnagar", established: 1993, color: "#8B5CF6" },
    { id: "mwu", name: "Mid-Western University", location: "Surkhet", established: 2010, color: "#EC4899" },
    { id: "fwu", name: "Far-Western University", location: "Kanchanpur", established: 2010, color: "#6366F1" },
  ]

  const courses = [
    {
      id: "bca",
      name: "Bachelor of Computer Application (BCA)",
      university: "tu",
      duration: "4 years",
      semesters: 8,
      subjects: 40,
      color: "#3B82F6",
      rating: 4.7,
      students: 12500,
      type: "computer-science",
    },
    {
      id: "bsccsit",
      name: "BSc. Computer Science & IT (BSc.CSIT)",
      university: "tu",
      duration: "4 years",
      semesters: 8,
      subjects: 45,
      color: "#10B981",
      rating: 4.8,
      students: 15000,
      type: "computer-science",
    },
    {
      id: "bim",
      name: "Bachelor of Information Management (BIM)",
      university: "tu",
      duration: "4 years",
      semesters: 8,
      subjects: 38,
      color: "#F59E0B",
      rating: 4.5,
      students: 9800,
      type: "management",
    },
    {
      id: "bit",
      name: "Bachelor of Information Technology (BIT)",
      university: "pu",
      duration: "4 years",
      semesters: 8,
      subjects: 42,
      color: "#8B5CF6",
      rating: 4.6,
      students: 7500,
      type: "computer-science",
    },
    {
      id: "be-computer",
      name: "Bachelor of Engineering in Computer",
      university: "pu",
      duration: "4 years",
      semesters: 8,
      subjects: 48,
      color: "#EC4899",
      rating: 4.9,
      students: 8200,
      type: "engineering",
    },
    {
      id: "bba",
      name: "Bachelor of Business Administration (BBA)",
      university: "ku",
      duration: "4 years",
      semesters: 8,
      subjects: 36,
      color: "#6366F1",
      rating: 4.5,
      students: 11000,
      type: "management",
    },
    {
      id: "bbm",
      name: "Bachelor of Business Management (BBM)",
      university: "ku",
      duration: "4 years",
      semesters: 8,
      subjects: 34,
      color: "#14B8A6",
      rating: 4.4,
      students: 9500,
      type: "management",
    },
    {
      id: "mca",
      name: "Master of Computer Applications (MCA)",
      university: "tu",
      duration: "2 years",
      semesters: 4,
      subjects: 20,
      color: "#F43F5E",
      rating: 4.7,
      students: 5200,
      type: "computer-science",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    if (searchQuery && !course.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by university
    if (university && course.university !== university) {
      return false
    }

    // Filter by course type
    if (courseType && course.type !== courseType) {
      return false
    }

    // Filter by tab
    if (activeTab !== "all" && course.type !== activeTab) {
      return false
    }

    return true
  })

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
    toast({
      title: "Course Selected",
      description: `You've selected ${course.name}. You can now explore subjects.`,
    })
  }

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

  return (
    <div className="container py-8 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <RotatingGlobe />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Course Selection</h1>
              <p className="text-muted-foreground">
                Choose your university and course to start your exam preparation journey
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Find Your Course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger id="university" className="rounded-md">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  {universities.map((uni) => (
                    <SelectItem key={uni.id} value={uni.id}>
                      {uni.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course-type">Course Type</Label>
              <Select value={courseType} onValueChange={setCourseType}>
                <SelectTrigger id="course-type" className="rounded-md">
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search Courses</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Search by course name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="all" className="rounded-full">
              All Courses
            </TabsTrigger>
            <TabsTrigger value="computer-science" className="rounded-full">
              Computer Science
            </TabsTrigger>
            <TabsTrigger value="management" className="rounded-full">
              Management
            </TabsTrigger>
            <TabsTrigger value="engineering" className="rounded-full">
              Engineering
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          {filteredCourses.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className="size-12 rounded-full" style={{ backgroundColor: `${course.color}20` }}>
                            <div
                              className="w-full h-full flex items-center justify-center text-lg font-bold"
                              style={{ color: course.color }}
                            >
                              {course.name.split(" ")[0].charAt(0)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                        <p className="text-muted-foreground mb-4">
                          {universities.find((uni) => uni.id === course.university)?.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.semesters} Semesters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.subjects} Subjects</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.students.toLocaleString()} Students</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {course.type === "computer-science"
                              ? "Computer Science"
                              : course.type === "management"
                                ? "Management"
                                : "Engineering"}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <RoamingLightButton className="w-full" onClick={() => handleSelectCourse(course)}>
                          Select Course
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </RoamingLightButton>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Info className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setSearchQuery("")
                  setUniversity("")
                  setCourseType("")
                  setActiveTab("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedCourse && (
        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md mt-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold flex items-center">
              <div className="size-8 rounded-full mr-2" style={{ backgroundColor: `${selectedCourse.color}20` }}>
                <div
                  className="w-full h-full flex items-center justify-center text-sm font-bold"
                  style={{ color: selectedCourse.color }}
                >
                  {selectedCourse.name.split(" ")[0].charAt(0)}
                </div>
              </div>
              <span>Selected Course: {selectedCourse.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                  <h4 className="font-medium flex items-center gap-2 mb-4">
                    <Building className="h-4 w-4 text-primary" />
                    <span>University Information</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">University:</span>
                      <span className="font-medium">
                        {universities.find((uni) => uni.id === selectedCourse.university)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{universities.find((uni) => uni.id === selectedCourse.university)?.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Established:</span>
                      <span>{universities.find((uni) => uni.id === selectedCourse.university)?.established}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                  <h4 className="font-medium flex items-center gap-2 mb-4">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Course Details</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{selectedCourse.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Semesters:</span>
                      <span>{selectedCourse.semesters}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Subjects:</span>
                      <span>{selectedCourse.subjects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Students Enrolled:</span>
                      <span>{selectedCourse.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" className="rounded-full" onClick={() => setSelectedCourse(null)}>
                  Change Selection
                </Button>
                <Link href="/exam-prep">
                  <RoamingLightButton>
                    Continue to Subjects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </RoamingLightButton>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              <span>Popular Universities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {universities.slice(0, 3).map((uni) => (
                <motion.div
                  key={uni.id}
                  className="p-4 rounded-lg border border-border/10 bg-background/80"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="size-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${uni.color}20`, color: uni.color }}
                    >
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{uni.name}</h4>
                      <p className="text-xs text-muted-foreground">{uni.location}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-3">
                    <span>Established {uni.established}</span>
                    <span>{courses.filter((c) => c.university === uni.id).length} courses</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full text-xs"
                    onClick={() => setUniversity(uni.id)}
                  >
                    View Courses
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

