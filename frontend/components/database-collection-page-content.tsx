/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VGQeGPKY8Vj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React, { useState, useMemo } from "react"
import { SearchIcon, ListOrderedIcon, ChevronDownIcon } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {Flame} from "lucide-react"
interface Database {
  id: number
  image: string
  title: string
  description: string
  category: string
  engagement: number
  featured: boolean
}

interface Filters {
  category: string[]
  engagement: {
    min: number
    max: number
  }
}

type SortOption = "featured" | "low" | "high"

export default function DatabaseCollectionPageContent() {
  const [search, setSearch] = useState<string>("")
  const [filters, setFilters] = useState<Filters>({
    category: [],
    engagement: { min: 0, max: 1000 },
  })
  const [sort, setSort] = useState<SortOption>("featured")

  const databases: Database[] = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Style Manual",
      description:
        "The Style Manual is for everyone who writes, edits or approves Australian Government content. Use it to create clear and consistent content that meets the needs of users.",
      category: "Federal Government",
      engagement: 49,
      featured: true,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Guide to help people with disabilities",
      description:
        "A popular NoSQL database that stores data in flexible, JSON-like documents, making it a great fit for modern applications.",
      category: "NoSQL",
      engagement: 29,
      featured: false,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "List of online resources/services",
      description:
        "An open-source, in-memory data structure store used as a database, cache, and message broker, known for its speed and simplicity.",
      category: "NoSQL",
      engagement: 39,
      featured: true,
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Education (civics and citizenship)",
      description:
        "A widely used, open-source relational database management system that is known for its speed, reliability, and ease of use.",
      category: "Relational",
      engagement: 59,
      featured: false,
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Cassandra",
      description:
        "A distributed, wide-column store NoSQL database management system designed to handle large amounts of data across many servers.",
      category: "NoSQL",
      engagement: 69,
      featured: true,
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Elasticsearch",
      description:
        "A distributed, open-source search and analytics engine for handling large volumes of data in near real-time.",
      category: "Search",
      engagement: 79,
      featured: false,
    },
  ]
  const filteredDatabases = useMemo(() => {
    return databases
      .filter((database) => {
        const searchValue = search.toLowerCase()
        return (
          database.title.toLowerCase().includes(searchValue) || database.description.toLowerCase().includes(searchValue)
        )
      })
      .filter((database) => {
        if (filters.category.length > 0) {
          return filters.category.includes(database.category)
        }
        return true
      })
      .filter((database) => {
        return database.engagement >= filters.engagement.min && database.engagement <= filters.engagement.max
      })
      .sort((a, b) => {
        switch (sort) {
          case "featured":
            return Number(b.featured) - Number(a.featured)
          case "low":
            return a.engagement - b.engagement
          case "high":
            return b.engagement - a.engagement
          default:
            return 0
        }
      })
  }, [search, filters, sort])

  const handleCategoryChange = (category: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category.includes(category)
        ? prevFilters.category.filter((c) => c !== category)
        : [...prevFilters.category, category],
    }))
  }

  const handleEngagementChange = (minOrMax: 'min' | 'max', value: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      engagement: {
        ...prevFilters.engagement,
        [minOrMax]: value,
      },
    }))
  }

  const handleSortChange = (value: string) => {
    if (value === "featured" || value === "low" || value === "high") {
      setSort(value)
    }
  }
    return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Database Collection</h1>
        <p className="text-muted-foreground">
          Explore and compare a wide range of database solutions for your project.
        </p>
      </header>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md flex items-center">
            <SearchIcon className="absolute left-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search databases..."
              className="pl-12 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="h-4 w-4"/>
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
                <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">Engagement: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high">Date: Recent to Old</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="filters">
            <AccordionTrigger className="flex items-center justify-between w-full">
              <span>Filters</span>
              <ChevronDownIcon className="h-4 w-4" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Category</h3>
                  <div className="space-y-2">
                    {["Relational", "NoSQL", "Search"].map((category) => (
                      <Label key={category} className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.category.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        {category}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Engagement rate</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span>Min:</span>
                      <Input
                        type="number"
                        min={0}
                        max={filters.engagement.max}
                        value={filters.engagement.min}
                        onChange={(e) => handleEngagementChange('min', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Max:</span>
                      <Input
                        type="number"
                        min={filters.engagement.min}
                        max={1000}
                        value={filters.engagement.max}
                        onChange={(e) => handleEngagementChange('max', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDatabases.map((database) => (
          <Card key={database.id}>
            <Link href="#" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt={database.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
            </Link>
            <CardContent className="p-4">
              <div className="mb-2">
                <Link href="#" className="text-lg font-semibold hover:underline" prefetch={false}>
                  {database.title}
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2">{database.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-primary font-semibold">
                  <Flame className={"pb-1"}/>
                  <span>{database.engagement}</span>
                </div>
                {database.featured && (
                    <Badge variant="secondary" className="px-2 py-1 text-xs">
                    Featured
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

