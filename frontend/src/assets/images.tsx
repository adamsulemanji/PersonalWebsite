export type PictureCategory = 'Personal archive' | 'Trips' | 'Friends';

export type PictureAsset = {
  src: string;
  alt: string;
  category: PictureCategory;
};

export const imagesLeft: PictureAsset[] = [
  {
    src: '/images/aggiefootball.webp',
    alt: 'Texas A&M Aggie Football game day',
    category: 'Personal archive',
  },
  {
    src: '/images/mountain.webp',
    alt: 'Hiking adventure in the mountains',
    category: 'Trips',
  },
  {
    src: '/images/ringday.webp',
    alt: 'Receiving my Aggie Ring on Ring Day',
    category: 'Personal archive',
  },
  {
    src: '/images/ringday2.webp',
    alt: 'Celebrating with friends after Ring Day ceremony',
    category: 'Friends',
  },
  {
    src: '/images/ringday3.webp',
    alt: 'Family photo on Ring Day',
    category: 'Personal archive',
  },
  {
    src: '/images/river.webp',
    alt: 'Beautiful river landscape during summer',
    category: 'Trips',
  },
  {
    src: '/images/skiing.webp',
    alt: 'Winter skiing trip with friends',
    category: 'Trips',
  },
];

export const imagesRight: PictureAsset[] = [
  {
    src: '/images/food.webp',
    alt: 'Amazing meal from my favorite restaurant',
    category: 'Personal archive',
  },
  {
    src: '/images/roommates.webp',
    alt: 'Group photo with my roommates',
    category: 'Friends',
  },
  {
    src: '/images/texans.webp',
    alt: 'At a Houston Texans NFL game',
    category: 'Trips',
  },
  {
    src: '/images/bday.webp',
    alt: 'Birthday celebration with close friends',
    category: 'Friends',
  },
  {
    src: '/images/bean.webp',
    alt: 'Visit to Cloud Gate (The Bean) in Chicago',
    category: 'Trips',
  },
  {
    src: '/images/exec.webp',
    alt: 'Executive team photo for student organization',
    category: 'Friends',
  },
  {
    src: '/images/gameday.webp',
    alt: 'Texas A&M gameday with the 12th Man',
    category: 'Personal archive',
  },
  {
    src: '/images/kfd.webp',
    alt: 'Kyle Field Day celebration at Texas A&M',
    category: 'Personal archive',
  },
];
