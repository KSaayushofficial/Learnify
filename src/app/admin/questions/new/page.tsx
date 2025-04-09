"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Brain,
  FileText,
  Save,
  Trash,
  Plus,
  Sparkles,
  HelpCircleIcon,
  CheckCircleIcon,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function NewQuestionPage() {
  const { toast } = useToast()
  const [questionType, setQuestionType] = useState("mcq")
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [questionText, setQuestionText] = useState("")
  const [mcqOptions, setMcqOptions] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ])
  const [shortAnswer, setShortAnswer] = useState("")
  const [longAnswer, setLongAnswer] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

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

  const handleMcqOptionChange = (id, text) => {
    setMcqOptions(mcqOptions.map((option) => (option.id === id ? { ...option, text } : option)))
  }

  const handleMcqCorrectChange = (id) => {
    setMcqOptions(
      mcqOptions.map((option) => ({
        ...option,
        isCorrect: option.id === id,
      })),
    )
  }

  const handleAddOption = () => {
    setMcqOptions([...mcqOptions, { id: mcqOptions.length + 1, text: "", isCorrect: false }])
  }

  const handleRemoveOption = (id) => {
    if (mcqOptions.length <= 2) {
      toast({
        title: "Cannot remove option",
        description: "A multiple choice question must have at least 2 options.",
        variant: "destructive",
      })
      return
    }
    setMcqOptions(mcqOptions.filter((option) => option.id !== id))
  }

  const handleGenerateAI = () => {
    if (!subject || !chapter) {
      toast({
        title: "Missing information",
        description: "Please select a subject and chapter before generating a question.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      if (questionType === "mcq") {
        setQuestionText("Which of the following is a characteristic of polymorphism in object-oriented programming?")
        setMcqOptions([
          { id: 1, text: "It restricts a derived class from overriding methods of its base class.", isCorrect: false },
          {
            id: 2,
            text: "It allows objects of different classes to be treated as objects of a common superclass.",
            isCorrect: true,
          },
          {
            id: 3,
            text: "It ensures that all classes in a program must inherit from a single base class.",
            isCorrect: false,
          },
          { id: 4, text: "It prevents a class from implementing multiple interfaces.", isCorrect: false },
        ])
      } else if (questionType === "short-answer") {
        setQuestionText(
          "Explain the concept of method overriding in Java. Provide an example to illustrate your answer.",
        )
        setShortAnswer(
          'Method overriding in Java is a feature of object-oriented programming that allows a subclass to provide a specific implementation of a method that is already defined in its superclass. The overridden method in the subclass should have the same name, return type, and parameter list as the method in the superclass.\n\nExample:\n```java\n// Parent class\nclass Animal {\n  public void makeSound() {\n    System.out.println("Animal makes a sound");\n  }\n}\n\n// Child class\nclass Dog extends Animal {\n  @Override\n  public void makeSound() {\n    System.out.println("Dog barks");\n  }\n}\n\n// Usage\npublic class Main {\n  public static void main(String[] args) {\n    Animal myDog = new Dog();\n    myDog.makeSound();  // Outputs: "Dog barks"\n  }\n}\n```\n\nIn this example, the `Dog` class overrides the `makeSound()` method from the `Animal` class. When we create a `Dog` object and assign it to an `Animal` reference, the overridden method in the `Dog` class is called, demonstrating polymorphic behavior.',
        )
      } else if (questionType === "long-answer") {
        setQuestionText(
          "Discuss the principles of object-oriented programming (OOP) in Java. Explain each principle with appropriate examples and describe how they contribute to building robust and maintainable software.",
        )
        setLongAnswer(
          'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" that contain data and code. Java is a class-based, object-oriented programming language that implements OOP concepts. The four main principles of OOP in Java are:\n\n1. Encapsulation\nEncapsulation is the mechanism of hiding the internal state and requiring all interaction to be performed through an object\'s methods. It protects the integrity of an object\'s data by preventing direct access from outside the class.\n\nExample:\n```java\npublic class BankAccount {\n  private double balance; // private field\n\n  public double getBalance() {\n    return balance;\n  }\n\n  public void deposit(double amount) {\n    if (amount > 0) {\n      balance += amount;\n    }\n  }\n\n  public boolean withdraw(double amount) {\n    if (amount > 0 && balance >= amount) {\n      balance -= amount;\n      return true;\n    }\n    return false;\n  }\n}\n```\n\nIn this example, the `balance` field is private and can only be accessed through the public methods `getBalance()`, `deposit()`, and `withdraw()`. This ensures that the balance can never be set to an invalid value.\n\n2. Inheritance\nInheritance is the mechanism by which one class can inherit the fields and methods of another class. It promotes code reuse and establishes a relationship between a parent class and its child classes.\n\nExample:\n```java\n// Parent class\npublic class Vehicle {\n  protected String brand;\n\n  public Vehicle(String brand) {\n    this.brand = brand;\n  }\n\n  public void start() {\n    System.out.println("Vehicle starting");\n  }\n}\n\n// Child class\npublic class Car extends Vehicle {\n  private int numDoors;\n\n  public Car(String brand, int numDoors) {\n    super(brand); // Call parent constructor\n    this.numDoors = numDoors;\n  }\n\n  @Override\n  public void start() {\n    System.out.println(brand + " car starting with " + numDoors + " doors");\n  }\n}\n```\n\nHere, `Car` inherits from `Vehicle` and reuses its `brand` field while adding its own `numDoors` field. It also overrides the `start()` method to provide specific behavior.\n\n3. Polymorphism\nPolymorphism allows objects of different classes to be treated as objects of a common superclass. It enables a single interface to represent different underlying forms (data types).\n\nExample:\n```java\npublic class VehicleDemo {\n  public static void main(String[] args) {\n    // Array of Vehicle references\n    Vehicle[] vehicles = new Vehicle[2];\n    vehicles[0] = new Car("Toyota", 4);      // Car object\n    vehicles[1] = new Motorcycle("Honda");   // Motorcycle object\n    \n    // Polymorphic behavior\n    for (Vehicle vehicle : vehicles) {\n      vehicle.start(); // Calls the appropriate start() method\n    }\n  }\n}\n```\n\nIn this example, both `Car` and `Motorcycle` objects are treated as `Vehicle` objects. When `start()` is called, the appropriate method is executed based on the actual object type, demonstrating polymorphism.\n\n4. Abstraction\nAbstraction is the concept of hiding complex implementation details and showing only the necessary features of an object. It helps in reducing programming complexity and effort.\n\nExample:\n```java\n// Abstract class\npublic abstract class Shape {\n  abstract double calculateArea(); // Abstract method\n\n  public void display() {\n    System.out.println("Area: " + calculateArea());\n  }\n}\n\n// Concrete implementation\npublic class Circle extends Shape {\n  private double radius;\n\n  public Circle(double radius) {\n    this.radius = radius;\n  }\n\n  @Override\n  double calculateArea() {\n    return Math.PI * radius * radius;\n  }\n}\n```\n\nHere, `Shape` is an abstract class that defines a common interface for all shapes. The `calculateArea()` method is abstract, forcing subclasses to provide their own implementation. The `Circle` class extends `Shape` and implements the abstract method.\n\nContribution to Robust and Maintainable Software:\nThese OOP principles contribute to building robust and maintainable software in several ways:\n\n- Encapsulation improves data security and prevents unintended modifications, making the code more robust.\n- Inheritance promotes code reuse, reducing duplication and making the codebase easier to maintain.\n- Polymorphism enables flexibility and extensibility, allowing new classes to be added with minimal changes to existing code.\n- Abstraction simplifies complex systems by hiding implementation details, making the code more understandable and maintainable.\n\nTogether, these principles help create modular, flexible, and scalable software systems that are easier to debug, test, and extend over time.',
        )
      }

      setIsGenerating(false)

      toast({
        title: "AI Generation Complete",
        description: `Successfully generated a ${questionType} question about ${subject}.`,
      })
    }, 2000)
  }

  const handleSaveQuestion = () => {
    // Validate form
    if (!subject || !chapter || !questionText) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields before saving.",
        variant: "destructive",
      })
      return
    }

    if (questionType === "mcq") {
      const emptyOptions = mcqOptions.filter((option) => !option.text.trim())
      if (emptyOptions.length > 0) {
        toast({
          title: "Empty options",
          description: "Please fill in all MCQ options before saving.",
          variant: "destructive",
        })
        return
      }

      const correctOptions = mcqOptions.filter((option) => option.isCorrect)
      if (correctOptions.length === 0) {
        toast({
          title: "No correct answer",
          description: "Please select a correct answer for the MCQ.",
          variant: "destructive",
        })
        return
      }
    } else if (questionType === "short-answer" && !shortAnswer.trim()) {
      toast({
        title: "Missing answer",
        description: "Please provide a short answer before saving.",
        variant: "destructive",
      })
      return
    } else if (questionType === "long-answer" && !longAnswer.trim()) {
      toast({
        title: "Missing answer",
        description: "Please provide a long answer before saving.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)

      toast({
        title: "Question Saved",
        description: "The question has been saved successfully.",
      })
    }, 1500)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create New Question</h1>
              <p className="text-muted-foreground">Add a new question to the platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setQuestionText("")
                setMcqOptions([
                  { id: 1, text: "", isCorrect: false },
                  { id: 2, text: "", isCorrect: false },
                  { id: 3, text: "", isCorrect: false },
                  { id: 4, text: "", isCorrect: false },
                ])
                setShortAnswer("")
                setLongAnswer("")
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear Form
            </Button>
            <RoamingLightButton onClick={handleSaveQuestion} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Question
                </>
              )}
            </RoamingLightButton>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Question Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chapter">Chapter</Label>
                    <Select value={chapter} onValueChange={setChapter}>
                      <SelectTrigger id="chapter" className="rounded-md">
                        <SelectValue placeholder="Select chapter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chapter-1">Chapter 1: Introduction</SelectItem>
                        <SelectItem value="chapter-2">Chapter 2: Basic Concepts</SelectItem>
                        <SelectItem value="chapter-3">Chapter 3: Advanced Topics</SelectItem>
                        <SelectItem value="chapter-4">Chapter 4: Practical Applications</SelectItem>
                        <SelectItem value="chapter-5">Chapter 5: Case Studies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="question-type">Question Type</Label>
                    <Select value={questionType} onValueChange={setQuestionType}>
                      <SelectTrigger id="question-type" className="rounded-md">
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                        <SelectItem value="long-answer">Long Answer</SelectItem>
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
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question-text">Question Text</Label>
                  <Textarea
                    id="question-text"
                    placeholder="Enter the question text here..."
                    className="min-h-[100px]"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>

                {questionType === "mcq" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Answer Options</Label>
                      <Button variant="outline" size="sm" className="rounded-full" onClick={handleAddOption}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Option
                      </Button>
                    </div>
                    <RadioGroup value={mcqOptions.find((o) => o.isCorrect)?.id.toString()}>
                      {mcqOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-start space-x-2 p-3 rounded-lg border border-border/10 bg-background/80"
                        >
                          <RadioGroupItem
                            value={option.id.toString()}
                            id={`option-${option.id}`}
                            checked={option.isCorrect}
                            onCheckedChange={() => handleMcqCorrectChange(option.id)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                              <Input
                                placeholder={`Option ${option.id}`}
                                value={option.text}
                                onChange={(e) => handleMcqOptionChange(option.id, e.target.value)}
                                className="mt-1"
                              />
                            </Label>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleRemoveOption(option.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Remove option</span>
                          </Button>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {questionType === "short-answer" && (
                  <div className="space-y-2">
                    <Label htmlFor="short-answer">Model Answer</Label>
                    <Textarea
                      id="short-answer"
                      placeholder="Enter the model answer for this short answer question..."
                      className="min-h-[150px]"
                      value={shortAnswer}
                      onChange={(e) => setShortAnswer(e.target.value)}
                    />
                  </div>
                )}

                {questionType === "long-answer" && (
                  <div className="space-y-2">
                    <Label htmlFor="long-answer">Model Answer</Label>
                    <Textarea
                      id="long-answer"
                      placeholder="Enter the model answer for this long answer question..."
                      className="min-h-[300px]"
                      value={longAnswer}
                      onChange={(e) => setLongAnswer(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                <span>AI Question Generator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Let AI generate a question and answer based on your selected subject and chapter.
                </p>

                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <HelpCircleIcon className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-500">How it works</h4>
                      <p className="text-xs mt-1">
                        Our AI will generate a complete question with the correct answer format based on your selected
                        parameters. You can then edit the generated content as needed.
                      </p>
                    </div>
                  </div>
                </div>

                <RoamingLightButton onClick={handleGenerateAI} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </RoamingLightButton>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Question Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {questionText ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                    <p className="font-medium">{questionText}</p>
                  </div>

                  {questionType === "mcq" && mcqOptions.some((o) => o.text) && (
                    <div className="space-y-2">
                      {mcqOptions.map(
                        (option) =>
                          option.text && (
                            <div
                              key={option.id}
                              className={`flex items-center space-x-2 p-2 rounded-lg ${
                                option.isCorrect
                                  ? "border border-green-500/20 bg-green-500/10"
                                  : "border border-border/10 bg-background/80"
                              }`}
                            >
                              <div className="size-5 rounded-full border border-input flex items-center justify-center">
                                <span className="text-xs">{String.fromCharCode(64 + option.id)}</span>
                              </div>
                              <span className="text-sm">{option.text}</span>
                              {option.isCorrect && <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />}
                            </div>
                          ),
                      )}
                    </div>
                  )}

                  {questionType === "short-answer" && shortAnswer && (
                    <div className="p-3 rounded-lg border border-green-500/20 bg-green-500/10">
                      <h4 className="font-medium text-green-500 mb-2">Model Answer</h4>
                      <div className="text-sm whitespace-pre-wrap">{shortAnswer}</div>
                    </div>
                  )}

                  {questionType === "long-answer" && longAnswer && (
                    <div className="p-3 rounded-lg border border-green-500/20 bg-green-500/10">
                      <h4 className="font-medium text-green-500 mb-2">Model Answer</h4>
                      <div className="text-sm whitespace-pre-wrap">{longAnswer}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No question yet</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Fill in the question details or use AI to generate a question
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Question Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {questionType === "mcq"
                      ? "Multiple Choice"
                      : questionType === "short-answer"
                        ? "Short Answer"
                        : "Long Answer"}
                  </Badge>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge
                    variant="outline"
                    className={
                      difficulty === "easy"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : difficulty === "medium"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                    }
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                </div>

                {subject && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subject:</span>
                    <span>
                      {subject
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </span>
                  </div>
                )}

                {chapter && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Chapter:</span>
                    <span>{chapter.replace("chapter-", "Chapter ")}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created by:</span>
                  <span>Admin</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created on:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

