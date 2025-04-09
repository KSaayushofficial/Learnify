"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Search,
  Star,
  ArrowRight,
  Filter,
  ChevronDown,
  Building,
  GraduationCap,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { QuestionFilter } from "@/components/question-filter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function PastQuestionsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [course, setCourse] = useState("")
  const [subject, setSubject] = useState("")
  const [year, setYear] = useState("")
  const [university, setUniversity] = useState("")
  const [activeTab, setActiveTab] = useState("papers")

  const handleFilterChange = (filters: { difficulty: string; popularity: string; relevance: string }) => {
    toast({
      title: "Filters applied",
      description: "Questions have been filtered based on your criteria.",
    })
  }

  const pastPapers = [
    {
      id: 1,
      title: "BCA 3rd Semester - Object-Oriented Programming",
      university: "Tribhuvan University",
      year: "2022",
      semester: "Spring",
      questions: 7,
      duration: "3 hours",
      downloads: 1245,
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "BSc.CSIT 4th Semester - Database Management Systems",
      university: "Tribhuvan University",
      year: "2022",
      semester: "Fall",
      questions: 8,
      duration: "3 hours",
      downloads: 987,
      color: "#10B981",
    },
    {
      id: 3,
      title: "BIM 3rd Semester - Web Technology",
      university: "Pokhara University",
      year: "2022",
      semester: "Spring",
      questions: 6,
      duration: "3 hours",
      downloads: 756,
      color: "#F59E0B",
    },
    {
      id: 4,
      title: "BCA 4th Semester - Computer Networks",
      university: "Tribhuvan University",
      year: "2021",
      semester: "Fall",
      questions: 7,
      duration: "3 hours",
      downloads: 1102,
      color: "#8B5CF6",
    },
    {
      id: 5,
      title: "BSc.CSIT 5th Semester - Operating Systems",
      university: "Kathmandu University",
      year: "2021",
      semester: "Spring",
      questions: 8,
      duration: "3 hours",
      downloads: 845,
      color: "#EC4899",
    },
    {
      id: 6,
      title: "BIT 3rd Semester - Software Engineering",
      university: "Purbanchal University",
      year: "2021",
      semester: "Fall",
      questions: 7,
      duration: "3 hours",
      downloads: 632,
      color: "#6366F1",
    },
  ]

  const importantQuestions = [
    {
      id: 1,
      subject: "Object-Oriented Programming",
      question: "Explain the four principles of OOP with examples.",
      frequency: "High",
      marks: 10,
      university: "Tribhuvan University",
      color: "#3B82F6",
    },
    {
      id: 2,
      subject: "Database Management Systems",
      question: "What is normalization? Explain 1NF, 2NF, and 3NF with examples.",
      frequency: "High",
      marks: 8,
      university: "Tribhuvan University",
      color: "#10B981",
    },
    {
      id: 3,
      subject: "Computer Networks",
      question: "Explain the OSI model and its layers in detail.",
      frequency: "High",
      marks: 10,
      university: "Pokhara University",
      color: "#F59E0B",
    },
    {
      id: 4,
      subject: "Operating Systems",
      question: "Describe different CPU scheduling algorithms with examples.",
      frequency: "Medium",
      marks: 8,
      university: "Kathmandu University",
      color: "#8B5CF6",
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

  return (
    <div className="container py-10 md:py-16 space-y-12">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Past Exam Questions</h1>
          <p className="text-muted-foreground">
            Access previous years' exam papers from various Nepali universities and courses to help you prepare
            effectively.
          </p>
        </div>
      </div>

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Search Past Papers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger id="course" className="rounded-md">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="bsccsit">BSc.CSIT</SelectItem>
                  <SelectItem value="bim">BIM</SelectItem>
                  <SelectItem value="bit">BIT</SelectItem>
                  <SelectItem value="be-computer">BE Computer</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger id="university" className="rounded-md">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tu">Tribhuvan University (TU)</SelectItem>
                  <SelectItem value="pu">Pokhara University (PU)</SelectItem>
                  <SelectItem value="ku">Kathmandu University (KU)</SelectItem>
                  <SelectItem value="purbanchal">Purbanchal University</SelectItem>
                  <SelectItem value="mwu">Mid-Western University</SelectItem>
                  <SelectItem value="fwu">Far-Western University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject" className="rounded-md">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oop-java">OOP in Java</SelectItem>
                  <SelectItem value="data-structures">Data Structures</SelectItem>
                  <SelectItem value="database">Database Systems</SelectItem>
                  <SelectItem value="networks">Computer Networks</SelectItem>
                  <SelectItem value="web-tech">Web Technology</SelectItem>
                  <SelectItem value="os">Operating Systems</SelectItem>
                  <SelectItem value="software-engineering">Software Engineering</SelectItem>
                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year" className="rounded-md">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by keyword..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <QuestionFilter onFilterChange={handleFilterChange} />

              <Button className="rounded-full">
                <Search className="mr-2 h-4 w-4" />
                Search Papers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="papers" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="papers" className="rounded-full">
              Past Papers
            </TabsTrigger>
            <TabsTrigger value="important-questions" className="rounded-full">
              Important Questions
            </TabsTrigger>
            <TabsTrigger value="analysis" className="rounded-full">
              Exam Analysis
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="papers">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Exam Papers</h2>
              <Button variant="outline" className="rounded-full">
                <Calendar className="mr-2 h-4 w-4" />
                View All Years
              </Button>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {pastPapers.map((paper) => (
                <motion.div key={paper.id} variants={item}>
                  <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className="size-12 rounded-full" style={{ backgroundColor: `${paper.color}20` }}>
                            <div
                              className="w-full h-full flex items-center justify-center text-lg font-bold"
                              style={{ color: paper.color }}
                            >
                              {paper.title.charAt(0)}
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {paper.year} {paper.semester}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{paper.title}</h3>
                        <p className="text-muted-foreground mb-4 flex-grow">{paper.university}</p>
                        <div className="space-y-2 mt-auto">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Questions:</span>
                            <span className="font-medium">{paper.questions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{paper.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Downloads:</span>
                            <span className="font-medium">{paper.downloads}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex gap-2">
                        <Button variant="outline" className="flex-1 rounded-full">
                          Preview
                        </Button>
                        <Button className="flex-1 rounded-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="important-questions">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Sort By
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Frequency (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem>Marks (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem>Most Recent</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {importantQuestions.map((question, index) => (
                <AccordionItem
                  key={question.id}
                  value={`question-${question.id}`}
                  className="border-b border-border/10"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-start gap-4 text-left">
                      <div
                        className="size-10 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${question.color}20` }}
                      >
                        <div
                          className="w-full h-full flex items-center justify-center text-lg font-bold"
                          style={{ color: question.color }}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {question.subject}
                          </Badge>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                            {question.frequency} Frequency
                          </Badge>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            {question.marks} Marks
                          </Badge>
                        </div>
                        <h3 className="font-medium">{question.question}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{question.university}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                        <h4 className="font-medium text-green-500 mb-2">Model Answer</h4>
                        <p className="text-sm">
                          {question.subject === "Object-Oriented Programming" && (
                            <>
                              The four principles of Object-Oriented Programming are:
                              <ol className="list-decimal pl-5 mt-2 space-y-2">
                                <li>
                                  <strong>Encapsulation:</strong> The bundling of data and methods that operate on that
                                  data within a single unit (class). It restricts direct access to some of an object's
                                  components, which is a means of preventing unintended interference and misuse of the
                                  data.
                                </li>
                                <li>
                                  <strong>Inheritance:</strong> The mechanism by which one class can inherit the
                                  attributes and methods of another class. This promotes code reuse and establishes a
                                  relationship between the parent class and child classes.
                                </li>
                                <li>
                                  <strong>Polymorphism:</strong> The ability of different classes to be treated as
                                  instances of the same class through inheritance. It allows methods to do different
                                  things based on the object it is acting upon, even though it has the same name.
                                </li>
                                <li>
                                  <strong>Abstraction:</strong> The concept of hiding complex implementation details and
                                  showing only the necessary features of an object. It helps in reducing programming
                                  complexity and effort.
                                </li>
                              </ol>
                            </>
                          )}
                          {question.subject === "Database Management Systems" && (
                            <>
                              Normalization is the process of organizing data in a database to reduce redundancy and
                              improve data integrity. It involves dividing large tables into smaller ones and defining
                              relationships between them.
                              <ol className="list-decimal pl-5 mt-2 space-y-2">
                                <li>
                                  <strong>First Normal Form (1NF):</strong> A relation is in 1NF if it contains only
                                  atomic values and there are no repeating groups or arrays.
                                </li>
                                <li>
                                  <strong>Second Normal Form (2NF):</strong> A relation is in 2NF if it is in 1NF and
                                  all non-key attributes are fully functionally dependent on the primary key.
                                </li>
                                <li>
                                  <strong>Third Normal Form (3NF):</strong> A relation is in 3NF if it is in 2NF and all
                                  the attributes are directly dependent on the primary key and not on any other non-key
                                  attributes.
                                </li>
                              </ol>
                            </>
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="rounded-full">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Study Materials
                        </Button>
                        <Button className="rounded-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Answer
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex justify-center mt-8">
              <Button className="rounded-full">
                Load More Questions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Exam Pattern Analysis</h2>
              <Select defaultValue="bsccsit">
                <SelectTrigger className="w-[180px] rounded-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bsccsit">BSc.CSIT</SelectItem>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="bim">BIM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">Question Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span>Tribhuvan University (TU) - BSc.CSIT</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Short Answer Questions (5 marks each)</span>
                            <span className="font-medium">8 questions</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Long Answer Questions (10 marks each)</span>
                            <span className="font-medium">3 questions</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Multiple Choice Questions (2 marks each)</span>
                            <span className="font-medium">10 questions</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Practical/Lab Questions (5 marks each)</span>
                            <span className="font-medium">2 questions</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span>Pokhara University (PU) - BCA</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Short Answer Questions (5 marks each)</span>
                            <span className="font-medium">6 questions</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Long Answer Questions (10 marks each)</span>
                            <span className="font-medium">4 questions</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Multiple Choice Questions (1 mark each)</span>
                            <span className="font-medium">15 questions</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Case Study Questions (15 marks each)</span>
                            <span className="font-medium">1 question</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">Topic Frequency Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Object-Oriented Programming</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Inheritance & Polymorphism</span>
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                              Very High
                            </Badge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Encapsulation & Abstraction</span>
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                              High
                            </Badge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Exception Handling</span>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                              Medium
                            </Badge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Interfaces & Abstract Classes</span>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                              Medium
                            </Badge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-amber-500">Study Recommendation</h4>
                          <p className="text-xs mt-1">
                            Based on our analysis of past 5 years' papers, focus on high-frequency topics like
                            Inheritance, Polymorphism, and Database Normalization. These topics consistently appear in
                            exams across all Nepali universities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Popular Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Object-Oriented Programming", papers: 45, color: "#3B82F6" },
                { name: "Database Management Systems", papers: 38, color: "#10B981" },
                { name: "Computer Networks", papers: 32, color: "#F59E0B" },
                { name: "Data Structures and Algorithms", papers: 29, color: "#8B5CF6" },
                { name: "Web Technology", papers: 25, color: "#EC4899" },
              ].map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/10 bg-background/80"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                    >
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <p className="text-xs text-muted-foreground">{subject.papers} papers available</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    View Papers
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Top Universities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Tribhuvan University", papers: 120, color: "#3B82F6" },
                { name: "Kathmandu University", papers: 85, color: "#10B981" },
                { name: "Pokhara University", papers: 72, color: "#F59E0B" },
                { name: "Purbanchal University", papers: 58, color: "#8B5CF6" },
                { name: "Mid-Western University", papers: 42, color: "#EC4899" },
              ].map((university, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/10 bg-background/80"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${university.color}20`, color: university.color }}
                    >
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{university.name}</h4>
                      <p className="text-xs text-muted-foreground">{university.papers} papers available</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    View Papers
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Exam Preparation Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 rounded-lg border border-border/10 bg-background/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Clock className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Time Management</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Allocate time based on marks for each question</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Attempt easy questions first to build confidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Reserve time for revision at the end</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border/10 bg-background/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <Star className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Study Strategies</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Analyze past paper patterns to identify important topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Practice writing answers under timed conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Form study groups to discuss complex topics</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border/10 bg-background/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <FileText className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Answer Techniques</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Read questions carefully before answering</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Structure answers with proper headings and subheadings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <span>Include diagrams and examples where appropriate</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/exam-prep">
              <Button className="rounded-full">
                Start Practicing Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

