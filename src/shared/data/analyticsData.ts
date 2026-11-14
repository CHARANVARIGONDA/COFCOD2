// ============================================================================
// COFOCO Analytics & Operations Mock Dataset
// Sourced from Requirements Analysis Pages 3 & 4 (OP01-OP05, AN01-AN03)
// ============================================================================

export interface MetricDefinition {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  formula: string;
  description: string;
  category: 'commercial' | 'operations' | 'engagement';
}

export interface CharacterPerformance {
  slug: string;
  name: string;
  color: string;
  sessions: number;
  orders: number;
  revenue: number;
  conversionRate: number;
  engagementRate: number;
  contributionMargin: number;
}

export interface OperationsOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  city: string;
  pincode: string;
  date: string;
  promisedDispatchDate: string;
  isOverdue: boolean;
  status: 'paid' | 'picking' | 'packed' | 'dispatched' | 'delivered';
  assignedOwner: string;
  kitName: string;
  kitSlug: string;
  characterSlug: string;
  totalAmount: number;
  paymentMethod: string;
  pickList: {
    item: string;
    qty: number;
    spec: string;
    sku: string;
    verified: boolean;
  }[];
  trackingNumber?: string;
}

export interface StockComponent {
  sku: string;
  name: string;
  category: string;
  onHand: number;
  reserved: number;
  available: number;
  unitCost: number;
  associatedKits: string[];
  reorderThreshold: number;
  status: 'healthy' | 'low' | 'critical';
}

export interface ExceptionCase {
  id: string;
  orderNumber: string;
  type: 'stock_shortage' | 'payment_mismatch' | 'late_dispatch' | 'return_pending';
  owner: string;
  amount: number;
  status: 'open' | 'investigating' | 'resolved';
  notes: string;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  event: 'character_view' | 'kit_view' | 'compare_used' | 'add_to_cart' | 'checkout_started' | 'order_captured';
  characterSlug?: string;
  kitSlug?: string;
  timestamp: string;
  sessionId: string;
  campaign?: string;
}

export interface DailySalesDataPoint {
  dayLabel: string;
  fullDate: string;
  revenue: number;
  orders: number;
  aov: number;
  topArchetype: string;
  conversionRate: number;
}

export const MOCK_DAILY_SALES: DailySalesDataPoint[] = [
  { dayLabel: '01 Nov', fullDate: '01 Nov 2026 (Sun)', revenue: 68400, orders: 22, aov: 3109, topArchetype: 'Arjun', conversionRate: 3.1 },
  { dayLabel: '02 Nov', fullDate: '02 Nov 2026 (Mon)', revenue: 84200, orders: 27, aov: 3118, topArchetype: 'Bheema', conversionRate: 3.4 },
  { dayLabel: '03 Nov', fullDate: '03 Nov 2026 (Tue)', revenue: 76500, orders: 24, aov: 3187, topArchetype: 'Karna', conversionRate: 3.2 },
  { dayLabel: '04 Nov', fullDate: '04 Nov 2026 (Wed)', revenue: 92800, orders: 29, aov: 3200, topArchetype: 'Arjun', conversionRate: 3.6 },
  { dayLabel: '05 Nov', fullDate: '05 Nov 2026 (Thu)', revenue: 114600, orders: 36, aov: 3183, topArchetype: 'Bheema', conversionRate: 3.9 },
  { dayLabel: '06 Nov', fullDate: '06 Nov 2026 (Fri)', revenue: 138900, orders: 42, aov: 3307, topArchetype: 'Arjun', conversionRate: 4.1 },
  { dayLabel: '07 Nov', fullDate: '07 Nov 2026 (Sat)', revenue: 162400, orders: 49, aov: 3314, topArchetype: 'Draupadi', conversionRate: 4.3 },
  { dayLabel: '08 Nov', fullDate: '08 Nov 2026 (Sun)', revenue: 148200, orders: 46, aov: 3221, topArchetype: 'Sita', conversionRate: 3.9 },
  { dayLabel: '09 Nov', fullDate: '09 Nov 2026 (Mon)', revenue: 95400, orders: 30, aov: 3180, topArchetype: 'Karna', conversionRate: 3.3 },
  { dayLabel: '10 Nov', fullDate: '10 Nov 2026 (Tue)', revenue: 108300, orders: 34, aov: 3185, topArchetype: 'Bheema', conversionRate: 3.5 },
  { dayLabel: '11 Nov', fullDate: '11 Nov 2026 (Wed)', revenue: 126700, orders: 39, aov: 3248, topArchetype: 'Arjun', conversionRate: 3.7 },
  { dayLabel: '12 Nov', fullDate: '12 Nov 2026 (Thu)', revenue: 141200, orders: 43, aov: 3283, topArchetype: 'Bheema', conversionRate: 4.0 },
  { dayLabel: '13 Nov', fullDate: '13 Nov 2026 (Fri)', revenue: 174500, orders: 52, aov: 3355, topArchetype: 'Arjun', conversionRate: 4.5 },
  { dayLabel: '14 Nov', fullDate: '14 Nov 2026 (Today)', revenue: 198900, orders: 58, aov: 3429, topArchetype: 'Bheema', conversionRate: 4.8 },
];

export interface CategorySalesDataPoint {
  category: string;
  revenue: number;
  percentage: number;
  units: number;
  color: string;
}

export const MOCK_CATEGORY_SALES: CategorySalesDataPoint[] = [
  { category: 'Dynamic Warm-Ups & Velocity', revenue: 648200, percentage: 35.2, units: 204, color: '#5B8DB8' },
  { category: 'Heavy Compound & Power', revenue: 512400, percentage: 27.8, units: 158, color: '#A0704A' },
  { category: 'Lactate Threshold & Grit', revenue: 324100, percentage: 17.6, units: 102, color: '#D98324' },
  { category: 'Fascial Decompression', revenue: 208300, percentage: 11.3, units: 66, color: '#EFE6D2' },
  { category: 'Grip & Tendon Micro-Mobility', revenue: 149800, percentage: 8.1, units: 50, color: '#C25A6E' },
];

export const MOCK_METRICS: MetricDefinition[] = [
  {
    id: 'net-revenue',
    name: 'Net Merchandise Revenue',
    value: '₹18,42,800',
    change: '+18.4% vs prev period',
    trend: 'up',
    formula: 'Captured Merchandise Value after discounts - merchandise refunds (excludes tax & shipping)',
    description: 'Measures realized product value recognized on capture and refund event dates in Asia/Kolkata timezone.',
    category: 'commercial',
  },
  {
    id: 'session-conversion',
    name: 'Session Conversion Rate',
    value: '3.42%',
    change: '+0.6% vs benchmark',
    trend: 'up',
    formula: 'Eligible storefront sessions with ≥ 1 captured order ÷ eligible sessions',
    description: 'Attributed on a single-session basis. Unattributed direct sessions tracked independently.',
    category: 'commercial',
  },
  {
    id: 'contribution-margin',
    name: 'Contribution Margin',
    value: '42.8%',
    change: '+2.1% efficiency',
    trend: 'up',
    formula: 'Net Merchandise Revenue + Net Shipping - Product Cost - Fulfillment/Courier - Payment Fees',
    description: 'Post-variable contribution per kit line based on landed component BOM and 3PL packing allocation.',
    category: 'commercial',
  },
  {
    id: 'character-engagement',
    name: 'Character Engagement Rate',
    value: '52.7%',
    change: '+4.5% lift',
    trend: 'up',
    formula: 'Sessions reaching a kit detail page from a character collection ÷ sessions viewing that character',
    description: 'Validates UX02 character-first affinity and routine cue motivation.',
    category: 'engagement',
  },
  {
    id: 'on-time-dispatch',
    name: 'On-Time Dispatch %',
    value: '97.2%',
    change: '-0.8% SLA lag',
    trend: 'down',
    formula: 'Orders dispatched by promised dispatch time ÷ total orders due in cohort',
    description: 'National Express Tier 1 promises 24hr dispatch from Bengaluru hub.',
    category: 'operations',
  },
  {
    id: 'return-rate',
    name: 'Cohort Return Rate',
    value: '1.6%',
    change: '-0.3% improvement',
    trend: 'up',
    formula: 'Returned units received ÷ delivered units for the same delivery cohort',
    description: 'Provisional until 30-day trial window closes. Restocked only after recorded manual inspection.',
    category: 'operations',
  },
];

export const MOCK_CHARACTER_PERFORMANCE: CharacterPerformance[] = [
  {
    slug: 'arjun',
    name: 'ARJUN',
    color: '#6AAEE0',
    sessions: 4210,
    orders: 158,
    revenue: 457842,
    conversionRate: 3.75,
    engagementRate: 58.2,
    contributionMargin: 44.5,
  },
  {
    slug: 'bheema',
    name: 'BHEEMA',
    color: '#C58F63',
    sessions: 3890,
    orders: 132,
    revenue: 488268,
    conversionRate: 3.39,
    engagementRate: 51.4,
    contributionMargin: 46.2,
  },
  {
    slug: 'karna',
    name: 'KARNA',
    color: '#FFB85C',
    sessions: 3120,
    orders: 114,
    revenue: 364686,
    conversionRate: 3.65,
    engagementRate: 53.8,
    contributionMargin: 41.0,
  },
  {
    slug: 'draupadi',
    name: 'DRAUPADI',
    color: '#C25A6E',
    sessions: 2450,
    orders: 86,
    revenue: 223514,
    conversionRate: 3.51,
    engagementRate: 49.6,
    contributionMargin: 43.1,
  },
  {
    slug: 'sita',
    name: 'SITA',
    color: '#EFE6D2',
    sessions: 2190,
    orders: 68,
    revenue: 258332,
    conversionRate: 3.10,
    engagementRate: 46.2,
    contributionMargin: 39.8,
  },
  {
    slug: 'savitri',
    name: 'SAVITRI',
    color: '#B4B952',
    sessions: 1680,
    orders: 22,
    revenue: 50578,
    conversionRate: 1.31,
    engagementRate: 38.5,
    contributionMargin: 36.5,
  },
];

export const MOCK_OPERATIONS_ORDERS: OperationsOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'CF-849201',
    customerName: 'Aditya Sen',
    customerEmail: 'aditya.sen@gmail.com',
    city: 'Bengaluru',
    pincode: '560001',
    date: '14 Nov 2026, 14:15',
    promisedDispatchDate: '15 Nov 2026, 18:00',
    isOverdue: false,
    status: 'paid',
    assignedOwner: 'Ramesh (Lead Packer)',
    kitName: 'Morning Velocity Prep Kit',
    kitSlug: 'arjun-morning-prep-kit',
    characterSlug: 'arjun',
    totalAmount: 2899,
    paymentMethod: 'UPI Intent',
    pickList: [
      { item: 'Precision Bearing Jump Rope (3.2mm)', qty: 1, spec: 'Aircraft cable, knurled aluminum handle', sku: 'SKU-ROP-01', verified: true },
      { item: 'High-Density Lacrosse Mobility Ball', qty: 1, spec: '63mm solid natural rubber', sku: 'SKU-BAL-01', verified: true },
      { item: 'Multi-Loop Kinetic Dynamic Strap', qty: 1, spec: '10-loop woven nylon webbing', sku: 'SKU-STP-01', verified: false },
    ],
  },
  {
    id: 'ord-102',
    orderNumber: 'CF-849195',
    customerName: 'Pooja Hegde',
    customerEmail: 'pooja.h@yahoo.com',
    city: 'Secunderabad',
    pincode: '500010',
    date: '14 Nov 2026, 11:30',
    promisedDispatchDate: '15 Nov 2026, 14:00',
    isOverdue: false,
    status: 'picking',
    assignedOwner: 'Ananya (Fulfillment)',
    kitName: 'Heavy Compound Loading Kit',
    kitSlug: 'bheema-heavy-training-kit',
    characterSlug: 'bheema',
    totalAmount: 4499,
    paymentMethod: 'Credit Card',
    pickList: [
      { item: '10mm Single-Prong Powerlifting Belt (IPF Spec)', qty: 1, spec: 'Top-grain bridle leather, seamless roller buckle', sku: 'SKU-BLT-01', verified: true },
      { item: 'Heavy Cast Wrist Wraps (24")', qty: 2, spec: 'Stiff elastic blend with thumb loop', sku: 'SKU-WRP-01', verified: true },
    ],
  },
  {
    id: 'ord-103',
    orderNumber: 'CF-848980',
    customerName: 'Karan Mehra',
    customerEmail: 'karan.m@gmail.com',
    city: 'Mumbai',
    pincode: '400001',
    date: '13 Nov 2026, 09:20',
    promisedDispatchDate: '14 Nov 2026, 12:00',
    isOverdue: true,
    status: 'packed',
    assignedOwner: 'Ramesh (Lead Packer)',
    kitName: 'Daily Resolve Conditioning Kit',
    kitSlug: 'karna-daily-resolve-kit',
    characterSlug: 'karna',
    totalAmount: 3199,
    paymentMethod: 'UPI Intent',
    pickList: [
      { item: 'Friction-Free Speed Rope', qty: 1, spec: 'High-cadence bearing assembly', sku: 'SKU-ROP-02', verified: true },
      { item: 'Magnesium Chalk Block', qty: 2, spec: 'Pure cosmetic grade chalk', sku: 'SKU-CHK-01', verified: true },
    ],
    trackingNumber: 'DEL-EXP-940291',
  },
  {
    id: 'ord-104',
    orderNumber: 'CF-848722',
    customerName: 'Vikram Joshi',
    customerEmail: 'v.joshi@outlook.com',
    city: 'Gurugram',
    pincode: '122001',
    date: '12 Nov 2026, 16:45',
    promisedDispatchDate: '13 Nov 2026, 18:00',
    isOverdue: false,
    status: 'dispatched',
    assignedOwner: 'BlueDart Air',
    kitName: 'Steady Decompression Ritual Kit',
    kitSlug: 'sita-steady-decompression-kit',
    characterSlug: 'sita',
    totalAmount: 3799,
    paymentMethod: 'NetBanking',
    pickList: [
      { item: 'Solid Portuguese Cork Blocks', qty: 2, spec: 'Beveled edges, raw bark', sku: 'SKU-CRK-01', verified: true },
      { item: '8-Foot Unbleached Cotton Strap', qty: 1, spec: 'Extra thick 38mm cotton weave', sku: 'SKU-STP-02', verified: true },
    ],
    trackingNumber: 'BD-AIR-882019',
  },
];

export const MOCK_STOCK_COMPONENTS: StockComponent[] = [
  {
    sku: 'SKU-BLT-01',
    name: '10mm Single-Prong Belt (Size M/L)',
    category: 'Leather Goods',
    onHand: 18,
    reserved: 4,
    available: 14,
    unitCost: 1850,
    associatedKits: ['bheema-heavy-training-kit'],
    reorderThreshold: 10,
    status: 'healthy',
  },
  {
    sku: 'SKU-ROP-01',
    name: 'Precision Bearing Jump Rope 3.2mm',
    category: 'Metals & Cables',
    onHand: 35,
    reserved: 6,
    available: 29,
    unitCost: 650,
    associatedKits: ['arjun-morning-prep-kit'],
    reorderThreshold: 15,
    status: 'healthy',
  },
  {
    sku: 'SKU-BAL-01',
    name: 'Lacrosse Rubber Mobility Sphere 63mm',
    category: 'Elastomers',
    onHand: 8,
    reserved: 4,
    available: 4,
    unitCost: 220,
    associatedKits: ['arjun-morning-prep-kit', 'arjun-focus-hydration-kit'],
    reorderThreshold: 12,
    status: 'low',
  },
  {
    sku: 'SKU-CRK-01',
    name: 'Portuguese Bark Cork Block 9"x6"x4"',
    category: 'Natural Materials',
    onHand: 42,
    reserved: 2,
    available: 40,
    unitCost: 480,
    associatedKits: ['sita-steady-decompression-kit'],
    reorderThreshold: 20,
    status: 'healthy',
  },
  {
    sku: 'SKU-GRP-01',
    name: 'Anodized 150lb Hand Gripper',
    category: 'Spring Steel',
    onHand: 14,
    reserved: 3,
    available: 11,
    unitCost: 720,
    associatedKits: ['draupadi-control-grip-kit'],
    reorderThreshold: 10,
    status: 'healthy',
  },
  {
    sku: 'SKU-CLK-01',
    name: 'Solid Brass Ratchet Habit Clicker',
    category: 'Machined Brass',
    onHand: 2,
    reserved: 2,
    available: 0,
    unitCost: 890,
    associatedKits: ['savitri-habit-rhythm-kit'],
    reorderThreshold: 15,
    status: 'critical',
  },
];

export const MOCK_EXCEPTIONS: ExceptionCase[] = [
  {
    id: 'EX-901',
    orderNumber: 'CF-848110',
    type: 'stock_shortage',
    owner: 'Ananya (Fulfillment)',
    amount: 2299,
    status: 'investigating',
    notes: 'Brass clicker stock allocation discrepancy. 1 unit required from supplier shipment.',
    createdAt: '14 Nov 2026, 10:20',
  },
  {
    id: 'EX-902',
    orderNumber: 'CF-847920',
    type: 'payment_mismatch',
    owner: 'Priya (Finance)',
    amount: 3199,
    status: 'open',
    notes: 'Late Razorpay webhook capture arrived 45m post session timeout. Reconciling with bank ledger.',
    createdAt: '13 Nov 2026, 21:05',
  },
  {
    id: 'EX-903',
    orderNumber: 'CF-846880',
    type: 'return_pending',
    owner: 'Ramesh (Warehouse)',
    amount: 4499,
    status: 'open',
    notes: 'Returned belt received in Bengaluru warehouse. Awaiting leather scuff inspection before restock.',
    createdAt: '13 Nov 2026, 14:00',
  },
];

export const MOCK_ANALYTICS_EVENTS: AnalyticsEvent[] = [
  { id: 'ev-1', event: 'order_captured', characterSlug: 'arjun', kitSlug: 'arjun-morning-prep-kit', timestamp: '2 mins ago', sessionId: 'sess-849102', campaign: 'pre_dawn_warrior' },
  { id: 'ev-2', event: 'add_to_cart', characterSlug: 'bheema', kitSlug: 'bheema-heavy-training-kit', timestamp: '5 mins ago', sessionId: 'sess-849105', campaign: 'heavy_compound_ig' },
  { id: 'ev-3', event: 'compare_used', timestamp: '8 mins ago', sessionId: 'sess-849098' },
  { id: 'ev-4', event: 'kit_view', characterSlug: 'karna', kitSlug: 'karna-daily-resolve-kit', timestamp: '12 mins ago', sessionId: 'sess-849092' },
  { id: 'ev-5', event: 'character_view', characterSlug: 'sita', timestamp: '15 mins ago', sessionId: 'sess-849089', campaign: 'somatic_release' },
  { id: 'ev-6', event: 'checkout_started', characterSlug: 'draupadi', kitSlug: 'draupadi-control-grip-kit', timestamp: '19 mins ago', sessionId: 'sess-849077' },
];
