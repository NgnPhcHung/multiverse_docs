import { HomeIcon } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToggleTheme } from ".";
import { Tooltip } from "antd";

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = useMemo(() => {
    return window.location.pathname.split("/").filter((path) => path !== "");
  }, [location]);

  return (
    <div className="bg-secondaryHover flex items-center justify-between px-4 py-2">
      {window.location.pathname !== "/" ? (
        <div className="flex items-center justify-center space-x-2 text-primary">
          <Tooltip placement="bottomRight" title="Home">
            <Link to="/">
              <HomeIcon className="w-4 h-4 mt-1 text-primaryHover" />
            </Link>
          </Tooltip>
          {paths.map((path, index) => {
            const pathTitle = path.split("-").join(" ");
            return (
              <div key={path} className="flex space-x-2">
                <span>/</span>
                <Link
                  to={`/${paths.slice(0, index + 1).join("/")}`}
                  key={path}
                  className="capitalize "
                >
                  {pathTitle}
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div />
      )}
      <ToggleTheme />
    </div>
  );
};
