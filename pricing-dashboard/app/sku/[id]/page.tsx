"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SKUCard } from "@/components/sku-card"
import { mockSKUs } from "@/data/mock-skus"

interface SKUDetailPageProps {
  params: {
    id: string
  }
}

export default function SKUDetailPage({ params }: SKUDetailPageProps) {
  const router = useRouter()
  const sku = mockSKUs.find((s) => s.id === params.id)

  if (!sku) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">SKU Not Found</h1>
          <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>

        {/* SKU Details */}
        <SKUCard sku={sku} />
      </div>
    </div>
  )
}
