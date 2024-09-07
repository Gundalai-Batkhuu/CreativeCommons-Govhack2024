'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface WordCloudItem {
  text: string
  value: number
}

const words: WordCloudItem[] = [
  { text: "Pension", value: 100 },
  { text: "Accomodation", value: 30 },
  { text: "Transportation", value: 80 },
  { text: "Disability", value: 75 },
  { text: "Finance", value: 70 },
  { text: "Counselling", value: 65 },
  { text: "Benefits", value: 60 },
  { text: "Government", value: 55 },
  { text: "Policy", value: 50 },
  { text: "Transparency", value: 45 },
  { text: "Inflation", value: 40 },
  { text: "Health", value: 35 },
  { text: "Exercise", value: 30 },
  { text: "Access", value: 25 },
  { text: "Education", value: 60 },
]

const colors = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-teal-500',
]

export default function WordCloud() {
  const maxValue = Math.max(...words.map(word => word.value))
  const minValue = Math.min(...words.map(word => word.value))

  const getSize = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue)
    return Math.floor(normalized * 20) + 10 // font sizes between 12px and 52px
  }

  return (
    <Card className="w-[39%] mx-auto">
      <CardContent className="p-2">
        <div className="flex flex-wrap justify-center items-center">
          {words.map((word, index) => (
            <span
              key={word.text}
              className={`${colors[index % colors.length]} font-bold m-2 transition-all duration-300 ease-in-out hover:scale-110`}
              style={{
                fontSize: `${getSize(word.value)}px`,
                transform: `rotate(${Math.random() * 50 - 15}deg)`,
              }}
            >
              {word.text}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}