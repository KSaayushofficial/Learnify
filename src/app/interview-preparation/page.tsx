"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Code,
  ExternalLink,
  Lightbulb,
  MessageSquare,
  Mic,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  Building,
  GraduationCap,
  Briefcase,
  FileText,
  X,
  Play,
  Pause,
  Download,
  Share2,
  Bookmark,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { AIAssistant } from "@/components/ai-assistant"
import { MediaSlider } from "@/components/media-slider"
import { useToast } from "@/hooks/use-toast"
import { PageHeader } from "@/components/page-header"
import { AnimatedButton } from "@/components/animated-button"
import Link from "next/link"

export default function InterviewPrepPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("learning")
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [showHints, setShowHints] = useState(true)
  const [showAdditionalResources, setShowAdditionalResources] = useState(true)
  const [audioExplanations, setAudioExplanations] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [codeResponse, setCodeResponse] = useState("")
  const [numQuestions, setNumQuestions] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordedAnswers, setRecordedAnswers] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)

  // Refs for scroll animations
  const featuresRef = useRef(null)
  const isFeaturesInView = useInView(featuresRef, { once: true })

  const handleGenerateQuestions = () => {
    if (!position) {
      toast({
        title: "Missing information",
        description: "Please select a position before generating questions.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate question generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Generating interview questions",
        description: `Created ${numQuestions} interview questions for ${position} (${difficulty} difficulty)`,
      })
    }, 1500)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      toast({
        title: "No answer selected",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      })
      return
    }

    setAnswerSubmitted(true)

    if (selectedAnswer === "b") {
      toast({
        title: "Correct!",
        description: "Great job! That's the right answer.",
      })
    } else {
      toast({
        title: "Incorrect",
        description: "That's not right. Review the explanation to learn more.",
        variant: "destructive",
      })
    }
  }

  const handleSubmitCode = () => {
    if (!codeResponse.trim()) {
      toast({
        title: "No code provided",
        description: "Please write your code before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Code submitted",
      description: "Your code has been submitted for evaluation.",
    })
  }

  const handleToggleAudio = () => {
    setAudioExplanations(!audioExplanations)
    toast({
      title: audioExplanations ? "Audio explanations disabled" : "Audio explanations enabled",
      description: audioExplanations
        ? "Text explanations will be shown instead."
        : "You'll now hear voice explanations for answers.",
    })
  }

  const handleShowExplanation = (question, answer) => {
    setCurrentQuestion({ question, answer })
    setShowAIAssistant(true)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    // Start timer
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // Simulate recording for 10 seconds
    setTimeout(() => {
      clearInterval(timer)
      setIsRecording(false)

      // Add recorded answer to list
      setRecordedAnswers([
        ...recordedAnswers,
        {
          id: recordedAnswers.length + 1,
          question: "Tell me about a time you faced a challenging situation at work.",
          duration: recordingTime + 10,
          date: new Date().toISOString(),
        },
      ])

      toast({
        title: "Recording saved",
        description: "Your interview answer has been recorded successfully.",
      })
    }, 10000)
  }

  const handlePlayRecording = (index) => {
    setCurrentPlayingIndex(index)
    setIsPlaying(true)

    // Simulate playing for the duration
    setTimeout(() => {
      setIsPlaying(false)
    }, recordedAnswers[index].duration * 1000)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast({
      title: bookmarked ? "Bookmark removed" : "Bookmark added",
      description: bookmarked
        ? "This question has been removed from your bookmarks."
        : "This question has been added to your bookmarks.",
    })
  }

  const mediaItems = [
    {
      type: "video",
      title: "JavaScript Variable Declaration",
      src: "https://www.youtube.com/embed/PFmuCDHHpwk",
      thumbnail: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "image",
      title: "JavaScript Hoisting Diagram",
      src: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "video",
      title: "Scope in JavaScript",
      src: "https://www.youtube.com/embed/0xw06loTm1k",
      thumbnail: "/placeholder.svg?height=200&width=320",
    },
  ]

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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="container py-8 space-y-8">
      <PageHeader
        title="Interview Preparation"
        description="Practice with AI-generated interview questions and improve your interview skills for Nepali tech companies."
        icon={<Briefcase className="h-6 w-6 text-primary" />}
      >
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href="/exam-preparation">
            <Button variant="outline" className="rounded-full">
              Exam Prep
            </Button>
          </Link>
          <Link href="/mock-interview">
            <Button className="rounded-full">
              <Mic className="mr-2 h-4 w-4" />
              Try Mock Interview
            </Button>
          </Link>
        </div>
      </PageHeader>

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Building className="h-5 w-5 mr-2 text-primary" />
            Interview Question Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger id="company" className="rounded-md">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="f1soft">F1Soft International</SelectItem>
                  <SelectItem value="leapfrog">Leapfrog Technology</SelectItem>
                  <SelectItem value="cotiviti">Cotiviti Nepal</SelectItem>
                  <SelectItem value="deerwalk">Deerwalk Services</SelectItem>
                  <SelectItem value="fusemachines">Fusemachines Nepal</SelectItem>
                  <SelectItem value="infodev">Info Developers</SelectItem>
                  <SelectItem value="logpoint">LogPoint Nepal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger id="position" className="rounded-md">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript Developer</SelectItem>
                  <SelectItem value="react">React Developer</SelectItem>
                  <SelectItem value="node">Node.js Developer</SelectItem>
                  <SelectItem value="python">Python Developer</SelectItem>
                  <SelectItem value="java">Java Developer</SelectItem>
                  <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="backend">Backend Developer</SelectItem>
                  <SelectItem value="mobile">Mobile Developer</SelectItem>
                  <SelectItem value="devops">DevOps Engineer</SelectItem>
                  <SelectItem value="qa">QA Engineer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty" className="rounded-md">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Entry Level</SelectItem>
                  <SelectItem value="medium">Mid Level</SelectItem>
                  <SelectItem value="hard">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div className="space-y-2">
              <Label htmlFor="num-questions">Number of Questions ({numQuestions})</Label>
              <Slider
                id="num-questions"
                min={1}
                max={20}
                step={1}
                value={[numQuestions]}
                onValueChange={(value) => setNumQuestions(value[0])}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <Label>Interview Mode</Label>
              <Tabs defaultValue="learning" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 h-10">
                  <TabsTrigger value="learning" className="rounded-l-md">
                    Learning Mode
                  </TabsTrigger>
                  <TabsTrigger value="strict" className="rounded-r-md">
                    Strict Mode
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-hints"
                  checked={showHints}
                  onCheckedChange={setShowHints}
                  disabled={activeTab === "strict"}
                />
                <Label htmlFor="show-hints" className={activeTab === "strict" ? "text-muted-foreground" : ""}>
                  Show Hints
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="additional-resources"
                  checked={showAdditionalResources}
                  onCheckedChange={setShowAdditionalResources}
                />
                <Label htmlFor="additional-resources">Show Additional Resources</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="audio-explanations" checked={audioExplanations} onCheckedChange={setAudioExplanations} />
                <Label htmlFor="audio-explanations">Audio Explanations</Label>
              </div>
            </div>

            <AnimatedButton className="w-full md:w-auto" onClick={handleGenerateQuestions} disabled={isGenerating}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Interview Questions"}
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Technical Question
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Question 1/{numQuestions}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-full ${bookmarked ? "text-amber-500" : ""}`}
                    onClick={handleBookmark}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-amber-500" : ""}`} />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                  <p className="font-medium">What is the difference between let, const, and var in JavaScript?</p>
                </div>

                {activeTab === "learning" && showHints && (
                  <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-500">Hint</h4>
                        <p className="text-sm mt-1">
                          Think about scope (global, function, block), hoisting behavior, and whether they can be
                          redeclared or reassigned.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                  disabled={answerSubmitted}
                >
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${answerSubmitted && selectedAnswer === "a" ? "border-red-500 bg-red-500/10" : "border-border/10 bg-background/80"}`}
                  >
                    <RadioGroupItem value="a" id="option-a" />
                    <Label htmlFor="option-a" className="flex-1 cursor-pointer">
                      They are all identical in functionality but used in different coding styles.
                    </Label>
                    {answerSubmitted && selectedAnswer === "a" && <X className="h-5 w-5 text-red-500" />}
                  </div>

                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${answerSubmitted && selectedAnswer === "b" ? "border-green-500 bg-green-500/10" : "border-border/10 bg-background/80"}`}
                  >
                    <RadioGroupItem value="b" id="option-b" />
                    <Label htmlFor="option-b" className="flex-1 cursor-pointer">
                      var is function-scoped and can be redeclared, let is block-scoped and can be reassigned but not
                      redeclared, and const is block-scoped and cannot be reassigned or redeclared.
                    </Label>
                    {answerSubmitted && selectedAnswer === "b" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </div>

                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${answerSubmitted && selectedAnswer === "c" ? "border-red-500 bg-red-500/10" : "border-border/10 bg-background/80"}`}
                  >
                    <RadioGroupItem value="c" id="option-c" />
                    <Label htmlFor="option-c" className="flex-1 cursor-pointer">
                      let and const are deprecated, and var is the modern way to declare variables in JavaScript.
                    </Label>
                    {answerSubmitted && selectedAnswer === "c" && <X className="h-5 w-5 text-red-500" />}
                  </div>

                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${answerSubmitted && selectedAnswer === "d" ? "border-red-500 bg-red-500/10" : "border-border/10 bg-background/80"}`}
                  >
                    <RadioGroupItem value="d" id="option-d" />
                    <Label htmlFor="option-d" className="flex-1 cursor-pointer">
                      var and let are for variables, while const is only used for functions.
                    </Label>
                    {answerSubmitted && selectedAnswer === "d" && <X className="h-5 w-5 text-red-500" />}
                  </div>
                </RadioGroup>

                {!answerSubmitted ? (
                  <AnimatedButton className="w-full" onClick={handleSubmitAnswer}>
                    Submit Answer
                  </AnimatedButton>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-500">Correct Answer</h4>
                          <p className="text-sm mt-1">
                            var is function-scoped and can be redeclared and reassigned. It's also hoisted to the top of
                            its scope. let is block-scoped and can be reassigned but not redeclared within the same
                            scope. const is also block-scoped but cannot be reassigned or redeclared, though properties
                            of objects declared with const can still be modified.
                          </p>
                          <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                            <code>
                              {`// var example
var x = 1;
var x = 2; // Valid redeclaration
x = 3;     // Valid reassignment
function test() {
var x = 4; // Different scope
if (true) {
var x = 5; // Same scope as function
console.log(x); // 5
}
console.log(x); // 5
}
console.log(x); // 3

// let example
let y = 1;
// let y = 2; // Invalid redeclaration
y = 2;      // Valid reassignment
if (true) {
let y = 3; // Different block scope
console.log(y); // 3
}
console.log(y); // 2

// const example
const z = 1;
// const z = 2; // Invalid redeclaration
// z = 2;      // Invalid reassignment
const obj = { prop: 1 };
obj.prop = 2;  // Valid property modification
console.log(obj.prop); // 2`}
                            </code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-primary"
                            onClick={() =>
                              handleShowExplanation(
                                "What is the difference between let, const, and var in JavaScript?",
                                "var is function-scoped and can be redeclared and reassigned. It's also hoisted to the top of its scope. let is block-scoped and can be reassigned but not redeclared within the same scope. const is also block-scoped but cannot be reassigned or redeclared, though properties of objects declared with const can still be modified.",
                              )
                            }
                          >
                            <Brain className="mr-1 h-4 w-4" />
                            Explain Further
                          </Button>
                        </div>
                        {audioExplanations && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full ml-auto"
                            onClick={handleToggleAudio}
                          >
                            <Volume2 className="h-4 w-4 text-green-500" />
                            <span className="sr-only">Play Audio Explanation</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-full">
                        Previous Question
                      </Button>
                      <Button className="flex-1 rounded-full">Next Question</Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Coding Challenge
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    JavaScript
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                  <p className="font-medium">
                    Write a function that takes an array of integers and returns the two numbers that add up to a given
                    target. You may assume that each input would have exactly one solution, and you may not use the same
                    element twice.
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                    <code>
                      {`// Example:
// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)

function twoSum(nums, target) {
// Your code here
}`}
                    </code>
                  </pre>
                </div>

                {activeTab === "learning" && showHints && (
                  <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-500">Hint</h4>
                        <p className="text-sm mt-1">
                          Consider using a hash map to store the numbers you've seen so far. For each number, check if
                          the target minus the current number exists in the hash map.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="code-response">Your Solution</Label>
                  <Textarea
                    id="code-response"
                    placeholder="Write your code here..."
                    className="min-h-[200px] font-mono"
                    value={codeResponse}
                    onChange={(e) => setCodeResponse(e.target.value)}
                  />
                </div>

                <AnimatedButton className="w-full" onClick={handleSubmitCode}>
                  Submit Solution
                </AnimatedButton>

                {activeTab === "learning" && (
                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-500">Sample Solution</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                          <code>
                            {`function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }

  return null; // No solution found
}

// Time Complexity: O(n)
// Space Complexity: O(n)`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          This solution uses a hash map to store each number and its index. For each number, we check if
                          its complement (target - current number) exists in the map. If it does, we've found our pair.
                          If not, we add the current number to the map and continue.
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-primary"
                          onClick={() =>
                            handleShowExplanation(
                              "Write a function that takes an array of integers and returns the two numbers that add up to a given target.",
                              "This solution uses a hash map to store each number and its index. For each number, we check if its complement (target - current number) exists in the map. If it does, we've found our pair. If not, we add the current number to the map and continue.",
                            )
                          }
                        >
                          <Brain className="mr-1 h-4 w-4" />
                          Explain Further
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Mic className="h-5 w-5 mr-2 text-primary" />
                  Behavioral Question Practice
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Voice Recording
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                  <p className="font-medium">
                    Tell me about a time you faced a challenging situation at work. How did you handle it, and what was
                    the outcome?
                  </p>
                </div>

                {activeTab === "learning" && showHints && (
                  <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-500">STAR Method Hint</h4>
                        <p className="text-sm mt-1">Use the STAR method to structure your answer:</p>
                        <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                          <li>
                            <span className="font-medium">Situation:</span> Describe the context and specific challenge
                          </li>
                          <li>
                            <span className="font-medium">Task:</span> Explain your responsibility in that situation
                          </li>
                          <li>
                            <span className="font-medium">Action:</span> Detail the steps you took to address it
                          </li>
                          <li>
                            <span className="font-medium">Result:</span> Share the outcomes and what you learned
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg border-border/50 bg-background/80">
                  {isRecording ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="size-16 rounded-full bg-red-500/20 flex items-center justify-center">
                          <div className="size-8 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-red-500"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        ></motion.div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-red-500">Recording...</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
                        </p>
                      </div>
                      <Button variant="outline" className="rounded-full" onClick={() => setIsRecording(false)}>
                        Stop Recording
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Mic className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Record Your Answer</p>
                        <p className="text-sm text-muted-foreground">
                          Practice answering this behavioral question out loud
                        </p>
                      </div>
                      <AnimatedButton onClick={handleStartRecording}>Start Recording</AnimatedButton>
                    </div>
                  )}
                </div>

                {recordedAnswers.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Your Recorded Answers</h3>
                    {recordedAnswers.map((recording, index) => (
                      <div key={recording.id} className="p-3 rounded-lg border border-border/10 bg-background/80">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{recording.question}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(recording.date).toLocaleDateString()} • {recording.duration}s
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {isPlaying && currentPlayingIndex === index ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setIsPlaying(false)}
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handlePlayRecording(index)}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {isPlaying && currentPlayingIndex === index && (
                          <div className="mt-2">
                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: recording.duration }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <ThumbsDown className="mr-2 h-4 w-4" />
              Not Helpful
            </Button>
            <Button variant="outline" size="sm" className="rounded-full ml-auto">
              Report Issue
            </Button>
          </div>
        </div>

        {showAdditionalResources && (
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MediaSlider items={mediaItems} className="mb-4" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>Related Interview Questions</span>
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                        <span>Explain hoisting in JavaScript</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                        <span>What is temporal dead zone in JavaScript?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                        <span>How does scope work in JavaScript?</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <ExternalLink className="h-4 w-4 text-green-500" />
                      <span>External Resources</span>
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="#" className="text-primary hover:underline flex items-center gap-1">
                          <span>MDN: JavaScript Variables</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline flex items-center gap-1">
                          <span>JavaScript.info: Variables</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline flex items-center gap-1">
                          <span>W3Schools: JavaScript Let</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-primary" />
                    <span>Nepali Tech Companies Interview Focus</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      Companies like Leapfrog, F1Soft, and Cotiviti often focus on these JavaScript concepts during
                      interviews:
                    </p>
                    <ul className="space-y-1 pl-5 list-disc">
                      <li>Closures and scope</li>
                      <li>ES6 features</li>
                      <li>Asynchronous programming</li>
                      <li>Data structures implementation</li>
                    </ul>
                  </div>
                </div>

                <Button variant="outline" className="w-full rounded-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI for More Help
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
              <span>Interview Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Mic className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Communication</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Explain your thought process clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Ask clarifying questions when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Use technical terms correctly</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <Code className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Coding</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Start with a brute force solution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Optimize for time and space complexity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Test your code with examples</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Nepali Tech Scene</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Research local tech companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Understand Nepal's IT industry trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Prepare for both technical and cultural fit</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link href="/mock-interview">
                <AnimatedButton>
                  Practice with Mock Interview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAIAssistant && currentQuestion && (
        <AIAssistant
          initialQuestion={currentQuestion.question}
          initialAnswer={currentQuestion.answer}
          onClose={() => setShowAIAssistant(false)}
        />
      )}
    </div>
  )
}

