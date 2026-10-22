/**
 * partners.js — partner and staff data for the /partners-and-team page.
 *
 * TO ADD A PHOTO:
 * 1. Drop the image into client/src/assets/team/  (jpg or webp, ideally square)
 * 2. Import it at the top of this file
 * 3. Add  image: theImportedVariable  to the relevant person's object
 */

// ── Team photo imports ────────────────────────────────────────────────────────
import lukmanZaratRanti  from '../assets/team/lukman-zarat-ranti.jpg'
import ademolaRasheed    from '../assets/team/ademola-rasheed-olusola.jpeg'
import ajuloBOlajide     from '../assets/team/ajulo-b-olajide.jpeg'
// import odebunmiOluwatoyin from '../assets/team/odebunmi-r-oluwatoyin.jpg'

// ── Partners ──────────────────────────────────────────────────────────────────
export const partners = [
  {
    id: 1,
    name: 'Ademola Rasheed Olusola',
    role: 'Executive Director (ED) and Associate Partner',
    image: ademolaRasheed,
    highlight: false,
  },
  {
    id: 2,
    name: 'Lukman Zarat Ranti',
    role: 'Director / Head Audit & Assurance',
    image: lukmanZaratRanti,
    highlight: false,
  },
  {
    id: 3,
    name: 'Ajulo B. Olajide',
    role: 'Director / Head (I.T, Corporate Affairs & Compliance)',
    image: ajuloBOlajide,
    highlight: true,
  },
  {
    id: 4,
    name: 'Odebunmi R. Oluwatoyin',
    role: 'Partner',
    // image: odebunmiOluwatoyin,
    highlight: false,
  },
]

// ── Management Staff ──────────────────────────────────────────────────────────
export const managementStaff = [
  { id: 1, name: 'Oliyide Babajide Ebenezer',       qualifications: 'HND., B.Sc., ACA (Partly Qualified)' },
  { id: 2, name: 'Oladepo Oyebola Beatrice',         qualifications: 'B.Tech., ACA (Partly Qualified)' },
  { id: 3, name: 'Adeoye Peace Adeshola',            qualifications: 'B.Sc., ACA' },
  { id: 4, name: 'Olatunji Samuel',                  qualifications: 'B.Sc., ACA' },
  { id: 5, name: 'Adetoyinbo Adeola Aanuoluwapo',   qualifications: 'B.Sc.' },
  { id: 6, name: 'Olagoke Temitope',                 qualifications: 'HND' },
]

// ── Trainees ──────────────────────────────────────────────────────────────────
export const trainees = [
  { id: 1, name: 'Adebayo Bose Elizabeth',    qualifications: 'B.Sc., ACA' },
  { id: 2, name: 'Lawal Ololade Fatihat',     qualifications: 'B.Sc., AAT' },
  { id: 3, name: 'Adedayo Glory',             qualifications: null },
]
