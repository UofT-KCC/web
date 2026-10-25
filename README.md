<div align="center">

<a href="https://www.utkcc.com">
  <img src=".github/assets/readme-banner.svg" alt="UTKCC — University of Toronto Korean Commerce Community" width="100%">
</a>

# UTKCC Website

**The official website of the University of Toronto Korean Commerce Community**

[**🌐 utkcc.com**](https://www.utkcc.com)

![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

</div>

---

## Contents

- [About](#about)
- [Team](#team)
- [Quick Start](#quick-start)
- [Maintainer Guide](#maintainer-guide)
  - [Yearly checklist](#yearly-checklist)
  - [Executives](#executives)
  - [Sponsors](#sponsors)
  - [Events](#events)
  - [Contact emails & form links](#contact-emails--form-links)
  - [Other data files](#other-data-files)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## About

This repository holds the source code for the UTKCC website. The site was first built by the Programming Department of the 17th UTKCC and is now maintained by the **20기 Information Technology Department**.

The site has **no database**. Everything you see comes from two places:

| What | Where |
|---|---|
| Text and data | `utkcc-fe/data/*.ts` |
| Images, PDFs, videos | `utkcc-fe/public/assets/` |

> [!TIP]
> Most updates only touch files marked **`수정 O`** at the top. Those are written so non-coders can edit them safely.

---

## Team

### Built by (17기)

| | |
|---|---|
| 🎨 Designer | [Hyunjun You](https://www.instagram.com/hyunjun2003) |
| 🧑‍💻 Programming Director | [@ryubsmile](https://github.com/ryubsmile) |
| 🧩 Programming Committee | [@caelankim](https://github.com/caelankim) |
| 💻 Programming Intern | [@mijnap1](https://github.com/mijnap1) |

### Maintained by (20기 IT)

| | |
|---|---|
| 🧑‍💻 Director | 류지훈 (Jamie Ryu) · [@mijnap1](https://github.com/mijnap1) |
| 🧩 Manager | 신지호 · [@sjiho1005](https://github.com/sjiho1005) |
| 💻 Intern | 김이안 |

---

## Quick Start

```bash
git clone https://github.com/UofT-KCC/web.git
cd web/utkcc-fe
npm install
```

Create `utkcc-fe/.env.local`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Then start the dev server and open <http://localhost:3000>:

```bash
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build for production (run this before opening a PR) |
| `npm run lint` | Check the code for problems |

**Workflow:** make a new branch → commit → open a Pull Request → merge into `main`.

---

## Maintainer Guide

### Yearly checklist

| When | What to update | File |
|---|---|---|
| **April & October** | Executives and headshots | `data/executives-data.ts` |
| **September** | Sponsors | `data/sponsors-data.ts` |
| **Each new term** | President / VP emails, recruitment and form links | `data/change-annually-data.ts` |
| **Each semester** | Calendar, study package, invitation archive | see [Other data files](#other-data-files) |

> [!NOTE]
> The current 기수 (e.g. "20기") is **calculated automatically** from the date in `change-annually-data.ts`. You don't need to change it.

---

### Executives

> [!IMPORTANT]
> Update this **every April and October**.

**File:** `utkcc-fe/data/executives-data.ts`

#### 1. Departments (`deptList`)

These control the tabs on the Executives page. Every `dept` value below must match one of them **exactly**.

```typescript
export const deptList: string[] = [
  'presidents',
  'academics',
  'corporate relations',
  'finance',
  'information technology',
  'marketing - poster',
  'marketing - video',
  'media',
  'social',
];
```

Each department's description (shown on the left of the page) lives in `deptDescriptions` in the same file.

#### 2. Members (`execData`)

Each member is one block like this:

```typescript
{
  dept: 'information technology',
  position: 'director',
  name: '류지훈',
  imageSrc: '/assets/images/exec-headshots/류지훈.jpg',
  program: 'Computer Science & Mathematics',
  intro: [],
},
```

| Field | What to put |
|---|---|
| `dept` | One of the values in `deptList` |
| `position` | `'president'`, `'vice president'`, `'director'`, `'manager'` or `'intern'` |
| `name` | Korean name, e.g. `'유현준'` |
| `imageSrc` | Path to the headshot. Use `''` if there's no photo yet; a grey placeholder is shown instead |
| `program` | Program of study, e.g. `'Rotman Commerce - Finance & Economics'` |
| `intro` | Leave as `[]` (only the president / VP may have intro paragraphs) |

- **Order:** members show up in the same order as in the file, so list them as president → director → manager → intern within each department.
- **Adding someone:** copy a block, paste it under their department, and edit the values.
- **Removing someone:** delete their whole `{ ... },` block.

#### 3. Headshots

Put photos in `utkcc-fe/public/assets/images/exec-headshots/`, named after the person (e.g. `유현준.jpg`).

| Rule | |
|---|---|
| Shape | Square, **1:1** |
| Size | About **700–900 px**, ideally **under 100 KB** |
| Format | `.webp` preferred, `.jpg` is fine |
| Framing | Face centered; photo fills the whole square, with **no white or blank edges** |

> [!TIP]
> If you replace a photo but keep the same filename, your local dev server may still show the old one. Delete `utkcc-fe/.next/cache/images` and refresh. The live site updates on the next deploy.

#### Current team (20기, 2026–2027)

**President** 유현준 · **Vice President** 이가은

| Department | Directors | Managers | Interns |
|---|---|---|---|
| Academics | 구본석, 주혜정 | 김지민, 홍예윤, 이대건, 김강인 | 정준혁, 임수현, 권라율, 허동진 |
| Corporate Relations | 임준서, 진하윤 | 신하림, 김유민, 권유현, 조재영 | 유유진, 권진현, 김민지 |
| Finance | 전재민 | 양지민, 문서윤 | — |
| Information Technology | 류지훈 | 신지호 | 김이안 |
| Marketing (Poster) | 박민경 | 강다연, 최호승 | 박주원, 임기현 |
| Marketing (Video) | 신하서 | 김예솔, 정윤진, 주재은 | — |
| Media | 이연지 | 배진주, 조희원 | 김규아 |
| Social | 김서희 | 이찬영, 김시현, 백선주 | 황다비, 김동훈, 이지후, 정인채 |

---

### Sponsors

> [!IMPORTANT]
> Update this **every September**.

**File:** `utkcc-fe/data/sponsors-data.ts`

```typescript
{
  name: 'Kanari',
  exp: 'Contemporary Asian Bar',
  category: 'bar',
  imageSrc: '/assets/images/sponsors/kanari.jpg',
  websiteUrl: 'https://www.instagram.com/kanari.toronto/',
  locationUrl: 'https://maps.app.goo.gl/JW9fVsgP96V41shR8',
  discount: '10%',
  benefitNote: '현금 또는 카드 결제 시',
  address: '491 Church St.',
},
```

| Field | What to put |
|---|---|
| `name` | Sponsor name (shown on the ticket and the menu) |
| `exp` | One-line description |
| `category` | `'dining'`, `'cafe'` or `'bar'` |
| `imageSrc` | Image in `public/assets/images/sponsors/` |
| `websiteUrl` | Website or Instagram link |
| `locationUrl` | Google Maps link |
| `discount` | *(optional)* Big benefit on the back of the ticket, e.g. `'10%'` |
| `benefitNote` | *(optional)* Benefit conditions |
| `address` | *(optional)* Store address |

- **Adding:** put the image in `public/assets/images/sponsors/`, then add a block to `sponsorData`.
- **Removing:** delete the block **and** its image file.

---

### Events

**File:** `utkcc-fe/data/events-data.ts`

Each event category (academic, professional, social) on the Events page is one block:

```typescript
{
  info: {
    type: 'academic',
    slogan: ['학생의 본분을', '잊지 않기 위하여'],
    explanation: '대학 공부가 처음이라 버겁게 느껴진다면 ...',
  },
  bgImage: '/assets/images/events/academic-events.jpeg',
},
```

- **Text:** edit `slogan` and `explanation` directly.
- **Image:** add the new image to `public/assets/images/events/` and update `bgImage`.

---

### Contact emails & form links

**File:** `utkcc-fe/data/change-annually-data.ts`

| Variable | Used for |
|---|---|
| `kccEmail` | Main UTKCC email |
| `presEmail` / `vicePresEmail` | President / VP emails in the footer |
| `erDirectorEmail` | Sponsor-related email |
| `joinMemberShipLink` | Membership sign-up form |
| `recruitmentLink` | Intern / exec recruitment form |
| `recruitmentOpen` | `true` turns on the **Join** button; `false` shows it as "준비 중" |
| `subscribeNewsletterLink` | Newsletter sign-up form |

Only change the text **inside the quotes**:

```typescript
export const presEmail = 'hj.you@mail.utoronto.ca';
```

---

### Other data files

| File | What it controls |
|---|---|
| `calendar-events.ts` | Events calendar entries |
| `invitation-archive.ts` | "지난 행사 초대장" on the Events page (newest first; 16:10 thumbnails) |
| `study-package-data.ts` | 족보 (study package) season, prices and courses |
| `kb.ts` | Knowledge base used by the site's chat assistant |

---

### Changing the site itself

> [!WARNING]
> **Danger zone.** To change other text (e.g. the About page), search for it in the `.tsx` files under `utkcc-fe/app/`. Run `npm run build` before opening a PR. If a deploy fails, Vercel keeps the last working version live.

---

## Environment Variables

Put these in `utkcc-fe/.env.local` for local development, and in the Vercel project settings for production.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | Local only | Base URL of the site, `http://localhost:3000` locally. In production it falls back to Vercel's URL, then `https://utkcc.com` |
| `OPENAI_API_KEY` | For chat | Enables AI answers in the chat assistant |
| `CHAT_AI_ENABLED` | — | Set to `false` to turn AI answers off |
| `CHAT_AI_MODEL` | — | Model override |
| `CHAT_AI_MAX_OUTPUT_TOKENS` | — | Max answer length (default `420`) |
| `CHAT_AI_MONTHLY_BUDGET_CAD` | — | Monthly spending cap in CAD (default `9.5`) |
| `CHAT_AI_MONTHLY_REQUEST_LIMIT` | — | Monthly request cap (default `3500`) |

> [!CAUTION]
> Never commit `.env` files or API keys.

---

## Deployment

The site deploys **automatically on Vercel** whenever a commit lands on `main`. No manual steps are needed.

---

<div align="center">

**To future UTKCC developers:** please keep this site alive and up to date for the community. Thank you! 💙

<sub>Originally written by <a href="https://github.com/ryubsmile">@ryubsmile</a> · Updated by the 20기 IT Department</sub>

</div>
