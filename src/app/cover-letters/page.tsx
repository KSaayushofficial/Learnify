"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye,
  Copy,
  CheckCircle2,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function CoverLettersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "A formal template suitable for traditional industries.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Creative",
      description: "A modern template for creative and design roles.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#EC4899",
    },
    {
      id: 3,
      name: "Simple",
      description: "A clean and minimal template that focuses on content.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#10B981",
    },
    {
      id: 4,
      name: "Executive",
      description: "An elegant template for senior positions.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#8B5CF6",
    },
  ]

  const myCoverLetters = [
    {
      id: 1,
      name: "Software Developer - XYZ Corp",
      template: "Professional",
      lastUpdated: "2023-05-15T10:30:00Z",
      status: "complete",
    },
    {
      id: 2,
      name: "UX Designer - ABC Agency",
      template: "Creative",
      lastUpdated: "2023-06-22T14:45:00Z",
      status: "draft",
    },
    {
      id: 3,
      name: "Project Manager - Tech Solutions",
      template: "Simple",
      lastUpdated: "2023-07-10T09:15:00Z",
      status: "complete",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleCreateCoverLetter = (templateId: number) => {
    toast({
      title: "Template selected",
      description: `You've selected the ${templates.find((t) => t.id === templateId)?.name} template. Let's create your cover letter!`,
    })
  }

  const handleDeleteCoverLetter = (id: number) => {
    toast({
      title: "Cover letter deleted",
      description: "Your cover letter has been deleted successfully.",
    })
  }

  const handleDuplicateCoverLetter = (id: number) => {
    toast({
      title: "Cover letter duplicated",
      description: "A copy of your cover letter has been created.",
    })
  }

  const filteredCoverLetters = myCoverLetters.filter((letter) => {
    if (activeFilter !== "all" && letter.status !== activeFilter) {
      return false
    }

    if (searchQuery) {
      return letter.name.toLowerCase().includes(searchQuery.toLowerCase())
    }

    return true
  })

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
        <PageHeader
          title="Cover Letters"
          description="Create, manage, and customize your cover letters to make a strong impression with potential employers."
          className="text-center max-w-3xl mx-auto mb-12"
        />
      </div>

      <Tabs defaultValue="my-letters" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="my-letters" className="rounded-full">
              My Cover Letters
            </TabsTrigger>
            <TabsTrigger value="templates" className="rounded-full">
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="my-letters">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cover letters..."
                  className="pl-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto rounded-full">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setActiveFilter("all")}>All Cover Letters</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter("complete")}>Completed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter("draft")}>Drafts</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/cover-letters/create">
                  <Button className="w-full md:w-auto rounded-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New
                  </Button>
                </Link>
              </div>
            </div>

            {filteredCoverLetters.length > 0 ? (
              <div className="space-y-4">
                {filteredCoverLetters.map((letter) => (
                  <Card key={letter.id} className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">{letter.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Template: {letter.template}</span>
                              <span>Last updated: {formatDate(letter.lastUpdated)}</span>
                              {letter.status === "complete" ? (
                                <span className="flex items-center text-green-500">
                                  <CheckCircle2 className="mr-1 h-4 w-4" />
                                  Complete
                                </span>
                              ) : (
                                <span className="text-amber-500">Draft</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Preview</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleDuplicateCoverLetter(letter.id)}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Duplicate</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full text-destructive hover:text-destructive"
                            onClick={() => handleDeleteCoverLetter(letter.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No cover letters found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    You don't have any cover letters matching your search criteria. Create a new cover letter or try a
                    different search.
                  </p>
                  <Link href="/cover-letters/create">
                    <Button className="rounded-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Cover Letter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {templates.map((template) => (
              <motion.div key={template.id} variants={item}>
                <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <Image
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                    <CardFooter className="p-4">
                      <Button
                        className="w-full rounded-full"
                        style={{
                          backgroundColor: template.color,
                          color: "white",
                          borderColor: "transparent",
                        }}
                        onClick={() => handleCreateCoverLetter(template.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Use This Template
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-8 border border-border/10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Cover Letter Writing Tips</h2>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Customize each cover letter for the specific job</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Address the hiring manager by name when possible</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Highlight relevant skills and experiences</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Keep it concise (one page maximum)</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Proofread carefully for spelling and grammar errors</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/resume-builder">
                <Button variant="outline" className="rounded-full">
                  Build Your Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-background/50 backdrop-blur-md rounded-xl p-6 border border-border/10 shadow-md">
            <h3 className="text-lg font-bold mb-4">Cover Letter Structure</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Header & Greeting</h4>
                  <p className="text-sm text-muted-foreground">Your contact info and personalized greeting</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Opening Paragraph</h4>
                  <p className="text-sm text-muted-foreground">Express interest and mention the specific position</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Body Paragraphs</h4>
                  <p className="text-sm text-muted-foreground">Highlight relevant skills and experiences</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Closing Paragraph</h4>
                  <p className="text-sm text-muted-foreground">Thank them and express interest in an interview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

