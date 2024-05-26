import { CardView } from "./CardView";
import { viewSelectorOptions } from "./viewSelectorOptions";

export const ViewSelector = () => {
  return (
    <div
      key="view-selector"
      className=" h-full w-full flex items-center bg-secondary"
    >
      <div className="p-8 grid grid-cols-12 gap-3 place-items-center w-full">
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
    </div>
  );
};
