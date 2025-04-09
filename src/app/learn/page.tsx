"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  GraduationCap,
  ChevronRight,
  Brain,
  Search,
  ArrowLeft,
  Lightbulb,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Share2,
  CheckCircle2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { KnowledgeGlobe } from "@/components/knowledge-globe"
import { ChapterSidebar } from "@/components/chapter-sidebar"
import { AIAnswerGenerator } from "@/components/ai-answer-generator"
import { AnimatedButton } from "@/components/animated-button"

export default function LearnPage() {
  const { toast } = useToast()
  const [university, setUniversity] = useState("")
  const [course, setCourse] = useState("")
  const [subject, setSubject] = useState("")
  const [selectedChapter, setSelectedChapter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAIGenerator, setShowAIGenerator] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showGlobe, setShowGlobe] = useState(true)
  const [step, setStep] = useState(1)

  // Simulated data
  const universities = [
    { id: "tu", name: "Tribhuvan University (TU)" },
    { id: "pu", name: "Pokhara University (PU)" },
    { id: "ku", name: "Kathmandu University (KU)" },
    { id: "purbanchal", name: "Purbanchal University" },
    { id: "mwu", name: "Mid-Western University" },
    { id: "fwu", name: "Far-Western University" },
  ]

  const courses = [
    { id: "bca", name: "Bachelor of Computer Application (BCA)", university: "tu" },
    { id: "bsccsit", name: "BSc. Computer Science & IT (BSc.CSIT)", university: "tu" },
    { id: "bim", name: "Bachelor of Information Management (BIM)", university: "tu" },
    { id: "bit", name: "Bachelor of Information Technology (BIT)", university: "pu" },
    { id: "be-computer", name: "Bachelor of Engineering in Computer", university: "pu" },
    { id: "bba", name: "Bachelor of Business Administration (BBA)", university: "ku" },
  ]

  const subjects = [
    { id: "oop-java", name: "Object-Oriented Programming in Java", course: "bca" },
    { id: "data-structures", name: "Data Structures and Algorithms", course: "bca" },
    { id: "database", name: "Database Management Systems", course: "bca" },
    { id: "networks", name: "Computer Networks", course: "bca" },
    { id: "web-tech", name: "Web Technology", course: "bca" },
    { id: "os", name: "Operating Systems", course: "bca" },
  ]

  const chapters = [
    { id: "chapter-1", name: "Introduction to OOP", subject: "oop-java" },
    { id: "chapter-2", name: "Classes and Objects", subject: "oop-java" },
    { id: "chapter-3", name: "Inheritance", subject: "oop-java" },
    { id: "chapter-4", name: "Polymorphism", subject: "oop-java" },
    { id: "chapter-5", name: "Abstraction", subject: "oop-java" },
    { id: "chapter-6", name: "Encapsulation", subject: "oop-java" },
    { id: "chapter-7", name: "Interfaces", subject: "oop-java" },
    { id: "chapter-8", name: "Exception Handling", subject: "oop-java" },
  ]

  const questions = [
    {
      id: "q1",
      chapter: "chapter-4",
      type: "mcq",
      difficulty: "medium",
      text: "Which of the following is a characteristic of polymorphism in object-oriented programming?",
      options: [
        { id: "a", text: "It restricts a derived class from overriding methods of its base class." },
        {
          id: "b",
          text: "It allows objects of different classes to be treated as objects of a common superclass.",
          isCorrect: true,
        },
        { id: "c", text: "It ensures that all classes in a program must inherit from a single base class." },
        { id: "d", text: "It prevents a class from implementing multiple interfaces." },
      ],
      explanation:
        "Polymorphism allows objects of different classes to be treated as objects of a common superclass. This is a fundamental concept in object-oriented programming that enables method overriding and dynamic binding.",
    },
    {
      id: "q2",
      chapter: "chapter-4",
      type: "short-answer",
      difficulty: "medium",
      text: "Explain the concept of method overriding in Java. Provide an example to illustrate your answer.",
      modelAnswer:
        'Method overriding in Java is a feature of object-oriented programming that allows a subclass to provide a specific implementation of a method that is already defined in its superclass. The overridden method in the subclass should have the same name, return type, and parameter list as the method in the superclass.\n\nExample:\n```java\n// Parent class\nclass Animal {\n  public void makeSound() {\n    System.out.println("Animal makes a sound");\n  }\n}\n\n// Child class\nclass Dog extends Animal {\n  @Override\n  public void makeSound() {\n    System.out.println("Dog barks");\n  }\n}\n\n// Usage\npublic class Main {\n  public static void main(String[] args) {\n    Animal myDog = new Dog();\n    myDog.makeSound();  // Outputs: "Dog barks"\n  }\n}\n```',
    },
    {
      id: "q3",
      chapter: "chapter-4",
      type: "long-answer",
      difficulty: "hard",
      text: "Discuss the principles of polymorphism in Java. Explain different types of polymorphism with appropriate examples and describe how they contribute to building robust and maintainable software.",
      modelAnswer:
        'Polymorphism in Java is a core concept of object-oriented programming that allows objects to be treated as instances of their parent class rather than their actual class. The word polymorphism means \'many forms\', and it occurs when we have many classes that are related to each other by inheritance.\n\nThere are two types of polymorphism in Java:\n\n1. **Compile-time Polymorphism (Static Binding)**:\nThis is achieved through method overloading. Method overloading allows a class to have multiple methods with the same name but different parameters.\n\nExample:\n```java\nclass Calculator {\n  // Method with two parameters\n  public int add(int a, int b) {\n    return a + b;\n  }\n  \n  // Method with three parameters\n  public int add(int a, int b, int c) {\n    return a + b + c;\n  }\n  \n  // Method with different parameter types\n  public double add(double a, double b) {\n    return a + b;\n  }\n}\n```\n\n2. **Runtime Polymorphism (Dynamic Binding)**:\nThis is achieved through method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n\nExample:\n```java\nclass Animal {\n  public void makeSound() {\n    System.out.println("Animal makes a sound");\n  }\n}\n\nclass Dog extends Animal {\n  @Override\n  public void makeSound() {\n    System.out.println("Dog barks");\n  }\n}\n\nclass Cat extends Animal {\n  @Override\n  public void makeSound() {\n    System.out.println("Cat meows");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal myDog = new Dog();\n    Animal myCat = new Cat();\n    \n    myDog.makeSound();  // Outputs: "Dog barks"\n    myCat.makeSound();  // Outputs: "Cat meows"\n  }\n}\n```\n\nPolymorphism contributes to building robust and maintainable software in several ways:\n\n1. **Code Reusability**: Polymorphism allows us to reuse code through inheritance and method overriding, reducing code duplication.\n\n2. **Flexibility and Extensibility**: It makes the code more flexible and extensible by allowing new classes to be added with minimal changes to existing code.\n\n3. **Abstraction**: It supports abstraction by allowing us to work with objects at a higher level of abstraction, focusing on what operations can be performed rather than how they are performed.\n\n4. **Loose Coupling**: Polymorphism promotes loose coupling between classes, making the system more modular and easier to maintain.\n\n5. **Simplified Code**: It simplifies code by allowing us to treat objects of different types in a uniform way, reducing conditional logic.\n\nIn conclusion, polymorphism is a powerful concept in Java that enhances code organization, reusability, and maintainability, making it an essential tool for building robust software systems.',
    },
  ]

  const filteredCourses = courses.filter((c) => c.university === university)
  const filteredSubjects = subjects.filter((s) => s.course === course)
  const filteredChapters = chapters.filter((c) => c.subject === subject)
  const filteredQuestions = questions.filter((q) => q.chapter === selectedChapter)

  const handleUniversityChange = (value: string) => {
    setUniversity(value)
    setCourse("")
    setSubject("")
    setSelectedChapter("")
    setStep(2)
  }

  const handleCourseChange = (value: string) => {
    setCourse(value)
    setSubject("")
    setSelectedChapter("")
    setStep(3)
  }

  const handleSubjectChange = (value: string) => {
    setSubject(value)
    setSelectedChapter("")
    setStep(4)
  }

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapter(chapterId)
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestion(questionId)
    setShowAIGenerator(true)
  }

  const handleBookmark = () => {
    toast({
      title: "Question bookmarked",
      description: "This question has been added to your bookmarks.",
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container py-8 min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Learning Platform</h1>
              <p className="text-muted-foreground">Select your university, course, and subject to start learning</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => setShowGlobe(!showGlobe)}>
              {showGlobe ? "Hide Globe" : "Show Globe"}
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Step 1-3: Selection Process */}
        <AnimatePresence mode="wait">
          {step < 4 && (
            <motion.div
              key="selection-process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">Learning Path Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Select value={university} onValueChange={handleUniversityChange}>
                        <SelectTrigger id="university" className="rounded-md">
                          <SelectValue placeholder="Select university" />
                        </SelectTrigger>
                        <SelectContent>
                          {universities.map((uni) => (
                            <SelectItem key={uni.id} value={uni.id}>
                              {uni.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Select value={course} onValueChange={handleCourseChange} disabled={!university}>
                        <SelectTrigger id="course" className="rounded-md">
                          <SelectValue placeholder={university ? "Select course" : "Select university first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredCourses.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={subject} onValueChange={handleSubjectChange} disabled={!course}>
                        <SelectTrigger id="subject" className="rounded-md">
                          <SelectValue placeholder={course ? "Select subject" : "Select course first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredSubjects.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    {subject && (
                      <AnimatedButton onClick={() => setStep(4)}>
                        Start Learning
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </AnimatedButton>
                    )}
                  </div>
                </CardContent>
              </Card>

              {showGlobe && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 flex justify-center"
                >
                  <div className="w-full max-w-3xl h-[400px] relative">
                    <KnowledgeGlobe />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Learning Interface with Sidebar and Content */}
        <AnimatePresence>
          {step === 4 && subject && (
            <motion.div
              key="learning-interface"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {/* Sidebar */}
              <div className="md:col-span-1">
                <ChapterSidebar
                  chapters={filteredChapters}
                  selectedChapter={selectedChapter}
                  onChapterSelect={handleChapterSelect}
                  subject={subjects.find((s) => s.id === subject)?.name || ""}
                />
              </div>

              {/* Main Content */}
              <div className="md:col-span-3">
                {selectedChapter ? (
                  <motion.div variants={containerVariants} initial="hidden" animate="show">
                    <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md mb-6">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl font-bold">
                            {chapters.find((c) => c.id === selectedChapter)?.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input
                                placeholder="Search questions..."
                                className="pl-10 pr-4 rounded-full w-[200px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isLoading ? (
                          <div className="flex justify-center items-center py-12">
                            <div className="flex flex-col items-center gap-4">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <GraduationCap className="size-12 text-primary" />
                              </motion.div>
                              <p className="text-muted-foreground">Loading questions...</p>
                            </div>
                          </div>
                        ) : (
                          <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid grid-cols-4 mb-6">
                              <TabsTrigger value="all">All</TabsTrigger>
                              <TabsTrigger value="mcq">MCQ</TabsTrigger>
                              <TabsTrigger value="short-answer">Short Answer</TabsTrigger>
                              <TabsTrigger value="long-answer">Long Answer</TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="space-y-4">
                              {filteredQuestions.map((question) => (
                                <motion.div
                                  key={question.id}
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.01 }}
                                  className="p-4 rounded-lg border border-border/10 bg-background/80 hover:border-primary/30 transition-all cursor-pointer"
                                  onClick={() => handleQuestionSelect(question.id)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                      {question.type === "mcq" && (
                                        <Badge
                                          variant="outline"
                                          className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                                        >
                                          MCQ
                                        </Badge>
                                      )}
                                      {question.type === "short-answer" && (
                                        <Badge
                                          variant="outline"
                                          className="bg-green-500/10 text-green-500 border-green-500/20"
                                        >
                                          Short Answer
                                        </Badge>
                                      )}
                                      {question.type === "long-answer" && (
                                        <Badge
                                          variant="outline"
                                          className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                        >
                                          Long Answer
                                        </Badge>
                                      )}
                                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                      </Badge>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleBookmark()
                                      }}
                                    >
                                      <Bookmark className="h-4 w-4" />
                                      <span className="sr-only">Bookmark</span>
                                    </Button>
                                  </div>
                                  <p className="font-medium">{question.text}</p>
                                </motion.div>
                              ))}
                            </TabsContent>

                            <TabsContent value="mcq" className="space-y-4">
                              {filteredQuestions
                                .filter((q) => q.type === "mcq")
                                .map((question) => (
                                  <motion.div
                                    key={question.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01 }}
                                    className="p-4 rounded-lg border border-border/10 bg-background/80 hover:border-primary/30 transition-all cursor-pointer"
                                    onClick={() => handleQuestionSelect(question.id)}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="outline"
                                          className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                                        >
                                          MCQ
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="bg-primary/10 text-primary border-primary/20"
                                        >
                                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                        </Badge>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleBookmark()
                                        }}
                                      >
                                        <Bookmark className="h-4 w-4" />
                                        <span className="sr-only">Bookmark</span>
                                      </Button>
                                    </div>
                                    <p className="font-medium">{question.text}</p>
                                  </motion.div>
                                ))}
                            </TabsContent>

                            <TabsContent value="short-answer" className="space-y-4">
                              {filteredQuestions
                                .filter((q) => q.type === "short-answer")
                                .map((question) => (
                                  <motion.div
                                    key={question.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01 }}
                                    className="p-4 rounded-lg border border-border/10 bg-background/80 hover:border-primary/30 transition-all cursor-pointer"
                                    onClick={() => handleQuestionSelect(question.id)}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="outline"
                                          className="bg-green-500/10 text-green-500 border-green-500/20"
                                        >
                                          Short Answer
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="bg-primary/10 text-primary border-primary/20"
                                        >
                                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                        </Badge>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleBookmark()
                                        }}
                                      >
                                        <Bookmark className="h-4 w-4" />
                                        <span className="sr-only">Bookmark</span>
                                      </Button>
                                    </div>
                                    <p className="font-medium">{question.text}</p>
                                  </motion.div>
                                ))}
                            </TabsContent>

                            <TabsContent value="long-answer" className="space-y-4">
                              {filteredQuestions
                                .filter((q) => q.type === "long-answer")
                                .map((question) => (
                                  <motion.div
                                    key={question.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01 }}
                                    className="p-4 rounded-lg border border-border/10 bg-background/80 hover:border-primary/30 transition-all cursor-pointer"
                                    onClick={() => handleQuestionSelect(question.id)}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="outline"
                                          className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                        >
                                          Long Answer
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="bg-primary/10 text-primary border-primary/20"
                                        >
                                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                        </Badge>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleBookmark()
                                        }}
                                      >
                                        <Bookmark className="h-4 w-4" />
                                        <span className="sr-only">Bookmark</span>
                                      </Button>
                                    </div>
                                    <p className="font-medium">{question.text}</p>
                                  </motion.div>
                                ))}
                            </TabsContent>
                          </Tabs>
                        )}
                      </CardContent>
                    </Card>

                    {/* Selected Question Detail */}
                    <AnimatePresence>
                      {selectedQuestion && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md mb-6">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-xl font-bold">Question Details</CardTitle>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => setSelectedQuestion(null)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Close</span>
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {(() => {
                                const question = questions.find((q) => q.id === selectedQuestion)
                                if (!question) return null

                                return (
                                  <div className="space-y-6">
                                    <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                                      <div className="flex items-center gap-2 mb-2">
                                        {question.type === "mcq" && (
                                          <Badge
                                            variant="outline"
                                            className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                                          >
                                            MCQ
                                          </Badge>
                                        )}
                                        {question.type === "short-answer" && (
                                          <Badge
                                            variant="outline"
                                            className="bg-green-500/10 text-green-500 border-green-500/20"
                                          >
                                            Short Answer
                                          </Badge>
                                        )}
                                        {question.type === "long-answer" && (
                                          <Badge
                                            variant="outline"
                                            className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                          >
                                            Long Answer
                                          </Badge>
                                        )}
                                        <Badge
                                          variant="outline"
                                          className="bg-primary/10 text-primary border-primary/20"
                                        >
                                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                        </Badge>
                                      </div>
                                      <p className="font-medium">{question.text}</p>
                                    </div>

                                    {question.type === "mcq" && (
                                      <div className="space-y-3">
                                        {question.options.map((option, index) => (
                                          <div
                                            key={option.id}
                                            className={`flex items-center space-x-2 p-3 rounded-lg ${
                                              option.isCorrect
                                                ? "border border-green-500/20 bg-green-500/10"
                                                : "border border-border/10 bg-background/80"
                                            }`}
                                          >
                                            <div className="size-5 rounded-full border border-input flex items-center justify-center">
                                              <span className="text-xs">{String.fromCharCode(65 + index)}</span>
                                            </div>
                                            <span className="text-sm">{option.text}</span>
                                            {option.isCorrect && (
                                              <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {(question.type === "short-answer" || question.type === "long-answer") && (
                                      <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                                        <h4 className="font-medium text-green-500 mb-2">Model Answer</h4>
                                        <div className="text-sm whitespace-pre-wrap">{question.modelAnswer}</div>
                                      </div>
                                    )}

                                    {question.explanation && (
                                      <div className="p-4 rounded-lg border border-primary/20 bg-primary/10">
                                        <div className="flex items-start gap-2">
                                          <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                                          <div>
                                            <h4 className="font-medium text-primary">Explanation</h4>
                                            <p className="text-sm mt-1">{question.explanation}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                      <AnimatedButton onClick={() => setShowAIGenerator(true)}>
                                        <Brain className="mr-2 h-4 w-4" />
                                        Generate AI Answer
                                      </AnimatedButton>
                                      <Button variant="outline" size="sm" className="rounded-full">
                                        <ThumbsUp className="mr-2 h-4 w-4" />
                                        Helpful
                                      </Button>
                                      <Button variant="outline" size="sm" className="rounded-full">
                                        <ThumbsDown className="mr-2 h-4 w-4" />
                                        Not Helpful
                                      </Button>
                                      <Button variant="outline" size="sm" className="rounded-full ml-auto">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                      </Button>
                                    </div>
                                  </div>
                                )
                              })()}
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Answer Generator */}
                    <AnimatePresence>
                      {showAIGenerator && selectedQuestion && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <AIAnswerGenerator
                            question={questions.find((q) => q.id === selectedQuestion)?.text || ""}
                            onClose={() => setShowAIGenerator(false)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <GraduationCap className="h-16 w-16 text-primary/40 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Select a Chapter</h3>
                      <p className="text-muted-foreground text-center max-w-md mb-6">
                        Choose a chapter from the sidebar to view questions and start learning.
                      </p>
                      {showGlobe && (
                        <div className="w-full max-w-2xl h-[300px] relative mt-4">
                          <KnowledgeGlobe />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

