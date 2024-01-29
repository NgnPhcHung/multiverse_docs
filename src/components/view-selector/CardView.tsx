import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "./DyanamicIcon";

interface CardViewProps {
  icon: keyof typeof dynamicIconImports;
  title: string;
  description: string;
  url: string;
}

export const CardView = ({ description, icon, title, url }: CardViewProps) => {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      className="border-2 border-solid border-gray-300 rounded-md flex items-center space-x-4 p-4 hover:border-gray-500 cursor-pointer duration-300"
      onClick={() => navigate(url)}
    >
      <DynamicIcon name={icon} size={36} className="text-gray-500" />
      <div>
        <h2 className="font-semibold text-xl">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};
