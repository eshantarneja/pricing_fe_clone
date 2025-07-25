"use client"

import { CombinedView } from "@/components/combined-view"
import { Toaster } from "@/components/ui/toaster"
import { mockSKUs } from "@/data/mock-skus"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          
          {/* Simple solid color text with ample spacing */}
          <h1 className="font-bold text-indigo-600 mb-2" style={{ fontSize: '60px', lineHeight: '1.2' }}>
            Pricing Portal
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4" style={{ fontSize: '24px', lineHeight: '1.4' }}>
            Search any SKU to view AI-recommended pricing and insights
          </p>

          {/* Export Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Excel
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              ERP
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Combined Search and Catalog View */}
          <CombinedView skus={mockSKUs} />
        </div>
      </div>

      <Toaster />
    </div>
  )
}
