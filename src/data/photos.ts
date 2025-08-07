export interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  width: number;
  height: number;
}

export const photos: Photo[] = [
  // Documental
  { id: 1, src: "img/documental/foto1.jpg", title: "photo_titles.doc_1", category: "documental", width: 3, height: 4 },
  { id: 2, src: "img/documental/foto2.jpg", title: "photo_titles.doc_2", category: "documental", width: 3, height: 4 },
  { id: 3, src: "img/documental/foto3.jpg", title: "photo_titles.doc_3", category: "documental", width: 4, height: 3 },
  { id: 4, src: "img/documental/foto4.jpg", title: "photo_titles.doc_4", category: "documental", width: 1, height: 1 },

  // Retrato
  { id: 5, src: "img/retrato/foto1.jpg", title: "photo_titles.port_1", category: "retrato", width: 3, height: 4 },
  { id: 6, src: "img/retrato/foto2.jpg", title: "photo_titles.port_2", category: "retrato", width: 3, height: 4 },
  { id: 7, src: "img/retrato/foto3.jpg", title: "photo_titles.port_3", category: "retrato", width: 3, height: 4 },
  { id: 8, src: "img/retrato/foto4.jpg", title: "photo_titles.port_4", category: "retrato", width: 3, height: 5 }, // Vertical alta

  // Paisaje
  { id: 9, src: "img/paisaje/foto1.jpg", title: "photo_titles.land_1", category: "paisaje", width: 8, height: 3 }, // Panorámica
  { id: 10, src: "img/paisaje/foto2.jpg", title: "photo_titles.land_2", category: "paisaje", width: 4, height: 3 },
  { id: 11, src: "img/paisaje/foto3.jpg", title: "photo_titles.land_3", category: "paisaje", width: 4, height: 3 },
  { id: 12, src: "img/paisaje/foto4.jpg", title: "photo_titles.land_4", category: "paisaje", width: 4, height: 3 },
  { id: 13, src: "img/paisaje/foto5.jpg", title: "photo_titles.land_5", category: "paisaje", width: 1, height: 1 },

  // Arquitectura
  { id: 14, src: "img/arquitectura/foto1.jpg", title: "photo_titles.arch_1", category: "arquitectura", width: 3, height: 4 },
  { id: 15, src: "img/arquitectura/foto2.jpg", title: "photo_titles.arch_2", category: "arquitectura", width: 3, height: 4 },
  { id: 16, src: "img/arquitectura/foto3.jpg", title: "photo_titles.arch_3", category: "arquitectura", width: 4, height: 3 },
  { id: 17, src: "img/arquitectura/foto4.jpg", title: "photo_titles.arch_4", category: "arquitectura", width: 3, height: 4 },
  { id: 18, src: "img/arquitectura/foto5.jpg", title: "photo_titles.arch_5", category: "arquitectura", width: 4, height: 3 },
  { id: 19, src: "img/arquitectura/foto6.jpg", title: "photo_titles.arch_6", category: "arquitectura", width: 3, height: 4 },
  { id: 20, src: "img/arquitectura/foto7.jpg", title: "photo_titles.arch_7", category: "arquitectura", width: 8, height: 1 },
  { id: 21, src: "img/arquitectura/foto8.jpg", title: "photo_titles.arch_8", category: "arquitectura", width: 3, height: 4 },
  { id: 22, src: "img/arquitectura/foto9.jpg", title: "photo_titles.arch_9", category: "arquitectura", width: 3, height: 4 },  
  { id: 23, src: "img/arquitectura/foto10.jpg", title: "photo_titles.arch_10", category: "arquitectura", width: 4, height: 3 },  
];
