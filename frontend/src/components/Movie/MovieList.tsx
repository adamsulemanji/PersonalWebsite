import './movie-item.css';

interface AlbumItemProps {
    cover: string;
    title: string;
    artist: string;
    link?: string;
}

const album_list: AlbumItemProps[] = [
    {
        cover: "https://a.ltrbxd.com/resized/sm/upload/4g/qd/0m/h2/80MP1QuE4D8TQ0EBygGbWiWadrd-0-1000-0-1500-crop.jpg?v=bf11b45f90",
        title: "Madagascar",
        artist: "Dreamworks",
    },
    {
        cover: "https://a.ltrbxd.com/resized/film-poster/1/1/7/6/2/1/117621-interstellar-0-460-0-690-crop.jpg?v=7ad89e6666",
        title: "Interstellar",
        artist: "Christopher Nolan",
    },
    {
        cover: "https://a.ltrbxd.com/resized/sm/upload/qq/wx/vh/dy/tPnw9oqIvIMoYjVozkDkxm3xR8r-0-150-0-225-crop.jpg?v=28856a9f35",
        title: "22 Jump Street",
        artist: "Phil Lord, Christopher Miller",
    },
    {
        cover: "https://a.ltrbxd.com/resized/sm/upload/pc/n6/pz/mi/wvzfK5QR6dGLwND8MCzWjsQWG4Q-0-150-0-225-crop.jpg?v=bcfcc8f8f6",
        title: "The Handmaiden",
        artist: "Park Chan-wook",
    },
];

function AlbumItem({ cover, title, artist, link }: AlbumItemProps) {
    const discColorClass = `disc-color-${Math.floor(Math.random() * 7)}`;
  
    const diskStyles = ['disk-cd', 'disk-bluray'];
    const randomDiskStyle = diskStyles[Math.floor(Math.random() * diskStyles.length)];
  
    return (
      <a href={link} className="h-full w-full cursor-pointer mb-6 rounded-xl">
        <div className="music-item group relative flex w-full items-center rounded-lg bg-neutral-100 dark:bg-gray-800 px-16 py-24 border border-gray-200 dark:border-gray-700">
          <div className="album-container">
            <div className="album-wrap">
              <div className="album" style={{ backgroundImage: `url(${cover})` }}></div>
              <div className={`disk ${discColorClass} ${randomDiskStyle}`}>
                <div className="disk__inside"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs">
          <p className="font-bold text-black-700">{title}</p>
          <p className="text-black-400">{artist}</p>
        </div>
      </a>
    );
  }
  

export default function AlbumList() {
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {album_list.map((album, index) => (
                <AlbumItem
                    key={index}
                    cover={album.cover}
                    title={album.title}
                    artist={album.artist}
                    link={album.link}
                />
            ))}
        </div>
    );
}
