/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from "antd";
import Logo from "assets/logo.svg?react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToggleTheme } from ".";

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = useMemo(() => {
    return window.location.pathname.split("/").filter((path) => path !== "");
  }, [location]);

  return (
    <div className="bg-secondaryHover flex items-center justify-between px-4">
      <div className="flex items-center justify-center space-x-2 text-primary">
        <Tooltip placement="bottomRight" title="Home">
          <Link to="/">
            <Logo />
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
      <ToggleTheme />
    </div>
  );
};
