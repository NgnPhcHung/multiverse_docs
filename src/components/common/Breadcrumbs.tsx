import { Breadcrumb } from "antd";
import { HomeIcon } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = useMemo(() => {
    return window.location.pathname.split("/").filter((path) => path !== "");
  }, [location]);

  return (
    !!paths.length && (
      <Breadcrumb
        className="p-2 bg-secondaryHover"
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
    )
  );
};
