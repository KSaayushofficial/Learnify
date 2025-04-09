"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/shared/mode-toggle"
import {
  GraduationCap,
  BookOpen,
  FileText,
  LayoutDashboard,
  MessageSquare,
  User,
  Menu,
  X,
  ChevronRight,
  Brain,
  Sparkles,
  Zap,
  Globe,
  Bell,
  Briefcase,
} from "lucide-react"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      description: "View your progress and recommendations",
    },
    {
      title: "Exam Preparation",
      href: "/exam-preparation",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
      description: "Practice with AI-generated questions",
    },
    {
      title: "Interview Preparation",
      href: "/interview-preparation",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      description: "Prepare for job interviews",
    },
    {
      title: "Past Questions",
      href: "/past-questions",
      icon: <FileText className="h-4 w-4 mr-2" />,
      description: "Access previous exam papers",
    },
    {
      title: "Discussion Forum",
      href: "/discussion-forum",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
      description: "Connect with other students",
    },
  ]

  const isActive = (path) => pathname === path

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-background"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="size-8 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <GraduationCap className="h-5 w-5 text-primary" />
            </motion.div>
            <span className="font-bold text-xl">StudyNepal</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full",
                        isActive(item.href) && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          href="/ai-features"
                        >
                          <Brain className="h-6 w-6 text-primary" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            AI-Powered Learning
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Enhance your learning experience with our advanced AI tools designed specifically for Nepali students.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/exam-preparation" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <div className="text-sm font-medium">AI Question Generator</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Generate custom practice questions based on your needs
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/ai-assistant" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <div className="text-sm font-medium">AI Study Assistant</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get instant answers to your study questions
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/knowledge-network" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <div className="text-sm font-medium">Knowledge Network</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Visualize connections between concepts
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full relative">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                  <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 font-medium border-b">Notifications</div>
                <div className="py-2 px-3 text-sm">
                  <div className="mb-2 pb-2 border-b">
                    <div className="font-medium">New practice questions available</div>
                    <div className="text-muted-foreground text-xs">5 minutes ago</div>
                  </div>
                  <div className="mb-2 pb-2 border-b">
                    <div className="font-medium">Your exam is in 3 days</div>
                    <div className="text-muted-foreground text-xs">2 hours ago</div>
                  </div>
                  <div>
                    <div className="font-medium">AI has generated new study recommendations</div>
                    <div className="text-muted-foreground text-xs">Yesterday</div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="h-4 w-4 mr-2" />
                  My Courses
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="rounded-full">
              <GraduationCap className="h-4 w-4 mr-2" />
              Start Learning
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="container py-4 space-y-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-lg",
                        isActive(item.href) && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      {item.icon}
                      {item.title}
                      <ChevronRight className="h-4 w-4 ml-auto\

