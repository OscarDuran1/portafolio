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
  { id: 1, src: "img/documental/foto1.jpg", title: "photo_titles.doc_1", category: "documental", width: 4, height: 3 },
  { id: 2, src: "img/documental/foto2.jpg", title: "photo_titles.doc_2", category: "documental", width: 3, height: 4 },
  { id: 3, src: "img/documental/foto3.jpg", title: "photo_titles.doc_3", category: "documental", width: 4, height: 3 },
  { id: 4, src: "img/documental/foto4.jpg", title: "photo_titles.doc_4", category: "documental", width: 3, height: 4 },

  { id: 5, src: "img/documental/foto5.jpg", title: "photo_titles.doc_5", category: "documental", width: 4, height: 3 },
  { id: 6, src: "img/documental/foto6.jpg", title: "photo_titles.doc_6", category: "documental", width: 4, height: 3 },
  { id: 7, src: "img/documental/foto7.jpg", title: "photo_titles.doc_7", category: "documental", width: 3, height: 4 },
  { id: 8, src: "img/documental/foto8.jpg", title: "photo_titles.doc_8", category: "documental", width: 4, height: 3 },

  { id: 9, src: "img/documental/foto9.jpg", title: "photo_titles.doc_9", category: "documental", width: 4, height: 3 },
  { id: 10, src: "img/documental/foto10.jpg", title: "photo_titles.doc_10", category: "documental", width: 4, height: 3 },
  { id: 11, src: "img/documental/foto11.jpg", title: "photo_titles.doc_11", category: "documental", width: 3, height: 4 },
  { id: 12, src: "img/documental/foto12.jpg", title: "photo_titles.doc_12", category: "documental", width: 4, height: 3 },

  // Retrato
  { id: 31, src: "img/retrato/foto1.jpg", title: "photo_titles.port_1", category: "retrato", width: 3, height: 4 },
  { id: 32, src: "img/retrato/foto2.jpg", title: "photo_titles.port_2", category: "retrato", width: 3, height: 4 },
  { id: 33, src: "img/retrato/foto3.jpg", title: "photo_titles.port_3", category: "retrato", width: 3, height: 4 },
  { id: 34, src: "img/retrato/foto4.jpg", title: "photo_titles.port_4", category: "retrato", width: 3, height: 4 }, 
  { id: 35, src: "img/retrato/foto5.jpg", title: "photo_titles.port_5", category: "retrato", width: 3, height: 4 },
  { id: 36, src: "img/retrato/foto6.jpg", title: "photo_titles.port_6", category: "retrato", width: 3, height: 4 },
  { id: 37, src: "img/retrato/foto7.jpg", title: "photo_titles.port_7", category: "retrato", width: 4, height: 3 },
  { id: 38, src: "img/retrato/foto8.jpg", title: "photo_titles.port_8", category: "retrato", width: 3, height: 5 }, 
  { id: 39, src: "img/retrato/foto9.jpg", title: "photo_titles.port_9", category: "retrato", width: 3, height: 4 },
  { id: 40, src: "img/retrato/foto10.jpg", title: "photo_titles.port_10", category: "retrato", width: 3, height: 4 },

  // Paisaje
  { id: 51, src: "img/paisaje/foto1.jpg", title: "photo_titles.land_1", category: "paisaje", width: 8, height: 3 }, 
  { id: 52, src: "img/paisaje/foto2.jpg", title: "photo_titles.land_2", category: "paisaje", width: 4, height: 3 },
  { id: 53, src: "img/paisaje/foto3.jpg", title: "photo_titles.land_3", category: "paisaje", width: 4, height: 3 },
  { id: 54, src: "img/paisaje/foto4.jpg", title: "photo_titles.land_4", category: "paisaje", width: 4, height: 3 },
  { id: 55, src: "img/paisaje/foto5.jpg", title: "photo_titles.land_5", category: "paisaje", width: 4, height: 3 },
  { id: 56, src: "img/paisaje/foto6.jpg", title: "photo_titles.land_6", category: "paisaje", width: 4, height: 3 }, 
  { id: 57, src: "img/paisaje/foto7.jpg", title: "photo_titles.land_7", category: "paisaje", width: 4, height: 3 },
  { id: 58, src: "img/paisaje/foto8.jpg", title: "photo_titles.land_8", category: "paisaje", width: 8, height: 3 },
  { id: 59, src: "img/paisaje/foto9.jpg", title: "photo_titles.land_9", category: "paisaje", width: 4, height: 3 },
  { id: 50, src: "img/paisaje/foto10.jpg", title: "photo_titles.land_10", category: "paisaje", width: 4, height: 3 },

  // Arquitectura
  { id: 71, src: "img/arquitectura/foto1.jpg", title: "photo_titles.arch_1", category: "arquitectura", width: 3, height: 4 },
  { id: 72, src: "img/arquitectura/foto2.jpg", title: "photo_titles.arch_2", category: "arquitectura", width: 3, height: 4 },
  { id: 73, src: "img/arquitectura/foto3.jpg", title: "photo_titles.arch_3", category: "arquitectura", width: 4, height: 3 },
  { id: 74, src: "img/arquitectura/foto4.jpg", title: "photo_titles.arch_4", category: "arquitectura", width: 3, height: 4 },
  { id: 75, src: "img/arquitectura/foto5.jpg", title: "photo_titles.arch_5", category: "arquitectura", width: 8, height: 3 },
  { id: 76, src: "img/arquitectura/foto6.jpg", title: "photo_titles.arch_6", category: "arquitectura", width: 3, height: 4 },
  { id: 77, src: "img/arquitectura/foto7.jpg", title: "photo_titles.arch_7", category: "arquitectura", width: 4, height: 3 },
  { id: 78, src: "img/arquitectura/foto8.jpg", title: "photo_titles.arch_8", category: "arquitectura", width: 3, height: 4 },
  { id: 79, src: "img/arquitectura/foto9.jpg", title: "photo_titles.arch_9", category: "arquitectura", width: 4, height: 3 },  
  { id: 80, src: "img/arquitectura/foto10.jpg", title: "photo_titles.arch_10", category: "arquitectura", width: 3, height: 4 },  
];
