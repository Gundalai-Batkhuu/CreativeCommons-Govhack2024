/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VGQeGPKY8Vj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import {SearchIcon, ListOrderedIcon, ChevronDownIcon} from "@/components/ui/icons";




import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    category: [],
    price: { min: 0, max: 1000 },
  })
  const [sort, setSort] = useState("featured")
  const databases = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "PostgreSQL",
      description:
        "A powerful, open-source object-relational database system with a focus on extensibility and SQL compliance.",
      category: "Relational",
      price: 49,
      featured: true,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "MongoDB",
      description:
        "A popular NoSQL database that stores data in flexible, JSON-like documents, making it a great fit for modern applications.",
      category: "NoSQL",
      price: 29,
      featured: false,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Redis",
      description:
        "An open-source, in-memory data structure store used as a database, cache, and message broker, known for its speed and simplicity.",
      category: "NoSQL",
      price: 39,
      featured: true,
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "MySQL",
      description:
        "A widely used, open-source relational database management system that is known for its speed, reliability, and ease of use.",
      category: "Relational",
      price: 59,
      featured: false,
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Cassandra",
      description:
        "A distributed, wide-column store NoSQL database management system designed to handle large amounts of data across many servers.",
      category: "NoSQL",
      price: 69,
      featured: true,
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Elasticsearch",
      description:
        "A distributed, open-source search and analytics engine for handling large volumes of data in near real-time.",
      category: "Search",
      price: 79,
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
        return database.price >= filters.price.min && database.price <= filters.price.max
      })
      .sort((a, b) => {
        switch (sort) {
          case "featured":
            return b.featured - a.featured
          case "low":
            return a.price - b.price
          case "high":
            return b.price - a.price
          default:
            return 0
        }
      })
  }, [search, filters, sort])
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Database Marketplace</h1>
        <p className="text-muted-foreground">
          Explore and compare a wide range of database solutions for your project.
        </p>
      </header>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search databases..."
              className="pl-10 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="h-4 w-4" />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">Price: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high">Price: High to Low</DropdownMenuRadioItem>
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
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={filters.category.includes("Relational")}
                        onCheckedChange={() => {
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            category: prevFilters.category.includes("Relational")
                              ? prevFilters.category.filter((c) => c !== "Relational")
                              : [...prevFilters.category, "Relational"],
                          }))
                        }}
                      />
                      Relational
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={filters.category.includes("NoSQL")}
                        onCheckedChange={() => {
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            category: prevFilters.category.includes("NoSQL")
                              ? prevFilters.category.filter((c) => c !== "NoSQL")
                              : [...prevFilters.category, "NoSQL"],
                          }))
                        }}
                      />
                      NoSQL
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={filters.category.includes("Search")}
                        onCheckedChange={() => {
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            category: prevFilters.category.includes("Search")
                              ? prevFilters.category.filter((c) => c !== "Search")
                              : [...prevFilters.category, "Search"],
                          }))
                        }}
                      />
                      Search
                    </Label>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Price</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span>Min:</span>
                      <Input
                        type="number"
                        min={0}
                        max={filters.price.max}
                        value={filters.price.min}
                        onChange={(e) =>
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            price: {
                              ...prevFilters.price,
                              min: parseInt(e.target.value),
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Max:</span>
                      <Input
                        type="number"
                        min={filters.price.min}
                        max={1000}
                        value={filters.price.max}
                        onChange={(e) =>
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            price: {
                              ...prevFilters.price,
                              max: parseInt(e.target.value),
                            },
                          }))
                        }
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
                <div className="text-primary font-semibold">${database.price}</div>
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

