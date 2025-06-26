"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SKU {
  id: string
  sku_code: string
  description: string
  ai_price: number
}

interface SearchComponentProps {
  skus: SKU[]
  onSelect: (sku: SKU) => void
  onError: (message: string) => void
}

export function SearchComponent({ skus, onSelect, onError }: SearchComponentProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SKU[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        const filtered = skus
          .filter(
            (sku) =>
              sku.sku_code.toLowerCase().includes(query.toLowerCase()) ||
              sku.description.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 10)

        setSuggestions(filtered)
        setShowSuggestions(true)
        setSelectedIndex(-1)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [query, skus])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex])
        } else if (suggestions.length === 1) {
          handleSelect(suggestions[0])
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSelect = async (sku: SKU) => {
    setIsLoading(true)
    setQuery("")
    setShowSuggestions(false)
    setSelectedIndex(-1)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      onSelect(sku)
    } catch (error) {
      onError("Failed to load SKU details. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  // Focus management for accessibility
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
      })
    }
  }, [selectedIndex])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search SKU code or product name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          className="pl-10 pr-4 py-3 text-lg h-12 border-2 focus:border-blue-500"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-y-auto border-2 shadow-lg">
          {suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((sku, index) => (
                <button
                  key={sku.id}
                  ref={(el) => (suggestionRefs.current[index] = el)}
                  onClick={() => handleSelect(sku)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-slate-100 focus:bg-slate-100 focus:outline-none transition-colors",
                    selectedIndex === index && "bg-slate-100",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900">{highlightMatch(sku.sku_code, query)}</div>
                      <div className="text-sm text-slate-600 truncate">{highlightMatch(sku.description, query)}</div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="font-semibold text-green-600">${sku.ai_price.toFixed(2)}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-slate-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found</p>
              <p className="text-sm">Try a different SKU code or product name</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
