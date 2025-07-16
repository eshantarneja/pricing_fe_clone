import { SKUCard } from "@/components/sku-card"
import { mockSKUs } from "@/data/mock-skus"
import { SKUDetailClient } from "./client"

// Server component that properly handles params
interface SKUDetailPageProps {
  params: {
    id: string
  }
}

// This is a server component that safely handles params
export default function SKUDetailPage({ params }: SKUDetailPageProps) {
  // Access id directly since this is a server component
  const id = params.id
  const sku = mockSKUs.find((s) => s.id === id)

  // Pass the sku to the client component
  return <SKUDetailClient sku={sku} />
}
