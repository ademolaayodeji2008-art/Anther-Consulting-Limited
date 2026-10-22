// src/lib/taxCalc.js
// Pure tax calculation functions and formatter — no React dependency.

// ─── PIT Band Schedule (PITA Schedule 6) ─────────────────────────────────────
const BANDS = [
  { limit: 300_000,   rate: 0.07 },
  { limit: 300_000,   rate: 0.11 },
  { limit: 500_000,   rate: 0.15 },
  { limit: 500_000,   rate: 0.19 },
  { limit: 1_600_000, rate: 0.21 },
  { limit: Infinity,  rate: 0.24 },
]

// ─── Consolidated Relief Allowance ───────────────────────────────────────────
export function calcCRA(gross) {
  return Math.max(200_000, gross * 0.01) + gross * 0.20
}

// ─── Graduated PIT Band Tax ───────────────────────────────────────────────────
export function calcPIT(taxableIncome) {
  let remaining = Math.max(0, taxableIncome)
  let tax = 0
  for (const { limit, rate } of BANDS) {
    const slice = Math.min(remaining, limit)
    tax += slice * rate
    remaining -= slice
    if (remaining <= 0) break
  }
  return tax
}

// ─── PIT Results ──────────────────────────────────────────────────────────────
export function calcPITResults(grossIncome) {
  const cra = calcCRA(grossIncome)
  const taxableIncome = Math.max(0, grossIncome - cra)
  const annualTax = calcPIT(taxableIncome)
  return {
    grossIncome,
    cra,
    taxableIncome,
    annualTax,
    monthlyTax: annualTax / 12,
    effectiveRate: grossIncome > 0 ? (annualTax / grossIncome) * 100 : 0,
  }
}

// ─── PAYE Results ─────────────────────────────────────────────────────────────
export function calcPAYEResults(basic, housing, transport, other) {
  const monthlyGross = basic + housing + transport + other
  const annualGross  = monthlyGross * 12
  const cra          = calcCRA(annualGross)
  const taxableIncome = Math.max(0, annualGross - cra)
  const annualPAYE   = calcPIT(taxableIncome)
  const pensionBase  = basic + housing + transport
  return {
    monthlyGross,
    annualGross,
    annualPAYE,
    monthlyPAYE:     annualPAYE / 12,
    netMonthlyPay:   monthlyGross - annualPAYE / 12,
    effectiveRate:   annualGross > 0 ? (annualPAYE / annualGross) * 100 : 0,
    employeePension: pensionBase * 0.08,
    employerPension: pensionBase * 0.10,
  }
}

// ─── VAT Results ─────────────────────────────────────────────────────────────
export function calcVATResults(amount, rate, isPostVAT) {
  const r = rate / 100
  if (isPostVAT) {
    const preVAT = amount / (1 + r)
    return { preVAT, vatAmount: amount - preVAT, postVAT: amount }
  }
  const vatAmount = amount * r
  return { preVAT: amount, vatAmount, postVAT: amount + vatAmount }
}

// ─── Number Formatter ─────────────────────────────────────────────────────────
export function fmt(n) {
  if (!isFinite(n)) return '₦0.00'
  return '₦' + n.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
