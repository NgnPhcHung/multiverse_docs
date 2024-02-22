import { Breadcrumb } from "antd";
import { HomeIcon } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToggleTheme } from ".";

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = useMemo(() => {
    return window.location.pathname.split("/").filter((path) => path !== "");
  }, [location]);

  return paths.length ? (
    <div className="bg-secondaryHover flex items-center justify-between pr-4">
      <Breadcrumb
        className="p-2 "
        separator={<span className="text-primaryHover">/</span>}
      >
        <Breadcrumb.Item className="text-primaryHover">
          <Link to="/">
            <HomeIcon className="w-4 h-4 mt-1 text-primaryHover" />
          </Link>
        </Breadcrumb.Item>
        {paths.map((path, index) => (
          <Breadcrumb.Item className="flex items-center space-x-2" key={path}>
            <Link to={`/${paths.slice(0, index + 1).join("/")}`} key={path}>
              <span className="text-primary"> {path}</span>
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <ToggleTheme />
    </div>
  ) : (
    <div className="w-full flex items-end justify-end">
      <ToggleTheme />
    </div>
  );
};
