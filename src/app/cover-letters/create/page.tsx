"use client"

import type React from "react"

import { useState } from "react"
import { Save, Download, Eye, ArrowLeft, Wand2, CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CreateCoverLetterPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    recipientName: "",
    companyName: "",
    jobTitle: "",
    introduction: "",
    bodyParagraph1: "",
    bodyParagraph2: "",
    conclusion: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    toast({
      title: "Cover letter saved",
      description: "Your cover letter has been saved successfully.",
    })
  }

  const handleGenerateAI = () => {
    toast({
      title: "AI generation in progress",
      description: "We're crafting personalized content based on your inputs.",
    })

    // Simulate AI generation with a timeout
    setTimeout(() => {
      setFormData({
        ...formData,
        introduction:
          "I am writing to express my interest in the " +
          formData.jobTitle +
          " position at " +
          formData.companyName +
          ". With my background in software development and passion for creating user-friendly applications, I believe I would be a valuable addition to your team.",
        bodyParagraph1:
          "Throughout my career, I have developed strong skills in full-stack development, with particular expertise in React, Node.js, and database management. In my previous role at XYZ Company, I successfully led the development of a customer portal that improved user engagement by 45% and reduced support tickets by 30%.",
        bodyParagraph2:
          "I am particularly drawn to " +
          formData.companyName +
          " because of your commitment to innovation and your focus on creating products that make a real difference in people's lives. I am excited about the opportunity to contribute to your mission and bring my technical and collaborative skills to your team.",
        conclusion:
          "Thank you for considering my application. I would welcome the opportunity to discuss how my skills and experiences align with your needs for the " +
          formData.jobTitle +
          " position. I look forward to the possibility of working with the talented team at " +
          formData.companyName +
          ".",
      })

      toast({
        title: "AI content generated",
        description: "Your cover letter content has been generated. Feel free to edit as needed.",
      })
    }, 2000)
  }

  return (
    <div className="container py-10 md:py-16 space-y-12">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cover-letters">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <PageHeader
            title="Create Cover Letter"
            description="Craft a personalized cover letter that highlights your skills and experiences."
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Cover Letter Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Software Developer Application - XYZ Company"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient's Name</Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      placeholder="e.g., John Smith"
                      value={formData.recipientName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="e.g., XYZ Corporation"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="e.g., Senior Software Developer"
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Cover Letter Content</h3>
                  <Button variant="outline" className="rounded-full" onClick={handleGenerateAI}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate with AI
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="introduction">Introduction</Label>
                  <Textarea
                    id="introduction"
                    name="introduction"
                    placeholder="Introduce yourself and state the position you're applying for."
                    className="min-h-[100px]"
                    value={formData.introduction}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyParagraph1">Body Paragraph 1</Label>
                  <Textarea
                    id="bodyParagraph1"
                    name="bodyParagraph1"
                    placeholder="Highlight your relevant skills and experiences."
                    className="min-h-[120px]"
                    value={formData.bodyParagraph1}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyParagraph2">Body Paragraph 2</Label>
                  <Textarea
                    id="bodyParagraph2"
                    name="bodyParagraph2"
                    placeholder="Explain why you're interested in the company and position."
                    className="min-h-[120px]"
                    value={formData.bodyParagraph2}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conclusion">Conclusion</Label>
                  <Textarea
                    id="conclusion"
                    name="conclusion"
                    placeholder="Thank the reader and express interest in an interview."
                    className="min-h-[100px]"
                    value={formData.conclusion}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" className="rounded-full">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button className="rounded-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Writing Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Be Specific</h4>
                    <p className="text-sm text-muted-foreground">Tailor your letter to the specific job and company.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Show, Don't Tell</h4>
                    <p className="text-sm text-muted-foreground">
                      Use specific examples and achievements to demonstrate your skills.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Keep It Concise</h4>
                    <p className="text-sm text-muted-foreground">Aim for 3-4 paragraphs and no more than one page.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Professional Tone</h4>
                    <p className="text-sm text-muted-foreground">
                      Maintain a professional but conversational tone throughout.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Proofread</h4>
                    <p className="text-sm text-muted-foreground">Check for spelling, grammar, and formatting errors.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/10">
                <h4 className="font-medium mb-3">Cover Letter Structure</h4>
                <Tabs defaultValue="intro" className="w-full">
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="intro" className="text-xs">
                      Intro
                    </TabsTrigger>
                    <TabsTrigger value="body1" className="text-xs">
                      Body 1
                    </TabsTrigger>
                    <TabsTrigger value="body2" className="text-xs">
                      Body 2
                    </TabsTrigger>
                    <TabsTrigger value="closing" className="text-xs">
                      Closing
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="intro" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      State the position you're applying for, where you found it, and a brief introduction of yourself.
                    </p>
                  </TabsContent>
                  <TabsContent value="body1" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Highlight your most relevant skills and experiences. Use specific examples and achievements.
                    </p>
                  </TabsContent>
                  <TabsContent value="body2" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Explain why you're interested in the company and how your values align with their mission.
                    </p>
                  </TabsContent>
                  <TabsContent value="closing" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Thank the reader for their consideration and express interest in an interview or further
                      discussion.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

