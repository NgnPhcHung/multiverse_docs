import clsx from "clsx";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "../common/DyanamicIcon";

interface CardViewProps {
  icon?: keyof typeof dynamicIconImports;
  title: string;
  description: string;
  url: string;
}

export const CardView = ({ description, icon, title, url }: CardViewProps) => {
  const navigate = useNavigate();

  const onNavigate = () => {
    setTimeout(() => {
      navigate(url);
    }, 0);
  };

  return (
    <div
      role="button"
      className="w-full h-full z-sideBar rounded-md flex items-center space-x-4 p-4 hover:border-primaryHover-900 cursor-pointer group/cardview col-span-12 md:col-span-6 xl:col-span-4 bg-primary text-secondary outline-2 outline-primary outline hover:outline-offset-2 hover:p-3 duration-200"
      onClick={onNavigate}
    >
      {icon && (
        <DynamicIcon name={icon} size={36} className="text-secondary " />
      )}
      <div className="w-full">
        <h2
          className={clsx(
            "font-semibold text-xl relative w-full",
            "after:absolute after:left-0 after:bottom-0 after:contents-[''] after:w-0  after:h-[1px] after:bg-secondary after:transition-all after:duration-500",
            "group-hover/cardview:after:w-full "
          )}
        >
          {title}
        </h2>
        <p className="text-secondary text-sm lg:text-md">{description}</p>
      </div>
    </div>
  );
};
