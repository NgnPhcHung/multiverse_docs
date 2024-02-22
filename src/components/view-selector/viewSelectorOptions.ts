import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface ViewSelectorOptions {
  id: number;
  icon: keyof typeof dynamicIconImports;
  title: string;
  description: string;
  url: string;
}

export const viewSelectorOptions: ViewSelectorOptions[] = [
  {
    id: 1,
    title: "Database diagram",
    description: "Generate diagram from our SQL",
    url: "text-diagram",
    icon: "layout-list",
  },
  {
    id: 2,
    title: "Work flow",
    description: "Create your own workflow",
    url: "work-flow",
    icon: "boxes",
  },
];
