export type PictureCategory = 'Personal archive' | 'Trips' | 'Friends';

export type PictureAsset = {
  src: string;
  alt: string;
  category: PictureCategory;
};

export const imagesLeft: PictureAsset[] = [
  
  {
    src: '/images/aggiefootball.jpg',
    alt: 'Texas A&M Aggie Football game day',
    category: 'Personal archive',
  },
  {
    src: '/images/mountain.jpg',
    alt: 'Hiking adventure in the mountains',
    category: 'Trips',
  },
  {
    src: '/images/ringday.jpg',
    alt: 'Receiving my Aggie Ring on Ring Day',
    category: 'Personal archive',
  },
  {
    src: '/images/ringday2.png',
    alt: 'Celebrating with friends after Ring Day ceremony',
    category: 'Friends',
  },
  {
    src: '/images/ringday3.png',
    alt: 'Family photo on Ring Day',
    category: 'Personal archive',
  },
  {
    src: '/images/river.jpg',
    alt: 'Beautiful river landscape during summer',
    category: 'Trips',
  },
  {
    src: '/images/skiing.jpg',
    alt: 'Winter skiing trip with friends',
    category: 'Trips',
  },
];

export const imagesRight: PictureAsset[] = [
  {
    src: '/images/food.jpg',
    alt: 'Amazing meal from my favorite restaurant',
    category: 'Personal archive',
  },
  {
    src: '/images/roommates.jpg',
    alt: 'Group photo with my roommates',
    category: 'Friends',
  },
  {
    src: '/images/texans.jpg',
    alt: 'At a Houston Texans NFL game',
    category: 'Trips',
  },
  {
    src: '/images/bday.jpg',
    alt: 'Birthday celebration with close friends',
    category: 'Friends',
  },
  {
    src: '/images/bean.jpg',
    alt: 'Visit to Cloud Gate (The Bean) in Chicago',
    category: 'Trips',
  },
  {
    src: '/images/exec.png',
    alt: 'Executive team photo for student organization',
    category: 'Friends',
  },
  {
    src: '/images/gameday.jpg',
    alt: 'Texas A&M gameday with the 12th Man',
    category: 'Personal archive',
  },
  {
    src: '/images/kfd.png',
    alt: 'Kyle Field Day celebration at Texas A&M',
    category: 'Personal archive',
  },
];
