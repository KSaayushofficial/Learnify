"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Plus, Trash2, Edit, Eye, Copy, CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function ResumeBuilderPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("templates")

  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "A clean and professional template suitable for corporate roles.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Creative",
      description: "A modern and creative template for design and creative roles.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#EC4899",
    },
    {
      id: 3,
      name: "Minimal",
      description: "A simple and minimal template that focuses on content.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#10B981",
    },
    {
      id: 4,
      name: "Academic",
      description: "Designed for academic and research positions.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#8B5CF6",
    },
    {
      id: 5,
      name: "Technical",
      description: "Optimized for technical roles with skills emphasis.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#F59E0B",
    },
    {
      id: 6,
      name: "Executive",
      description: "Elegant design for executive and leadership positions.",
      image: "/placeholder.svg?height=400&width=300",
      color: "#6B7280",
    },
  ]

  const myResumes = [
    {
      id: 1,
      name: "Software Developer Resume",
      template: "Professional",
      lastUpdated: "2023-05-15T10:30:00Z",
      progress: 100,
    },
    {
      id: 2,
      name: "UX Designer Application",
      template: "Creative",
      lastUpdated: "2023-06-22T14:45:00Z",
      progress: 85,
    },
    {
      id: 3,
      name: "Project Manager Resume",
      template: "Minimal",
      lastUpdated: "2023-07-10T09:15:00Z",
      progress: 65,
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

  const handleCreateResume = (templateId: number) => {
    toast({
      title: "Template selected",
      description: `You've selected the ${templates.find((t) => t.id === templateId)?.name} template. Let's build your resume!`,
    })
    setActiveTab("my-resumes")
  }

  const handleDeleteResume = (id: number) => {
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted successfully.",
    })
  }

  const handleDuplicateResume = (id: number) => {
    toast({
      title: "Resume duplicated",
      description: "A copy of your resume has been created.",
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
    <div className="container py-10 md:py-16 space-y-12">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <PageHeader
          title="Resume Builder"
          description="Create professional resumes with our easy-to-use builder. Choose from multiple templates and customize to showcase your skills and experience."
          className="text-center max-w-3xl mx-auto mb-12"
        />
      </div>

      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="templates" className="rounded-full">
              Resume Templates
            </TabsTrigger>
            <TabsTrigger value="my-resumes" className="rounded-full">
              My Resumes
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="templates">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                        onClick={() => handleCreateResume(template.id)}
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

        <TabsContent value="my-resumes">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Resumes</h2>
            <Button onClick={() => setActiveTab("templates")} className="rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </div>

          {myResumes.length > 0 ? (
            <div className="space-y-4">
              {myResumes.map((resume) => (
                <Card key={resume.id} className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{resume.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Template: {resume.template}</span>
                            <span>Last updated: {formatDate(resume.lastUpdated)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto">
                        {resume.progress < 100 && (
                          <div className="flex items-center gap-2 mr-4">
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${resume.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{resume.progress}%</span>
                          </div>
                        )}
                        {resume.progress === 100 && (
                          <div className="flex items-center gap-1 mr-4 text-green-500 text-sm">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Complete</span>
                          </div>
                        )}
                        <div className="flex gap-2">
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
                            onClick={() => handleDuplicateResume(resume.id)}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Duplicate</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full text-destructive hover:text-destructive"
                            onClick={() => handleDeleteResume(resume.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          {resume.progress === 100 && (
                            <Button variant="default" className="rounded-full ml-2">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          )}
                        </div>
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
                <h3 className="text-xl font-bold mb-2">No resumes yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  You haven't created any resumes yet. Choose a template to get started on your professional resume.
                </p>
                <Button onClick={() => setActiveTab("templates")} className="rounded-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Resume
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-8 border border-border/10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Resume Writing Tips</h2>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Tailor your resume to each job application</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Use action verbs to describe your achievements</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Quantify your accomplishments with numbers when possible</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Keep your resume concise and relevant (1-2 pages)</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Proofread carefully for spelling and grammar errors</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/interview-prep">
                <Button variant="outline" className="rounded-full">
                  Prepare for Interviews
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-background/50 backdrop-blur-md rounded-xl p-6 border border-border/10 shadow-md">
            <h3 className="text-lg font-bold mb-4">ATS-Friendly Resume Checklist</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Use standard section headings</h4>
                  <p className="text-sm text-muted-foreground">Experience, Education, Skills</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Include relevant keywords</h4>
                  <p className="text-sm text-muted-foreground">Match skills from the job description</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Use a clean, simple format</h4>
                  <p className="text-sm text-muted-foreground">Avoid tables, headers, footers, and images</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Save as PDF</h4>
                  <p className="text-sm text-muted-foreground">Unless specifically requested in another format</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

