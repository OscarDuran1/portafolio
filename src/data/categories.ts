export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "all", name: "categories.all" },
  { id: "documental", name: "categories.documental" },
  { id: "retrato", name: "categories.retrato" },
  { id: "paisaje", name: "categories.paisaje" },
  { id: "arquitectura", name: "categories.arquitectura" },
];