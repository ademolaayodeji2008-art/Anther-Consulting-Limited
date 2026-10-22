import { useState, useMemo } from 'react'
import SEO from '../components/SEO.jsx'
import {
  calcPITResults,
  calcPAYEResults,
  calcVATResults,
  fmt,
} from '../lib/taxCalc.js'

// ─── Nigerian States ──────────────────────────────────────────────────────────
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti',
  'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun',
  'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara', 'FCT (Abuja)',
]

// ─── Disclaimer ───────────────────────────────────────────────────────────────
function Disclaimer() {
  return (
    <p className="font-body text-xs text-body mt-6 text-center italic">
      This calculator is for estimation purposes only. Consult a qualified tax
      professional for accurate advice.
    </p>
  )
}

// ─── Results Row ──────────────────────────────────────────────────────────────
function ResultRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/20">
      <span className="font-body text-sm text-white/80">{label}</span>
      <span
        className={`font-body text-sm font-semibold text-white${
          highlight ? ' text-lg font-bold' : ''
        }`}
      >
        {value}
      </span>
    </div>
  )
}

// ─── PIT Calculator ───────────────────────────────────────────────────────────
function PITCalculator() {
  const [grossIncome, setGrossIncome] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const results = useMemo(() => {
    const val = parseFloat(grossIncome)
    if (!(val > 0)) return null
    return calcPITResults(val)
  }, [grossIncome])

  return (
    <div className="lg:grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div>
        <div className="mb-4">
          <label htmlFor="pit-gross" className="block font-body text-sm font-semibold text-navy mb-1">
            Annual Gross Income (₦)
          </label>
          <input
            id="pit-gross"
            type="number"
            min="0"
            step="any"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            placeholder="e.g. 5000000"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 font-body text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pit-state" className="block font-body text-sm font-semibold text-navy mb-1">
            State of Residence <span aria-hidden="true">*</span>
          </label>
          <select
            id="pit-state"
            required
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 font-body text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>Select state…</option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <p className="font-body text-xs text-body mt-1">
            State selection is for reference only — all states follow the same
            federal PIT schedule.
          </p>
        </div>
      </div>

      {/* Results */}
      <div>
        {results && (
          <div
            role="region"
            aria-live="polite"
            aria-label="Calculation results"
            className="bg-primary text-white rounded-xl p-6"
          >
            <ResultRow label="Gross Income"    value={fmt(results.grossIncome)} />
            <ResultRow label="CRA"             value={fmt(results.cra)} />
            <ResultRow label="Taxable Income"  value={fmt(results.taxableIncome)} />
            <ResultRow label="Annual Tax"      value={fmt(results.annualTax)} />
            <ResultRow label="Monthly Tax"     value={fmt(results.monthlyTax)} />
            <ResultRow
              label="Effective Tax Rate"
              value={`${results.effectiveRate.toFixed(2)}%`}
              highlight
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── PAYE Calculator ──────────────────────────────────────────────────────────
function PAYECalculator() {
  const [basic,     setBasic]     = useState('')
  const [housing,   setHousing]   = useState('')
  const [transport, setTransport] = useState('')
  const [other,     setOther]     = useState('')

  const results = useMemo(() => {
    const b = parseFloat(basic)
    if (!(b > 0)) return null
    return calcPAYEResults(
      b,
      parseFloat(housing)   || 0,
      parseFloat(transport) || 0,
      parseFloat(other)     || 0,
    )
  }, [basic, housing, transport, other])

  const fields = [
    { id: 'paye-basic',     label: 'Basic Salary (₦)', required: true,  value: basic,     setter: setBasic },
    { id: 'paye-housing',   label: 'Housing Allowance (₦)',             value: housing,   setter: setHousing },
    { id: 'paye-transport', label: 'Transport Allowance (₦)',           value: transport, setter: setTransport },
    { id: 'paye-other',     label: 'Other Allowances (₦)',              value: other,     setter: setOther },
  ]

  return (
    <div className="lg:grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div>
        {fields.map(({ id, label, required, value, setter }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block font-body text-sm font-semibold text-navy mb-1">
              {label}{required && <span aria-hidden="true"> *</span>}
            </label>
            <input
              id={id}
              type="number"
              min="0"
              step="any"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 font-body text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div>
        {results && (
          <div
            role="region"
            aria-live="polite"
            aria-label="Calculation results"
            className="bg-primary text-white rounded-xl p-6"
          >
            <ResultRow label="Monthly Gross"       value={fmt(results.monthlyGross)} />
            <ResultRow label="Annual Gross"        value={fmt(results.annualGross)} />
            <ResultRow label="Annual PAYE"         value={fmt(results.annualPAYE)} />
            <ResultRow label="Monthly PAYE"        value={fmt(results.monthlyPAYE)} />
            <ResultRow label="Net Monthly Pay"     value={fmt(results.netMonthlyPay)} />
            <ResultRow label="Employee Pension (8%)" value={fmt(results.employeePension)} />
            <ResultRow label="Employer Pension (10%)" value={fmt(results.employerPension)} />
            <ResultRow
              label="Effective Rate"
              value={`${results.effectiveRate.toFixed(2)}%`}
              highlight
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── VAT Calculator ───────────────────────────────────────────────────────────
function VATCalculator() {
  const [amount,    setAmount]    = useState('')
  const [rate,      setRate]      = useState('7.5')
  const [isPostVAT, setIsPostVAT] = useState(false)

  const results = useMemo(() => {
    const a = parseFloat(amount)
    const r = parseFloat(rate)
    if (!(a > 0) || !(r > 0)) return null
    return calcVATResults(a, r, isPostVAT)
  }, [amount, rate, isPostVAT])

  return (
    <div className="lg:grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div>
        {/* Pre / Post toggle */}
        <div className="mb-4">
          <span className="block font-body text-sm font-semibold text-navy mb-2">
            Amount type
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={!isPostVAT}
              onClick={() => setIsPostVAT(false)}
              className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-colors duration-150 ${
                !isPostVAT
                  ? 'bg-primary text-white'
                  : 'border border-primary text-primary'
              }`}
            >
              Pre-VAT
            </button>
            <button
              type="button"
              aria-pressed={isPostVAT}
              onClick={() => setIsPostVAT(true)}
              className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-colors duration-150 ${
                isPostVAT
                  ? 'bg-primary text-white'
                  : 'border border-primary text-primary'
              }`}
            >
              Post-VAT
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="vat-amount" className="block font-body text-sm font-semibold text-navy mb-1">
            Amount (₦) <span aria-hidden="true">*</span>
          </label>
          <input
            id="vat-amount"
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 10000"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 font-body text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vat-rate" className="block font-body text-sm font-semibold text-navy mb-1">
            VAT Rate (%)
          </label>
          <input
            id="vat-rate"
            type="number"
            min="0"
            step="any"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="7.5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 font-body text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Results */}
      <div>
        {results && (
          <div
            role="region"
            aria-live="polite"
            aria-label="Calculation results"
            className="bg-primary text-white rounded-xl p-6"
          >
            <ResultRow label="Pre-VAT Amount"  value={fmt(results.preVAT)} />
            <ResultRow label="VAT Amount"      value={fmt(results.vatAmount)} />
            <ResultRow label="Post-VAT Amount" value={fmt(results.postVAT)} highlight />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'pit',  label: 'PIT' },
  { id: 'paye', label: 'PAYE' },
  { id: 'vat',  label: 'VAT' },
]

export default function TaxCalculators() {
  const [activeTab, setActiveTab] = useState('pit')

  return (
    <>
      <SEO
        title="Free Tax Calculators"
        description="Use our free Nigerian tax calculators — PIT, PAYE, and VAT — to estimate your tax obligations."
        path="/tax-calculators"
      />

      {/* Hero banner */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Free Tax Calculators
          </h1>
          <p className="font-body text-sm text-white/80">
            Home &rsaquo; Tax Calculators
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Tax calculator type"
          className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`${id}-panel`}
              id={`${id}-tab`}
              onClick={() => setActiveTab(id)}
              className={`font-body text-sm font-semibold px-5 py-3 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                activeTab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-body hover:text-navy'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          tabIndex={0}
        >
          {activeTab === 'pit'  && <PITCalculator />}
          {activeTab === 'paye' && <PAYECalculator />}
          {activeTab === 'vat'  && <VATCalculator />}
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
