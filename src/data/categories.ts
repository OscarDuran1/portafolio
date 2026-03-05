export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "all", name: "categories.all" },
  { id: "calle", name: "categories.calle" },
  { id: "documental", name: "categories.documental" },
  { id: "arquitectura", name: "categories.arquitectura" },
  { id: "paisaje", name: "categories.paisaje" },
  { id: "retrato", name: "categories.retrato" },
];