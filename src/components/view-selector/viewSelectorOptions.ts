import dynamicIconImports from "lucide-react/dynamicIconImports";

interface ViewSelectorOptions {
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
    url: "/text-diagram",
    icon: "layout-list",
  },
];
