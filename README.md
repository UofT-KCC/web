# The Official UTKCC Website

This repository contains the source code for the UTKCC official website, created by the Programming Department of the 17th UTKCC.

## Authors

- 🎨 [Hyunjun You](https://www.instagram.com/hyunjun2003) — Designer.
- 🧑‍💻 [@ryubsmile](https://github.com/ryubsmile) — Programming Director.
- 🧩 [@caelankim](https://github.com/caelankim) — Programming Committee.
- 💻 [@mijnap1](https://github.com/mijnap1) — Programming Intern.

## Documentation (Attention Maintainers-)

This documentation is intended for non-coders who wish to maintain the website with minimal coding.

The website does not use any external databases or APIs. Instead, it fetches data from the TypeScript files in the source code, which are located in the `utkcc-fe/data` (texts) and `utkcc-fe/public/assets` (images) folders.

Once you navigate to the folder, you will find several files with the `.ts` extension. You may open these files and make changes only to the ones marked with "수정 O" at the top or in the data explanation.

### Updating Emails in the Footer

Refer to `utkcc-fe/data/change-annually-data.ts`.

Here are some examples:

```typescript
...

/** KCC Email */
export const kccEmail = 'koreancommerce@gmail.com';
/** President's Email */
export const presEmail = 'danielkim6778@gmail.com';
/** Vice President's Email */
export const vicePresEmail = 'laurenkang11@gmail.com';
/** Sponsor-Related Email (ER Director) */
export const erDirectorEmail = 'jungyoon.uoft@gmail.com';

...
```

Change the text within the single quotation marks to update the emails. For example:

```typescript
export const presEmail = "jeff.ryu@mail.utoronto.ca";
```

### Updating Subscription and Recruitment-Related Form Links

Refer to the same file as above, `utkcc-fe/data/change-annually-data.ts`.

### Updating Event Data

Check the file in `utkcc-fe/data/events-data.ts`.

The data is stored in a constant variable called `eventData`. Each event is stored in the following manner:

```typescript
{
    info: {
      type: 'academic',
      slogan: ['학생의 본분을', '잊지 않기 위하여'],
      explanation:
        '대학 공부는 처음이라 버겁게 느껴진다면 UTKCC와 함께 공부해요. 코스를 수강했던 선배들에게만 들을 수 있는 팁과 문제풀이 방식을 코스 튜토리얼을 통해 배워갈 수 있습니다.',
    },
    bgImage: '/assets/images/events/academic-events.jpeg',
},
```

- Changing the text: Make changes directly in the current file.
- Changing the image: Replace the image and update the relative location in the bgImage attribute.

### Updating Sponsors Information - **Important**

WARNING: Updating the sponsor information must be done _every September_. \
Please read the instructions below and follow them.

Open the following typescript file in the source code: `utkcc-fe/data/sponsors-data.ts`.

Information of sponsors of UTKCC will be stored in the variable `sponsorsData`, in the following structure:

```typescript
{
    name: '18feet',
    exp: '𝟏𝟖𝐟𝐞𝐞𝐭 𝐄𝐬𝐩𝐫𝐞𝐬𝐬𝐨 𝐁𝐚𝐫 & 𝐂𝐡𝐞𝐨𝐧𝐠',
    imageSrc: '/assets/images/sponsors/18feet.jpeg',
    websiteUrl: 'https://www.instagram.com/18feet.ca/',
    locationUrl: 'https://goo.gl/maps/QKjbG7Xc8nK61tU86',
},
```

- All contents must be in lowercase.

  1. `name`: This will be displayed on the menubar.
  2. `exp`: Short for explanation, provide a brief description of the sponsor and its activities.
  3. `imageSrc`: Location of the image in the source code public directory. Please use the extension `.webp` or `.avif` to reduce file size if possible.
  4. `websiteUrl` and `locationUrl`: Self-explanatory; paste the URL of the website/Instagram and a location URL (Google Maps location URL is preferred).

- Updating the image: add the image under folder `utkcc-fe/public/asses/images/sponsors`.
- Adding another sponsor: add the image under folder `utkcc-fe/public/asses/images/sponsors`, and add another object at the very bottom of the array `sponsorsData`.
- Removing an existing sponsor: Remove the entire block of text enclosed in curly braces {} that contains the information. Also, delete the image file in `utkcc-fe/public/asses/images/sponsors`.

### Updating Executives Information - **Important**

WARNING: Updating the executivers information must be done _every April and October_.\
Please follow the instructions below.

Open the TypeScript file in the source code: `utkcc-fe/data/executives-data.ts`.

Information of executive members of UTKCC will be stored in the variable `execData`, in the following structure:

```typescript
// 20th Executives Information (2026–2027)
  // =======================
  // PRESIDENTS
  // =======================
  {
    dept: 'presidents',
    position: 'president',
    name: '유현준',
    imageSrc: '/assets/images/exec-headshots/유현준.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'presidents',
    position: 'vice president',
    name: '이가은',
    imageSrc: '/assets/images/exec-headshots/이가은.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },

  // =======================
  // ACADEMICS
  // =======================
  {
    dept: 'academics',
    position: 'director',
    name: '구본석',
    imageSrc: '/assets/images/exec-headshots/구본석.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'director',
    name: '주혜정',
    imageSrc: '/assets/images/exec-headshots/주혜정.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'manager',
    name: '김지민',
    imageSrc: '/assets/images/exec-headshots/김지민.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'manager',
    name: '홍예윤',
    imageSrc: '/assets/images/exec-headshots/홍예윤.jpg',
    program: 'Chemistry & Immunology',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'manager',
    name: '이대건',
    imageSrc: '/assets/images/exec-headshots/이대건.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'manager',
    name: '김강인',
    imageSrc: '/assets/images/exec-headshots/김강인.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '정준혁',
    imageSrc: '',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '임수현',
    imageSrc: '/assets/images/exec-headshots/임수현.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '권라율',
    imageSrc: '/assets/images/exec-headshots/권라율.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '허동진',
    imageSrc: '/assets/images/exec-headshots/허동진.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },

  // =======================
  // MARKETING - POSTER
  // =======================
  {
    dept: 'marketing - poster',
    position: 'director',
    name: '박민경',
    imageSrc: '/assets/images/exec-headshots/박민경.jpg',
    program: 'Social Science',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'manager',
    name: '강다연',
    imageSrc: '/assets/images/exec-headshots/강다연.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'manager',
    name: '최호승',
    imageSrc: '/assets/images/exec-headshots/최호승.jpg',
    program: 'Kinesiology',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'intern',
    name: '박주원',
    imageSrc: '/assets/images/exec-headshots/박주원.jpg',
    program: 'Humanities',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'intern',
    name: '임기현',
    imageSrc: '/assets/images/exec-headshots/임기현.jpg',
    program: 'Statistics & Economics',
    intro: [],
  },

  // =======================
  // MARKETING - VIDEO
  // =======================
  {
    dept: 'marketing - video',
    position: 'director',
    name: '신하서',
    imageSrc: '/assets/images/exec-headshots/신하서.webp',
    program: 'Architecture',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'manager',
    name: '김예솔',
    imageSrc: '/assets/images/exec-headshots/김예솔.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'manager',
    name: '정윤진',
    imageSrc: '/assets/images/exec-headshots/정윤진.jpg',
    program: 'Economics & Statistics',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'manager',
    name: '주재은',
    imageSrc: '/assets/images/exec-headshots/주재은.jpg',
    program: 'Mathematics & Statistics',
    intro: [],
  },

  // =======================
  // MEDIA
  // =======================
  {
    dept: 'media',
    position: 'director',
    name: '이연지',
    imageSrc: '/assets/images/exec-headshots/이연지.jpg',
    program: 'Human Biology & Physiology',
    intro: [],
  },
  {
    dept: 'media',
    position: 'manager',
    name: '배진주',
    imageSrc: '/assets/images/exec-headshots/배진주.jpg',
    program: 'Rotman Commerce - Accounting',
    intro: [],
  },
  {
    dept: 'media',
    position: 'manager',
    name: '조희원',
    imageSrc: '/assets/images/exec-headshots/조희원.jpg',
    program: 'Mathematics & Economics',
    intro: [],
  },
  {
    dept: 'media',
    position: 'intern',
    name: '김규아',
    imageSrc: '/assets/images/exec-headshots/김규아.jpg',
    program: '',
    intro: [],
  },

  // =======================
  // SOCIAL
  // =======================
  {
    dept: 'social',
    position: 'director',
    name: '김서희',
    imageSrc: '/assets/images/exec-headshots/김서희.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'manager',
    name: '이찬영',
    imageSrc: '/assets/images/exec-headshots/이찬영.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'manager',
    name: '김시현',
    imageSrc: '/assets/images/exec-headshots/김시현.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'social',
    position: 'manager',
    name: '백선주',
    imageSrc: '/assets/images/exec-headshots/백선주.jpg',
    program: 'Architecture',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '황다비',
    imageSrc: '/assets/images/exec-headshots/황다비.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '김동훈',
    imageSrc: '/assets/images/exec-headshots/김동훈.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '이지후',
    imageSrc: '/assets/images/exec-headshots/이지후.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '정인채',
    imageSrc: '',
    program: 'Rotman Commerce',
    intro: [],
  },

  // =======================
  // CORPORATE RELATIONS
  // =======================
  {
    dept: 'corporate relations',
    position: 'director',
    name: '임준서',
    imageSrc: '/assets/images/exec-headshots/임준서.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'director',
    name: '진하윤',
    imageSrc: '/assets/images/exec-headshots/진하윤.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'manager',
    name: '신하림',
    imageSrc: '/assets/images/exec-headshots/신하림.jpg',
    program: 'Linguistics',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'manager',
    name: '김유민',
    imageSrc: '/assets/images/exec-headshots/김유민.jpg',
    program: 'Political Science, Statistics & Digital Humanities',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'manager',
    name: '권유현',
    imageSrc: '/assets/images/exec-headshots/권유현.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'manager',
    name: '조재영',
    imageSrc: '/assets/images/exec-headshots/조재영.jpg',
    program: 'Biological Chemistry',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'intern',
    name: '유유진',
    imageSrc: '/assets/images/exec-headshots/유유진.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'intern',
    name: '권진현',
    imageSrc: '/assets/images/exec-headshots/권진현.jpg',
    program: 'Economics & Statistics',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'intern',
    name: '김민지',
    imageSrc: '/assets/images/exec-headshots/김민지.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },

  // =======================
  // FINANCE
  // =======================
  {
    dept: 'finance',
    position: 'director',
    name: '전재민',
    imageSrc: '/assets/images/exec-headshots/전재민.jpg',
    program: 'Rotman Commerce - Accounting',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'manager',
    name: '양지민',
    imageSrc: '/assets/images/exec-headshots/양지민.jpg',
    program: 'Finance & Economics',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'manager',
    name: '문서윤',
    imageSrc: '/assets/images/exec-headshots/문서윤.jpg',
    program: 'Rotman Commerce - Accounting',
    intro: [],
  },

  // =======================
  // INFORMATION TECHNOLOGY
  // =======================
  {
    dept: 'information technology',
    position: 'director',
    name: '류지훈',
    imageSrc: '/assets/images/exec-headshots/류지훈.jpg',
    program: 'Computer Science & Mathematics',
    intro: [],
  },
  {
    dept: 'information technology',
    position: 'manager',
    name: '신지호',
    imageSrc: '/assets/images/exec-headshots/신지호.jpg',
    program: 'Actuarial Science & Statistics',
    intro: [],
  },
  {
    dept: 'information technology',
    position: 'intern',
    name: '김이안',
    imageSrc: '/assets/images/exec-headshots/김이안.jpg',
    program: 'Mathematics & Physical Sciences',
    intro: [],
  },
```

- All contents must be in lowercase.

  1. `dept`: The department the member is in. It must exactly match one of the elements in `deptList` (e.g. `'presidents'`, `'academics'`, `'corporate relations'`, `'finance'`, `'information technology'`, `'marketing - poster'`, `'marketing - video'`, `'media'`, `'social'`).
  2. `position`: The member's position (`'president'`, `'vice president'`, `'director'`, `'manager'` or `'intern'`).
  3. `name`: Name.
  4. `imageSrc`: Location of the image in the source code public directory. Please use the extension `.webp` or `.avif` to reduce file size if possible. Leave it as `''` if the member has no photo yet; a grey placeholder will be shown instead.
  5. `program`: The member's program of study.
  6. `intro`: Include this only if the member is the president or the vice-president; otherwise, leave it as `[]`.

- Adding Photos:

  1. The headshot of each executive is located in `public/assets/images/exec-headshots`.
  2. The format of each picture is in `{name}.webp` with the file size less than 100kb, for optimization purposes.
  3. For better aesthetics and unity of design, each picture must be cut in 1:1 square ratio of around 700px \* 700px.
  4. The face of each executive must fit inside the center of the 3\*3 grid when trimming.

### Updating the Website Itself - **Danger Zone**

If the maintainer needs to change quotes or content in other areas, such as the introduction of UTKCC, please search for the corresponding text in `utkcc-fe/app/` files that end with `.tsx`.

WARNING: This is a risky action for non-coders. In case of deployment failure, the website will automatically revert to the latest working version. Please consult @ryubsmile for assistance.

## Tech Stack

**Client:** React, NextJS, TailwindCSS, Typescript

**Server:** NextJS, Typescript

## Installation, for Local Development.

1.  Clone the repository.
2.  Navigate to `utkcc-fe` folder.
3.  Run `npm install`.
4.  Under the same folder, create a file named `.env.local`, and write the following:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

5.  Run `npm run dev`. (exit, or close dev mode using `∧c`).
6.  Commit to a new branch and make a Pull Request.
7.  Check the PR, and merge into main.

## Environment Variables

To run this project, you will need to update the following environment variables in your `.env` file, located under the `utkcc-web/utkcc-fe` folder:

```
NEXT_PUBLIC_BASE_URL=https://utkcc-web.vercel.app
```

> In this environment variable, you will need to add the base URL of the website, i.e. the home directory.

## Deployment

The deployment of this project will be done automatically via Vercel once a commit has been pushed to the `main` branch.

## Appendix

For coders and programmers in future UTKCC: we, the creators, kindly ask you to maintain and update this website for the benefit of your institution. Thank you!

## :)

Written by @ryubsmile .
