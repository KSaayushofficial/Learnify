"use client"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Code, Layers, MessageSquare, Sparkles, Users, Brain, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      title: "AI-Powered Question Generation",
      description: "Generate custom questions based on your course, subject, and difficulty level.",
      icon: <Sparkles className="size-5" />,
    },
    {
      title: "Comprehensive Course Coverage",
      description: "Prepare for CSIT, BCA, BIM, and other popular courses in Nepal.",
      icon: <BookOpen className="size-5" />,
    },
    {
      title: "Interview Preparation",
      description: "Practice with realistic interview questions and receive AI feedback.",
      icon: <MessageSquare className="size-5" />,
    },
    {
      title: "Mock Interviews",
      description: "Simulate real interview conditions with our AI-powered mock interview system.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics and performance insights.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "Coding Practice",
      description: "Enhance your programming skills with interactive coding challenges.",
      icon: <Code className="size-5" />,
    },
  ]

  const courses = [
    { name: "BSc. CSIT", students: "12,500+", color: "#3B82F6" },
    { name: "BCA", students: "10,200+", color: "#10B981" },
    { name: "BIM", students: "8,700+", color: "#F59E0B" },
    { name: "BIT", students: "5,300+", color: "#8B5CF6" },
    { name: "BE Computer", students: "7,800+", color: "#EC4899" },
    { name: "MCA", students: "3,200+", color: "#6366F1" },
  ]

  const testimonials = [
    {
      quote:
        "This platform completely transformed my exam preparation. The AI-generated questions are incredibly relevant and helped me focus on my weak areas.",
      author: "Aayush Sharma",
      role: "BCA Student, Tribhuvan University",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The interview preparation feature helped me land my first internship. The mock interviews were so realistic that the actual interview felt familiar.",
      author: "Priya Karki",
      role: "CSIT Student, Kathmandu University",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As someone studying BIM, I found the subject-specific questions extremely helpful. The platform understands the Nepali curriculum perfectly.",
      author: "Rohan Maharjan",
      role: "BIM Student, Pokhara University",
      avatar: "/placeholder.svg?height=80&width=80",
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
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="container px-4 md:px-6 relative">
          <motion.div className="absolute -top-[25%] -right-[25%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[120px] opacity-70 animate-blob"></motion.div>
          <motion.div className="absolute -bottom-[25%] -left-[25%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-70 animate-blob animation-delay-2000"></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 relative z-10"
          >
            <Badge
              className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
            >
              AI-Powered Learning
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Ace Your Exams & Interviews
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate AI-powered platform for Nepali students to prepare for exams and interviews with personalized
              questions, mock interviews, and comprehensive resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/exam-prep">
                <Button
                  className="rounded-full h-12 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Start Exam Prep
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/interview-prep">
                <Button
                  className="rounded-full h-12 px-8 text-base border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                >
                  Try Interview Prep
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto max-w-5xl"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/10 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-md">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Platform dashboard"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent"></div>
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 dark:ring-white/10"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl opacity-70"></div>
            <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl opacity-70"></div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="w-full py-12 border-y border-border/10 bg-muted/30 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Trusted by students from top universities in Nepal
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {courses.map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-lg font-bold" style={{ color: course.color }}>
                    {course.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{course.students} students</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)]"></div>
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <Badge
              className="rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
              variant="outline"
            >
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need to Succeed</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Our comprehensive platform provides all the tools you need to excel in your exams and interviews.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={item}>
                <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="w-full py-20 md:py-32 bg-muted/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
                variant="outline"
              >
                New Feature
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">AI-Powered Explanations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our advanced AI assistant provides detailed explanations for every question and answer, helping you
                  understand complex concepts more easily.
                </p>
                <p>
                  When you don't understand something, simply click "Explain Further" and our AI will generate a more
                  detailed explanation tailored to your needs.
                </p>
                <p>
                  The AI assistant can break down complex topics, provide examples, and explain concepts in multiple
                  ways to ensure you fully grasp the material.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Brain className="h-4 w-4" />
                  </div>
                  <span>Personalized explanations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Multiple explanation styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span>Interactive learning experience</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/exam-prep">
                  <Button className="rounded-full">
                    Try AI Explanations
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="AI Assistant explanation"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)]"></div>
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <Badge
              className="rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
              variant="outline"
            >
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Students Say</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Hear from students who have transformed their academic and professional journey with our platform.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="size-12 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground flex-grow italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Transform Your Learning?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Join thousands of Nepali students who are acing their exams and interviews with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/course-selection">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-md hover:shadow-lg"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

