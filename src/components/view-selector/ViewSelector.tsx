import { CardView } from "./CardView";
import { viewSelectorOptions } from "./viewSelectorOptions";

export const ViewSelector = () => {
  return (
    <div className="p-8 grid grid-cols-12 gap-x-2 place-items-center h-full w-full">
      {viewSelectorOptions.map((view) => (
        <CardView
          key={view.id}
          icon={view.icon}
          description={view.description}
          title={view.title}
          url={view.url}
        />
      ))}
    </div>
  );
};
