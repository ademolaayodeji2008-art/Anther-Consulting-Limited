/**
 * partners.js — partner and staff data for the /partners-and-team page.
 *
 * TO ADD A PHOTO:
 * 1. Drop the image into client/src/assets/team/  (jpg or webp, ideally square)
 * 2. Import it at the top of this file
 * 3. Add  image: theImportedVariable  to the relevant person's object
 */

// ── Team photo imports (add more as photos are provided) ─────────────────────
import lukmanZaratRanti       from '../assets/team/lukman-zarat-ranti.jpg'
import ademolaRasheed         from '../assets/team/ademola-rasheed-olusola.jpeg'
import ajuloBOlajide          from '../assets/team/ajulo-b-olajide.jpeg'
// import ajuloBOlajide       from '../assets/team/ajulo-b-olajide.jpg'
// import odebunmiOluwatoyin  from '../assets/team/odebunmi-r-oluwatoyin.jpg'
// import adenowoFolakemi     from '../assets/team/adenowo-folakemi.jpg'
// import oyaletorEsther      from '../assets/team/oyaletor-esther.jpg'
// import ogunbiyiGlory       from '../assets/team/ogunbiyi-glory.jpg'
// import kudoroOluwatobi     from '../assets/team/kudoro-oluwatobi.jpg'
// import ogungbilejeJoshua   from '../assets/team/ogungbileje-joshua.jpg'
// import olatunjiSamuel      from '../assets/team/olatunji-samuel-o.jpg'
// import ademolaAbraham      from '../assets/team/ademola-abraham.jpg'
// import olagokeBisola       from '../assets/team/olagoke-temitope-bisola.jpg'
// import abdulganiyuTaye     from '../assets/team/abdulganiyu-taye-olarenwaju.jpg'

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
  { id: 1, name: 'Adenowo Folakemi',   qualifications: 'Bsc., AAT., ACA'           /* image: adenowoFolakemi   */ },
  { id: 2, name: 'Oyaletor Esther',    qualifications: 'Bsc., Partly Qualified'    /* image: oyaletorEsther    */ },
  { id: 3, name: 'Ogunbiyi Glory',     qualifications: 'HND., Bsc., Partly Qualified' /* image: ogunbiyiGlory  */ },
  { id: 4, name: 'Kudoro Oluwatobi',   qualifications: 'Bsc., Partly Qualified'    /* image: kudoroOluwatobi  */ },
  { id: 5, name: 'Ogungbileje Joshua', qualifications: 'Bsc., Partly Qualified'    /* image: ogungbilejeJoshua*/ },
]

// ── Trainees ──────────────────────────────────────────────────────────────────
export const trainees = [
  { id: 1, name: 'Olatunji Samuel O.',         qualifications: 'OND., AAT., Bsc., ACA' /* image: olatunjiSamuel    */ },
  { id: 2, name: 'Ademola Abraham',             qualifications: 'OND., HND'             /* image: ademolaAbraham    */ },
  { id: 3, name: 'Olagoke Temitope Bisola',     qualifications: 'HND'                   /* image: olagokeBisola     */ },
  { id: 4, name: 'Abdulganiyu Taye Olarenwaju', qualifications: null                    /* image: abdulganiyuTaye   */ },
]
