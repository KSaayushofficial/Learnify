"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight, Search, BookMarked, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function ChapterSidebar({ chapters, selectedChapter, onChapterSelect, subject }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expanded, setExpanded] = useState(true)

  const filteredChapters = chapters.filter((chapter) => chapter.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md sticky top-24">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center">
            <BookMarked className="h-5 w-5 mr-2 text-primary" />
            <span>Chapters</span>
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {chapters.length} Chapters
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search chapters..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
            <div className="flex items-start gap-2">
              <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">
                  {subject
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">Your progress: 45% complete</p>
                <Progress value={45} className="h-1.5 mt-2" />
              </div>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1"
          >
            {filteredChapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                variants={itemVariants}
                whileHover={{ x: 3 }}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors",
                  selectedChapter === chapter.id ? "bg-primary/15 text-primary font-medium" : "hover:bg-muted/50",
                )}
                onClick={() => onChapterSelect(chapter.id)}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">{chapter.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{chapter.progress}%</span>
                  <Progress value={chapter.progress} className="w-16 h-1.5" />
                  {selectedChapter === chapter.id && <ChevronRight className="h-4 w-4 text-primary" />}
                </div>
              </motion.div>
            ))}

            {filteredChapters.length === 0 && (
              <div className="text-center py-4 text-muted-foreground text-sm">
                No chapters found matching "{searchQuery}"
              </div>
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

