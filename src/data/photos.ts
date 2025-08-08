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

export const photos: Photo[] = photosData;
