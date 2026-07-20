import { getURL } from '@/lib/utils';

export const METADATA_SAVES = {
  locationOrigin: getURL('/'),
  siteName: 'UTKCC',
  siteFullName: 'University of Toronto Korean Commerce Community',
  siteDescription:
    'UTKCC는 토론토 대학교 한인 학생들이 만든 경영 동아리입니다.',
  siteAuthors: [
    { name: 'Jaehyuk Ryu', url: 'https://www.linkedin.com/in/jaehyuk-ryu/' },
    { name: 'Hyunjun You', url: 'https://www.linkedin.com/in/hyunjunyou/' },
    { name: 'JinGeon Kim', url: 'https://www.linkedin.com/in/justingeonkim/' },
  ],
  colorHexCode: '#053C8C',
};
