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
    description: "Create your own workflow just by drag and drop",
    url: "work-flow",
    icon: "boxes",
  },
  {
    id: 3,
    title: "Note with board",
    description: "Note taking with your board view",
    url: "note-taking",
    icon: "book",
  },
];
