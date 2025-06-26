// Extended mock data with 1000+ SKUs for pagination testing
export const mockSKUs = [
  // Original SKUs
  {
    id: "BF001",
    sku_code: "BF001",
    description: "Prime Ribeye Steak 12oz",
    category: "Beef",
    storage: "Fresh",
    ai_price: 24.99,
    last_cost: 18.5,
    benchmark_price: 26.5,
    inventory_lbs: 450,
    weeks_on_hand: 2.3,
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
      "Supply chain costs have stabilized this quarter",
    ],
    updated_at: "2024-01-15T14:30:00Z",
  },
  {
    id: "BF002",
    sku_code: "BF002",
    description: "Ground Beef 80/20 1lb",
    category: "Beef",
    storage: "Fresh",
    ai_price: 6.49,
    last_cost: 4.25,
    benchmark_price: 6.99,
    inventory_lbs: 1200,
    weeks_on_hand: 1.8,
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
    benchmark_price: 13.99,
    inventory_lbs: 680,
    weeks_on_hand: 1.5,
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
    benchmark_price: 19.99,
    inventory_lbs: 320,
    weeks_on_hand: 0.8,
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
    benchmark_price: 6.49,
    inventory_lbs: 890,
    weeks_on_hand: 3.2,
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
    benchmark_price: 24.99,
    inventory_lbs: 0,
    weeks_on_hand: 0,
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

    const aiPrice = basePrice + Math.random() * 5
    const lastCost = aiPrice * (0.6 + Math.random() * 0.2)
    const benchmarkPrice = aiPrice * (1 + (Math.random() * 0.3 - 0.15))

    const recentGP = Number((25 + Math.random() * 15).toFixed(1))
    const lifetimeGP = Number((25 + Math.random() * 15).toFixed(1))
    const medianGP = Number(((recentGP + lifetimeGP) / 2 + (Math.random() * 4 - 2)).toFixed(1))

    return {
      id: `${prefix}${String(i + 100).padStart(3, "0")}`,
      sku_code: `${prefix}${String(i + 100).padStart(3, "0")}`,
      description: `${item} ${weight}`,
      category,
      storage,
      ai_price: Number(aiPrice.toFixed(2)),
      last_cost: Number(lastCost.toFixed(2)),
      benchmark_price: Number(benchmarkPrice.toFixed(2)),
      inventory_lbs: Math.floor(Math.random() * 1500),
      weeks_on_hand: Number((Math.random() * 4).toFixed(1)),
      recent_gp_percent: recentGP,
      lifetime_gp_percent: lifetimeGP,
      median_gp_percent: medianGP,
      usda_today: Number((aiPrice * (0.8 + Math.random() * 0.4)).toFixed(2)),
      seven_day_delta: Number((Math.random() * 6 - 3).toFixed(1)),
      thirty_vs_ninety_delta: Number((Math.random() * 4 - 2).toFixed(1)),
      one_year_delta: Number((Math.random() * 30 - 5).toFixed(1)),
      rationale: [
        "Market analysis supports current pricing strategy",
        "Inventory levels align with demand forecasting",
        "Competitive positioning within category segment",
        "Cost structure optimization based on supplier agreements",
        "Consumer demand patterns favor this price point",
      ],
      updated_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
  }),
]
