# The Official UTKCC Website

This repository contains the source code for the UTKCC official website, created by the Programming Department of the 17th UTKCC.

## Authors

- 🎨 [Hyunjun You](https://www.instagram.com/hyunjun2003) — Designer.
- 🧑‍💻 [@ryubsmile](https://github.com/ryubsmile) — Programming Director.
- 🧩 [@caelankim](https://github.com/caelankim) — Programming Committee. 
- 💻 [@mijnap1](https://github.com/mjinap1) — Programming Intern.
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
export const presEmail = 'jeff.ryu@mail.utoronto.ca';
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
// 19th Executives Information (2025–2026)
  // =======================
  // PRESIDENT
  // =======================
  {
    dept: 'president',
    position: 'president',
    name: 'Minseo Kim',
    imageSrc: '/assets/images/exec-headshots/Minseo_Kim.webp',
    program: 'RC - Finance & Econ'
  },
  {
    dept: 'president',
    position: 'vice president',
    name: 'Minseo Kang',
    imageSrc: '/assets/images/exec-headshots/Minseok_Kang.webp',
    program: 'Econ & IHRH'
  },
  // =======================
  // ACADEMICS
  // =======================
  {
    dept: 'Academics',
    position: 'co-director',
    name: 'Soram Kim',
    imageSrc: '/assets/images/exec-headshots/Soram_Kim.webp',
    program: 'RC - Accounting'
  },
  {
    dept: 'director',
    position: 'co-director',
    name: 'Jinmin Choi',
    imageSrc: '/assets/images/exec-headshots/Jinmin_Choi.webp',
    program: 'RC - Finance & Econ'
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Young Mo Lee',
    imageSrc: '/assets/images/exec-headshots/Young_Mo_Lee.webp',
    program: 'RC - Accounting'
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Ben Koo',
    imageSrc: '/assets/images/exec-headshots/Ben_Koo.webp',
    program: 'RC - Management'
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Gaeun Lee',
    imageSrc: '/assets/images/exec-headshots/Gaeun_Lee.webp',
    program: 'Rotman Commerce'
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Hyunseo Choi',
    imageSrc: '/assets/images/exec-headshots/Hyunseo_Choi.webp',
    program: 'Rotman Commerce'
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Yeyun Hong',
    imageSrc: '/assets/images/exec-headshots/Yeyun_Hong.webp',
    program: 'MathPhysSci - Chem & Econ'
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Sihyun Kim (Sunny)',
    imageSrc: '/assets/images/exec-headshots/Sihyun_Kim.webp',
    program: 'Rotman Commerce'
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Hyejeong Ju',
    imageSrc: '/assets/images/exec-headshots/Hyejeong_Ju.webp',
    program: 'Rotman Commerce'
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Jimin Kim',
    imageSrc: '/assets/images/exec-headshots/Jinmin_Kim.webp',
    program: 'Rotman Commerce'
  },
  // =======================
  // MARKETING - VIDEO
  // =======================
  {
  dept: 'marketing-video',
  position: 'director',
  name: 'Hasuh Shin',
  imageSrc: '/assets/images/exec-headshots/Hasuh_Shin.webp',
  program: 'Architecture',
  linkedin: ''
  },
  {
  dept: 'marketing-video',
  position: 'committee',
  name: 'Jinseo Kim',
  imageSrc: '/assets/images/exec-headshots/Jinseo_Kim.webp',
  program: 'RC - Finance & Econ',
  linkedin: ''
  },
  {
  dept: 'marketing-video',
  position: 'intern',
  name: 'Yesol Kim',
  imageSrc: '/assets/images/exec-headshots/Yesol_Kim.webp',
  program: 'Social Sciences',
  linkedin: ''
  },
  {
  dept: 'marketing-video',
  position: 'intern',
  name: 'Chloe Jung',
  imageSrc: '/assets/images/exec-headshots/Chloe_Jung.webp',
  program: 'Social Sciences',
  linkedin: ''
  }
  // =======================
  // MARKETING - POSTER
  // =======================
  {
  dept: 'marketing-poster',
  position: 'director',
  name: 'Yeeun Jo',
  imageSrc: '/assets/images/exec-headshots/Yeeun_Jo.webp',
  program: 'Math & Environmental Studies',
  linkedin: ''
  },
  {
  dept: 'marketing-poster',
  position: 'committee',
  name: 'Doyeon Kim',
  imageSrc: '/assets/images/exec-headshots/Doyeon_Kim.webp',
  program: 'IRHR',
  linkedin: ''
  },
  {
  dept: 'marketing-poster',
  position: 'intern',
  name: 'Claire Kang',
  imageSrc: '/assets/images/exec-headshots/Claire_Kang.webp',
  program: 'Visual Studies',
  linkedin: ''
  },
  {
  dept: 'marketing-poster',
  position: 'intern',
  name: 'Minkyung Park',
  imageSrc: '/assets/images/exec-headshots/Minkyung_Park.webp',
  program: 'Social Sciences',
  linkedin: ''
  },
  {
  dept: 'marketing-poster',
  position: 'intern',
  name: 'Sooa Hong',
  imageSrc: '/assets/images/exec-headshots/Sooa_Hong.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  // =======================
  // MEDIA
  // =======================
  {
  dept: 'media',
  position: 'director',
  name: 'Chowon Kang',
  imageSrc: '/assets/images/exec-headshots/Chowon_Kang.webp',
  program: 'Political Science',
  linkedin: ''
  },
  {
  dept: 'media',
  position: 'committee',
  name: 'Yeonji Lee',
  imageSrc: '/assets/images/exec-headshots/Yeonji_Lee.webp',
  program: 'Life Sciences',
  linkedin: ''
  },
  {
  dept: 'media',
  position: 'intern',
  name: 'Eunice Moon',
  imageSrc: '/assets/images/exec-headshots/Eunice_Moon.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  {
  dept: 'media',
  position: 'intern',
  name: 'Yugyeong (Ella) Cho',
  imageSrc: '/assets/images/exec-headshots/Yugyeong_Cho.webp',
  program: 'Life Sciences',
  linkedin: ''
  },
  {
  dept: 'media',
  position: 'intern',
  name: 'Seohoo Hwang',
  imageSrc: '/assets/images/exec-headshots/Seohoo_Hwang.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  {
  dept: 'media',
  position: 'intern',
  name: 'Jiho Shin',
  imageSrc: '/assets/images/exec-headshots/Jiho_Shin.webp',
  program: 'Physical & Mathematical Sciences',
  linkedin: ''
  }
  // =======================
  // FINANCE
  // =======================
  {
    dept: 'finance',
    position: 'director',
    name: 'Seungmin Lim',
    imageSrc: '/assets/images/exec-headshots/Seungmin_Lim.webp',
    program: 'RC - Finance & Econ'
  },
  {
    dept: 'finance',
    position: 'committee',
    name: 'Elliot Lim',
    imageSrc: '/assets/images/exec-headshots/Elliot_Lim.webp',
    program: 'RC - Finance & Econ'
  },
  {
    dept: 'finance',
    position: 'intern',
    name: 'Chaehyun Kim',
    imageSrc: '/assets/images/exec-headshots/Chaehyun_Kim.webp',
    program: 'RC - Finance & Econ'
  },
  {
    dept: 'finance',
    position: 'intern',
    name: 'Jimin Yang',
    imageSrc: '/assets/images/exec-headshots/Jimin_Yang.webp',
    program: 'Economics and IR'
  },
  // =======================
  // SOCIAL
  // =======================
  {
  dept: 'social',
  position: 'director',
  name: 'Jiwon Song',
  imageSrc: '/assets/images/exec-headshots/Jiwon_Song.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'committee',
  name: 'Jisu Park',
  imageSrc: '/assets/images/exec-headshots/Jisu_Park.webp',
  program: 'Architectural Studies',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'committee',
  name: 'Seohui (Alice) Kim',
  imageSrc: '/assets/images/exec-headshots/Seohui_Kim.webp',
  program: 'Economics',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'committee',
  name: 'Erica Yoon',
  imageSrc: '/assets/images/exec-headshots/Erica_Yoon.webp',
  program: 'Kinesiology and Physical Education',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'intern',
  name: 'Julia Yang',
  imageSrc: '/assets/images/exec-headshots/Julia_Yang.webp',
  program: 'Social Sciences',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'intern',
  name: 'DaeGeon Lee',
  imageSrc: '/assets/images/exec-headshots/DaeGeon_Lee.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'intern',
  name: 'Minjun Kim',
  imageSrc: '/assets/images/exec-headshots/Minjun_Kim.webp',
  program: 'Kinesiology',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'intern',
  name: 'Noorey Shin',
  imageSrc: '/assets/images/exec-headshots/Noorey_Shin.webp',
  program: 'Linguistics',
  linkedin: ''
  },
  {
  dept: 'social',
  position: 'intern',
  name: 'Chan Young Lee',
  imageSrc: '/assets/images/exec-headshots/Chan-Young_Lee.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  // =======================
  // FINANCE
  // =======================
  {
  dept: 'finance',
  position: 'director',
  name: 'Seungmi Lim',
  imageSrc: '/assets/images/exec-headshots/Seungmi_Lim.webp',
  program: 'RC - Finance & Econ',
  linkedin: ''
  },
  {
  dept: 'finance',
  position: 'committee',
  name: 'Jaemin Jun',
  imageSrc: '/assets/images/exec-headshots/Jaemin_Jun.webp',
  program: 'RC - Accounting',
  linkedin: ''
  },
  {
  dept: 'finance',
  position: 'committee',
  name: 'Elliot Lim',
  imageSrc: '/assets/images/exec-headshots/Elliot_Lim.webp',
  program: 'RC - Finance & Econ',
  linkedin: ''
  },
  {
  dept: 'finance',
  position: 'intern',
  name: 'Chahyun Kim',
  imageSrc: '/assets/images/exec-headshots/Chahyun_Kim.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  {
  dept: 'finance',
  position: 'intern',
  name: 'Jimin Yang',
  imageSrc: '/assets/images/exec-headshots/Jimin_Yang.webp',
  program: 'Economics & IRHR',
  linkedin: ''
  }
  // =======================
  // EXTERNAL RELATIONS
  // =======================
  {
  dept: 'external_relations',
  position: 'director',
  name: 'Jung Yoon Choi',
  imageSrc: '/assets/images/exec-headshots/Jung_Yoon_Choi.webp',
  program: 'Political Science & Environmental Studies',
  linkedin: ''
  },
  {
  dept: 'external_relations',
  position: 'committee',
  name: 'Jungmin Shin',
  imageSrc: '/assets/images/exec-headshots/Jungmin_Shin.webp',
  program: 'Statistics & Math',
  linkedin: ''
  },
  {
  dept: 'external_relations',
  position: 'committee',
  name: 'Hyunjun You',
  imageSrc: '/assets/images/exec-headshots/Hyunjun_You.webp',
  program: 'RC - Finance & Econ',
  linkedin: ''
  },
  {
  dept: 'external_relations',
  position: 'intern',
  name: 'Brian Jin',
  imageSrc: '/assets/images/exec-headshots/Brian_Jin.webp',
  program: 'Rotman Commerce',
  linkedin: ''
  },
  {
  dept: 'external_relations',
  position: 'intern',
  name: 'Min So Kim',
  imageSrc: '/assets/images/exec-headshots/Min_So_Kim.webp',
  program: 'Life Sciences',
  linkedin: ''
  },
  {
  dept: 'external_relations',
  position: 'intern',
  name: 'Joonhyun Kim',
  imageSrc: '/assets/images/exec-headshots/Joonhyun_Kim.webp',
  program: 'Economics & Political Science',
  linkedin: ''
  },
  // =======================
  // PROGRAMMING
  // =======================
  {
  dept: 'programming',
  position: 'director',
  name: 'Jaehyuk Ryu',
  imageSrc: '/assets/images/exec-headshots/Jaehyuk_Ryu.webp',
  program: 'Computer Science & Statistics',
  linkedin: 'https://www.linkedin.com/in/jaehyuk-ryu/'
  },
  {
  dept: 'programming',
  position: 'committee',
  name: 'Caelan Kim',
  imageSrc: '/assets/images/exec-headshots/Caelan_Kim.webp',
  program: 'Computer Science & Statistics',
  linkedin: ''
  },
  {
  dept: 'programming',
  position: 'intern',
  name: 'Jeehoon (Jamie) Ryu',
  imageSrc: '/assets/images/exec-headshots/Jeehoon_Ryu.webp',
  program: 'Math & Physical Sciences',
  linkedin: 'https://www.linkedin.com/in/jamie-ryu-901310359/'
  }
```

- All contents must be in lowercase.

  1. `dept`: The department the member is in, among the elements in `deptList`.
  2. `position`: The member's position
  3. `name`: Name.
  4. `imageSrc`: Location of the image in the source code public directory. Please use the extension `.webp` or `.avif` to reduce file size if possible.
  5. `program`: The member's program of study.
  6. `intro`: Include this only if the member is the president or the vice-president; otherwise, leave it as `[]`.

- Adding Photos:

  1. The headshot of each executive is located in `public/assets/images/exec-headshots`.
  2. The format of each picture is in `{name}.webp` with the file size less than 100kb, for optimization purposes.
  3. For better aesthetics and unity of design, each picture must be cut in 1:1 square ratio of around 700px * 700px.
  4. The face of each executive must fit inside the center of the 3*3 grid when trimming. 

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
