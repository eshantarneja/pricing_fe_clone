"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Info, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface SKUCardProps {
  sku: {
    sku_code: string
    description: string
    ai_price: number
    last_cost: number
    benchmark_price: number
    inventory_lbs: number
    weeks_on_hand: number
    recent_gp_percent: number
    lifetime_gp_percent: number
    median_gp_percent: number
    usda_today: number
    seven_day_delta: number
    thirty_vs_ninety_delta: number
    one_year_delta: number
    rationale: string[]
    updated_at: string
  }
}

export function SKUCard({ sku }: SKUCardProps) {
  const [isRationaleOpen, setIsRationaleOpen] = useState(false)

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`
  const formatPercent = (percent: number) => `${percent.toFixed(1)}%`
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate margin percentage
  const calculateMargin = (price: number, cost: number) => {
    return (((price - cost) / price) * 100).toFixed(1)
  }

  const getTrendIcon = (delta: number) => {
    if (delta > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (delta < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <div className="h-4 w-4" />
  }

  const getTrendColor = (delta: number) => {
    if (delta > 0) return "text-green-600"
    if (delta < 0) return "text-red-600"
    return "text-slate-600"
  }

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">{sku.sku_code}</CardTitle>
            <p className="text-slate-600 mt-1">{sku.description}</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            <Clock className="h-3 w-3 mr-1" />
            Updated {formatDate(sku.updated_at)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section A: AI Recommended Price */}
        <div className="text-center py-8 bg-gradient-to-r from-emerald-50 via-blue-50 to-indigo-50 rounded-xl border-2 border-indigo-100 shadow-inner">
          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">
            {formatCurrency(sku.ai_price)}
          </div>
          <div className="text-xl font-semibold text-slate-700 mb-2">AI-Recommended Price</div>
          <div className="text-sm text-slate-500 bg-white/60 rounded-full px-4 py-1 inline-block">
            Margin: {calculateMargin(sku.ai_price, sku.last_cost)}%
          </div>
        </div>

        {/* Section B: Rationale (Collapsible) */}
        <Collapsible open={isRationaleOpen} onOpenChange={setIsRationaleOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left h-auto py-4 border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Why this price?</span>
              </div>
              {isRationaleOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {sku.rationale.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-slate-700">{reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Section C: Key Inputs Table */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Key Inputs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cost & Pricing */}
            <Card className="border-2 border-slate-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-4">
                <h4 className="font-medium text-slate-700 mb-3">Cost & Pricing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Cost:</span>
                    <span className="font-medium">{formatCurrency(sku.last_cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Benchmark Price:</span>
                    <span className="font-medium">{formatCurrency(sku.benchmark_price)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card className="border-2 border-slate-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-4">
                <h4 className="font-medium text-slate-700 mb-3">Inventory</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Inventory:</span>
                    <span className="font-medium">{sku.inventory_lbs.toLocaleString()} lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Weeks on Hand:</span>
                    <span className="font-medium">{sku.weeks_on_hand.toFixed(1)} weeks</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gross Profit - Added Median GP% */}
            <Card className="border-2 border-slate-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-4">
                <h4 className="font-medium text-slate-700 mb-3">Gross Profit</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Recent GP:</span>
                    <span className="font-medium">{formatPercent(sku.recent_gp_percent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Lifetime GP:</span>
                    <span className="font-medium">{formatPercent(sku.lifetime_gp_percent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Median GP:</span>
                    <span className="font-medium">{formatPercent(sku.median_gp_percent)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Trends - Added USDA and 1 Year Delta */}
            <Card className="border-2 border-slate-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-4">
                <h4 className="font-medium text-slate-700 mb-3">Market Trends</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">USDA Today:</span>
                    <span className="font-medium">{formatCurrency(sku.usda_today)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">7-Day Δ:</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(sku.seven_day_delta)}
                      <span className={cn("font-medium", getTrendColor(sku.seven_day_delta))}>
                        {formatPercent(Math.abs(sku.seven_day_delta))}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">30v90 Δ:</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(sku.thirty_vs_ninety_delta)}
                      <span className={cn("font-medium", getTrendColor(sku.thirty_vs_ninety_delta))}>
                        {formatPercent(Math.abs(sku.thirty_vs_ninety_delta))}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">1 Year Δ:</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(sku.one_year_delta)}
                      <span className={cn("font-medium", getTrendColor(sku.one_year_delta))}>
                        {formatPercent(Math.abs(sku.one_year_delta))}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
