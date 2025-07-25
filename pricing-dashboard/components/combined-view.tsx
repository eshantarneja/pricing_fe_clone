"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronLeft, ChevronRight, Sparkles, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface SKU {
  id: string
  sku_code: string
  description: string
  category: string
  storage: string
  ai_price: number
  inventory_lbs: number
  recent_gp_percent: number
  seven_day_delta: number
}

interface CombinedViewProps {
  skus: SKU[]
}

export function CombinedView({ skus }: CombinedViewProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  // Set default filters as requested
  const [categoryFilter, setCategoryFilter] = useState<string>("Beef")
  const [storageFilter, setStorageFilter] = useState<string>("Frozen")
  const [activeInventoryOnly, setActiveInventoryOnly] = useState(true)
  const itemsPerPage = 25

  // Filter SKUs based on all filters
  const filteredSKUs = useMemo(() => {
    let filtered = skus

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (sku) =>
          sku.sku_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sku.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((sku) => sku.category === categoryFilter)
    }

    // Storage filter
    if (storageFilter !== "all") {
      filtered = filtered.filter((sku) => sku.storage === storageFilter)
    }

    // Active inventory filter
    if (activeInventoryOnly) {
      filtered = filtered.filter((sku) => sku.inventory_lbs > 0)
    }

    return filtered
  }, [skus, searchQuery, categoryFilter, storageFilter, activeInventoryOnly])

  // Paginate filtered results
  const paginatedSKUs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredSKUs.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredSKUs, currentPage])

  const totalPages = Math.ceil(filteredSKUs.length / itemsPerPage)

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    handleFilterChange()
  }

  const handleSKUClick = (sku: SKU) => {
    router.push(`/sku/${sku.id}`)
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-indigo-100 text-indigo-900 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex flex-col gap-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            All SKUs ({filteredSKUs.length})
          </CardTitle>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search SKU code or product name..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50"
            />
          </div>

          {/* Filters - Preset but visible */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Category Filter - Preset to Beef */}
            <Select value={categoryFilter} onValueChange={() => {}}>
              <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beef">Beef</SelectItem>
                <SelectItem value="Poultry">Poultry</SelectItem>
                <SelectItem value="Seafood">Seafood</SelectItem>
              </SelectContent>
            </Select>

            {/* Storage Filter - Preset to Frozen */}
            <Select value={storageFilter} onValueChange={() => {}}>
              <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresh">Fresh</SelectItem>
                <SelectItem value="Frozen">Frozen</SelectItem>
              </SelectContent>
            </Select>

            {/* Active Inventory Filter - Preset to Checked */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active-inventory"
                checked={activeInventoryOnly}
                onCheckedChange={() => {}}
                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-indigo-600"
              />
              <label htmlFor="active-inventory" className="text-sm font-medium cursor-pointer">
                Active Inventory Only
              </label>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Table - Removed Trend column */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700 w-24">SKU</TableHead>
                <TableHead className="font-semibold text-slate-700">Description</TableHead>
                <TableHead className="font-semibold text-slate-700 w-24">Category</TableHead>
                <TableHead className="font-semibold text-slate-700 w-20">Storage</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right w-28">AI Price</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right w-24">GP%</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right w-32">Inventory</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSKUs.length > 0 ? (
                paginatedSKUs.map((sku, index) => (
                  <TableRow
                    key={sku.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-md",
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                    )}
                    onClick={() => handleSKUClick(sku)}
                  >
                    <TableCell className="font-bold text-indigo-600">
                      {highlightMatch(sku.sku_code, searchQuery)}
                    </TableCell>
                    <TableCell className="max-w-0">
                      <div className="truncate font-medium text-slate-700" title={sku.description}>
                        {highlightMatch(sku.description, searchQuery)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {sku.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sku.storage === "Fresh" ? "default" : "secondary"} className="text-xs">
                        {sku.storage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-xl text-emerald-600">${sku.ai_price.toFixed(2)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-slate-700">{sku.recent_gp_percent.toFixed(1)}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium text-slate-600">
                        {sku.inventory_lbs.toLocaleString()} lbs
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4 text-slate-500">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 opacity-50" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">No SKUs found</p>
                        <p className="text-sm">Try adjusting your search terms or filters</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-6 bg-slate-50 border-t">
            <div className="text-sm text-slate-600 font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredSKUs.length)} of {filteredSKUs.length} results
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="font-medium"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 7) {
                    pageNum = i + 1
                  } else if (currentPage <= 4) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i
                  } else {
                    pageNum = currentPage - 3 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "w-10 h-10 p-0 font-medium",
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                          : "hover:bg-indigo-50",
                      )}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="font-medium"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
