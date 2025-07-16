export interface SKU {
  id: string
  sku_code: string
  description: string
  category: string
  storage: string
  ai_price: number
  last_cost: number
  next_po_cost: number | null
  effective_cost: number
  benchmark_price: number
  inventory_lbs: number
  weeks_on_hand: number
  incoming_pos_week: number
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

export interface POData {
  po_number: string
  required_date: string
  delivery_quantity: number
  cost: number
}

// PO data for the popup
// Manually defined showcase SKUs that will override auto-generated ones
const manualShowcaseSKUs: SKU[] = [
  {
    id: "BF101",
    sku_code: "BF101",
    description: "Premium Ribeye Steak 12oz",
    category: "Beef",
    storage: "Frozen",
    ai_price: 24.99,
    last_cost: 18.50,
    next_po_cost: 17.25,
    effective_cost: 18.50,
    benchmark_price: 26.75,
    inventory_lbs: 450,
    weeks_on_hand: 1.8,
    incoming_pos_week: 2400,
    recent_gp_percent: 32.5,
    lifetime_gp_percent: 30.2,
    median_gp_percent: 31.4,
    usda_today: 19.85,
    seven_day_delta: 2.1,
    thirty_vs_ninety_delta: 0.5,
    one_year_delta: 12.8,
    rationale: [
      "Premium quality cut with consistent demand",
      "Recent supplier agreement reduced PO cost by 7%",
      "Competitor pricing trending upward by 3-5%",
      "Seasonal demand increase projected for Q3",
      "Historical GP stability within target range"
    ],
    updated_at: new Date("2025-07-15T08:30:00Z").toISOString()
  },
  {
    id: "PL105",
    sku_code: "PL105",
    description: "Organic Chicken Breast 2lb",
    category: "Poultry",
    storage: "Refrigerated",
    ai_price: 15.99,
    last_cost: 10.75,
    next_po_cost: 9.99,
    effective_cost: 10.50,
    benchmark_price: 16.49,
    inventory_lbs: 1250,
    weeks_on_hand: 3.2,
    incoming_pos_week: 3500,
    recent_gp_percent: 38.4,
    lifetime_gp_percent: 35.8,
    median_gp_percent: 37.1,
    usda_today: 11.25,
    seven_day_delta: -0.8,
    thirty_vs_ninety_delta: -1.2,
    one_year_delta: 5.3,
    rationale: [
      "Organic certification premium maintains strong margin",
      "Recent market analysis shows price elasticity",
      "Bulk purchasing agreement secured favorable cost",
      "Competitive positioning against conventional products",
      "Consumer trend toward organic continues to grow"
    ],
    updated_at: new Date("2025-07-14T14:15:00Z").toISOString()
  },
  {
    id: "SF220",
    sku_code: "SF220",
    description: "Wild Caught Salmon Fillet 1lb",
    category: "Seafood",
    storage: "Frozen",
    ai_price: 21.99,
    last_cost: 16.25,
    next_po_cost: 15.75,
    effective_cost: 16.00,
    benchmark_price: 22.50,
    inventory_lbs: 780,
    weeks_on_hand: 2.4,
    incoming_pos_week: 1800,
    recent_gp_percent: 29.7,
    lifetime_gp_percent: 28.3,
    median_gp_percent: 29.0,
    usda_today: 17.10,
    seven_day_delta: 1.5,
    thirty_vs_ninety_delta: 2.2,
    one_year_delta: 8.7,
    rationale: [
      "Wild caught premium allows for higher price point",
      "Seasonal availability impacts supply chain",
      "Health-conscious consumer segment growing",
      "Promotional campaign scheduled for next month",
      "Sustainable sourcing certification adds value"
    ],
    updated_at: new Date("2025-07-16T09:45:00Z").toISOString()
  }
];

export const upcomingPOs: Record<string, POData[]> = {
  // Detailed PO data for our showcase SKUs
  "BF101": [
    {
      po_number: "PO-45782",
      required_date: "2025-08-01",
      delivery_quantity: 1200,
      cost: 17.25
    },
    {
      po_number: "PO-45840",
      required_date: "2025-08-15",
      delivery_quantity: 1200,
      cost: 17.10
    },
    {
      po_number: "PO-46012",
      required_date: "2025-08-30",
      delivery_quantity: 1500,
      cost: 16.95
    }
  ],
  "PL105": [
    {
      po_number: "PO-45688",
      required_date: "2025-07-25",
      delivery_quantity: 1800,
      cost: 9.99
    },
    {
      po_number: "PO-45720",
      required_date: "2025-08-10",
      delivery_quantity: 1700,
      cost: 9.85
    }
  ],
  "SF220": [
    {
      po_number: "PO-45825",
      required_date: "2025-07-28",
      delivery_quantity: 900,
      cost: 15.75
    },
    {
      po_number: "PO-46035",
      required_date: "2025-08-20",
      delivery_quantity: 900,
      cost: 15.50
    }
  ],
  // Keep the original example POs for backward compatibility
  "BF001": [{
    po_number: "37918",
    required_date: "2025-07-11",
    delivery_quantity: 9240,
    cost: 0.01
  }],
  "PL104": [{
    po_number: "38155",
    required_date: "2025-07-12",
    delivery_quantity: 5400,
    cost: 3.10
  }]
};

// Extended mock data with 1000+ SKUs for pagination testing
export const mockSKUs: SKU[] = [
  // Include our manually defined showcase SKUs first
  ...manualShowcaseSKUs,
  // Then include auto-generated SKUs (but skip IDs that would conflict with showcase ones)
  {
    id: "BF001",
    sku_code: "BF001",
    description: "Prime Ribeye Steak 8oz",
    category: "Beef",
    storage: "Fresh",
    ai_price: 24.99,
    last_cost: 18.5,
    next_po_cost: 0.01,
    effective_cost: 18.5,
    benchmark_price: 26.5,
    inventory_lbs: 450,
    weeks_on_hand: 2.3,
    incoming_pos_week: 9240,
    recent_gp_percent: 35.1,
    lifetime_gp_percent: 32.8,
    median_gp_percent: 34.2,
    usda_today: 22.75,
    seven_day_delta: 2.1,
    thirty_vs_ninety_delta: -1.8,
    one_year_delta: 8.5,
    rationale: [
      "Current inventory levels are optimal for pricing flexibility",
      "USDA prices show upward trend supporting premium positioning",
      "Recent GP performance exceeds lifetime average",
      "Benchmark comparison suggests room for competitive pricing",
      "Seasonal demand patterns favor current price point",
      "Supply chain costs have stabilized this quarter"
    ],
    updated_at: "2024-01-15T14:30:00Z"
  },
  {
    id: "BF002",
    sku_code: "BF002",
    description: "Ground Beef 80/20 1lb",
    category: "Beef",
    storage: "Fresh",
    ai_price: 6.49,
    last_cost: 4.25,
    next_po_cost: 4.15,
    effective_cost: 4.20,
    benchmark_price: 6.99,
    inventory_lbs: 1200,
    weeks_on_hand: 1.8,
    incoming_pos_week: 3500,
    recent_gp_percent: 34.7,
    lifetime_gp_percent: 36.2,
    median_gp_percent: 35.8,
    usda_today: 5.85,
    seven_day_delta: -0.5,
    thirty_vs_ninety_delta: 1.2,
    one_year_delta: 12.3,
    rationale: [
      "High inventory turnover supports competitive pricing",
      "USDA trends indicate stable commodity pricing",
      "Volume sales opportunity at current price point",
      "Margin optimization based on cost structure",
      "Market positioning against key competitors",
    ],
    updated_at: "2024-01-15T14:25:00Z",
  },
  {
    id: "PL001",
    sku_code: "PL001",
    description: "Organic Chicken Breast 2lb",
    category: "Poultry",
    storage: "Fresh",
    ai_price: 12.99,
    last_cost: 8.75,
    next_po_cost: 8.50,
    effective_cost: 8.65,
    benchmark_price: 13.99,
    inventory_lbs: 680,
    weeks_on_hand: 1.5,
    incoming_pos_week: 2100,
    recent_gp_percent: 32.6,
    lifetime_gp_percent: 34.1,
    median_gp_percent: 33.4,
    usda_today: 11.25,
    seven_day_delta: 1.8,
    thirty_vs_ninety_delta: -0.8,
    one_year_delta: 5.2,
    rationale: [
      "Organic premium positioning supports higher margins",
      "Strong consumer demand for organic poultry",
      "Supply chain costs have stabilized",
      "Competitive advantage in organic segment",
    ],
    updated_at: "2024-01-15T14:20:00Z",
  },
  {
    id: "SF001",
    sku_code: "SF001",
    description: "Atlantic Salmon Fillet 1lb",
    category: "Seafood",
    storage: "Fresh",
    ai_price: 18.99,
    last_cost: 13.25,
    next_po_cost: 13.00,
    effective_cost: 13.15,
    benchmark_price: 19.99,
    inventory_lbs: 320,
    weeks_on_hand: 0.8,
    incoming_pos_week: 1500,
    recent_gp_percent: 30.2,
    lifetime_gp_percent: 33.7,
    median_gp_percent: 32.1,
    usda_today: 16.75,
    seven_day_delta: 2.5,
    thirty_vs_ninety_delta: 1.2,
    one_year_delta: -3.8,
    rationale: [
      "Fresh seafood premium positioning",
      "Limited shelf life supports premium pricing",
      "Market trends favor sustainable seafood",
      "Strong demand in local market",
    ],
    updated_at: "2024-01-15T14:15:00Z",
  },
  {
    id: "BF003",
    sku_code: "BF003",
    description: "Frozen Ground Turkey 1lb",
    category: "Poultry",
    storage: "Frozen",
    ai_price: 5.99,
    last_cost: 3.85,
    next_po_cost: 3.75,
    effective_cost: 3.80,
    benchmark_price: 6.49,
    inventory_lbs: 890,
    weeks_on_hand: 3.2,
    incoming_pos_week: 2800,
    recent_gp_percent: 35.7,
    lifetime_gp_percent: 34.9,
    median_gp_percent: 35.2,
    usda_today: 5.25,
    seven_day_delta: -0.3,
    thirty_vs_ninety_delta: 0.8,
    one_year_delta: 7.1,
    rationale: [
      "Frozen storage allows for flexible pricing",
      "Health-conscious consumer trend supports turkey",
      "Strong inventory position",
      "Competitive pricing vs beef alternatives",
    ],
    updated_at: "2024-01-15T14:10:00Z",
  },
  {
    id: "SF002",
    sku_code: "SF002",
    description: "Frozen Shrimp 16/20 ct 2lb",
    category: "Seafood",
    storage: "Frozen",
    ai_price: 22.99,
    last_cost: 16.5,
    next_po_cost: 16.25,
    effective_cost: 16.35,
    benchmark_price: 24.99,
    inventory_lbs: 0,
    weeks_on_hand: 0,
    incoming_pos_week: 1800,
    recent_gp_percent: 28.3,
    lifetime_gp_percent: 31.2,
    median_gp_percent: 29.8,
    usda_today: 20.25,
    seven_day_delta: 3.1,
    thirty_vs_ninety_delta: -1.5,
    one_year_delta: 15.7,
    rationale: [
      "Out of stock - premium pricing for restock",
      "Import costs have increased recently",
      "Strong demand for premium shrimp",
      "Market positioning vs competitors",
    ],
    updated_at: "2024-01-15T14:05:00Z",
  },
  // Generate 1000+ additional SKUs
  ...Array.from({ length: 1000 }, (_, i) => {
    const categories = ["Beef", "Poultry", "Seafood"]
    const storageTypes = ["Fresh", "Frozen"]
    const beefCuts = [
      "Sirloin Steak",
      "T-Bone Steak",
      "Filet Mignon",
      "Chuck Roast",
      "Brisket",
      "Short Ribs",
      "Ground Beef 85/15",
      "Ground Beef 90/10",
      "Flank Steak",
      "Skirt Steak",
      "Round Roast",
      "Eye of Round",
      "Top Round",
      "Bottom Round",
      "Tri-Tip",
      "Porterhouse",
      "Strip Steak",
      "Tenderloin",
      "Prime Rib",
      "Cross Rib Roast",
      "Arm Roast",
      "Blade Roast",
      "Rump Roast",
    ]
    const poultryItems = [
      "Chicken Thighs",
      "Chicken Wings",
      "Chicken Drumsticks",
      "Whole Chicken",
      "Chicken Tenders",
      "Turkey Breast",
      "Turkey Thighs",
      "Turkey Wings",
      "Ground Chicken",
      "Chicken Leg Quarters",
      "Cornish Hen",
      "Duck Breast",
      "Duck Legs",
      "Turkey Drumsticks",
      "Chicken Backs",
      "Turkey Ground",
      "Chicken Livers",
      "Turkey Necks",
      "Chicken Gizzards",
      "Duck Whole",
    ]
    const seafoodItems = [
      "Cod Fillet",
      "Halibut Steak",
      "Tuna Steak",
      "Mahi Mahi",
      "Snapper Fillet",
      "Tilapia",
      "Catfish Fillet",
      "Flounder",
      "Sea Bass",
      "Grouper",
      "Swordfish",
      "Mackerel",
      "Sardines",
      "Crab Legs",
      "Lobster Tail",
      "Scallops",
      "Mussels",
      "Clams",
      "Oysters",
      "Calamari",
      "Octopus",
      "Prawns",
      "Crawfish",
      "Sea Scallops",
      "Bay Scallops",
    ]

    const category = categories[i % categories.length]
    const storage = storageTypes[i % storageTypes.length]

    let items, prefix
    if (category === "Beef") {
      items = beefCuts
      prefix = "BF"
    } else if (category === "Poultry") {
      items = poultryItems
      prefix = "PL"
    } else {
      items = seafoodItems
      prefix = "SF"
    }

    const item = items[i % items.length]
    const weights = ["8oz", "10oz", "12oz", "1lb", "1.5lb", "2lb", "3lb", "5lb"]
    const weight = weights[i % weights.length]

    const basePrice = category === "Seafood" ? 15 + (i % 20) : category === "Beef" ? 8 + (i % 25) : 5 + (i % 15)

    // Use deterministic values based on index instead of random to prevent hydration errors
    const aiPrice = basePrice + (i % 5) + 1
    const lastCost = aiPrice * (0.6 + (i % 5) / 25)
    const benchmarkPrice = aiPrice * (1 + ((i % 7) / 20 - 0.15))

    const recentGP = Number((25 + (i % 15)).toFixed(1))
    const lifetimeGP = Number((25 + ((i + 3) % 15)).toFixed(1))
    const medianGP = Number(((recentGP + lifetimeGP) / 2 + ((i % 4) - 2)).toFixed(1))

    return {
      id: `${prefix}${String(i + 100).padStart(3, "0")}`,
      sku_code: `${prefix}${String(i + 100).padStart(3, "0")}`,
      description: `${item} ${weight}`,
      category,
      storage,
      ai_price: Number(aiPrice.toFixed(2)),
      last_cost: Number(lastCost.toFixed(2)),
      next_po_cost: i % 5 === 0 ? Number((lastCost * 0.8).toFixed(2)) : null,
      effective_cost: Number(lastCost.toFixed(2)),
      benchmark_price: Number(benchmarkPrice.toFixed(2)),
      inventory_lbs: Math.floor(100 + (i % 15) * 100),
      weeks_on_hand: Number(((i % 40) / 10).toFixed(1)),
      incoming_pos_week: i % 5 === 0 ? 1000 + (i * 100) % 9000 : 0,
      recent_gp_percent: recentGP,
      lifetime_gp_percent: lifetimeGP,
      median_gp_percent: medianGP,
      usda_today: Number((aiPrice * (0.8 + (i % 8) / 20)).toFixed(2)),
      seven_day_delta: Number(((i % 6) - 3).toFixed(1)),
      thirty_vs_ninety_delta: Number(((i % 4) - 2).toFixed(1)),
      one_year_delta: Number(((i % 30) - 5).toFixed(1)),
      rationale: [
        "Market analysis supports current pricing strategy",
        "Inventory levels align with demand forecasting",
        "Competitive positioning within category segment",
        "Cost structure optimization based on supplier agreements",
        "Consumer demand patterns favor this price point",
      ],
      // Use a fixed date to prevent hydration errors
      updated_at: new Date("2025-07-10T10:00:00Z").toISOString(),
    }
  }),
]
