"use client"

import { useState, useMemo } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface SKU {
  id: string
  sku_code: string
  description: string
  ai_price: number
  inventory_lbs: number
}

interface CatalogViewProps {
  skus: SKU[]
  onSelect: (sku: SKU) => void
  onError: (message: string) => void
}

export function CatalogView({ skus, onSelect, onError }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 25

  // Filter SKUs based on search query
  const filteredSKUs = useMemo(() => {
    if (!searchQuery.trim()) return skus

    return skus.filter(
      (sku) =>
        sku.sku_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sku.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [skus, searchQuery])

  // Paginate filtered results
  const paginatedSKUs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredSKUs.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredSKUs, currentPage])

  const totalPages = Math.ceil(filteredSKUs.length / itemsPerPage)

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleSKUClick = (sku: SKU) => {
    try {
      onSelect(sku)
    } catch (error) {
      onError("Failed to load SKU details. Please try again.")
    }
  }

  const getInventoryStatus = (lbs: number) => {
    if (lbs < 200) return { label: "Low", variant: "destructive" as const }
    if (lbs < 500) return { label: "Medium", variant: "secondary" as const }
    return { label: "High", variant: "default" as const }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-bold">All SKUs ({filteredSKUs.length})</CardTitle>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Filter SKUs..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">SKU</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right w-24">AI Price</TableHead>
                <TableHead className="text-right w-32">Inventory</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSKUs.length > 0 ? (
                paginatedSKUs.map((sku) => {
                  const inventoryStatus = getInventoryStatus(sku.inventory_lbs)

                  return (
                    <TableRow
                      key={sku.id}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSKUClick(sku)}
                    >
                      <TableCell className="font-medium">{sku.sku_code}</TableCell>
                      <TableCell className="max-w-0">
                        <div className="truncate" title={sku.description}>
                          {sku.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        ${sku.ai_price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm">{sku.inventory_lbs.toLocaleString()} lbs</span>
                          <Badge variant={inventoryStatus.variant} className="text-xs">
                            {inventoryStatus.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <Search className="h-8 w-8 opacity-50" />
                      <p>No SKUs found</p>
                      {searchQuery && <p className="text-sm">Try adjusting your search terms</p>}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-slate-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredSKUs.length)} of {filteredSKUs.length} results
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
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
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
