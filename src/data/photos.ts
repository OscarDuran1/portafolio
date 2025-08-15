import photosData from "./photos.json";

export interface Photo {
  id: number;
  src: string;
  placeholderSrc: string;
  title: string;
  category: string;
  width: number;
  height: number;
}

const photosByCategory: { [key: string]: Photo[] } = photosData;

export const photos: Photo[] = Object.values(photosByCategory).flat();
