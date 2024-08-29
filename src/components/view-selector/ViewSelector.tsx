import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import TiltCard from "./TiltCard";

export const ViewSelector = () => {
  const navigate = useNavigate();

  return (
    <div
      key="view-selector"
      className="h-full w-full flex items-center justify-center bg-secondary text-primary"
    >
      <div className="flex space-x-4 items-center w-11/12">
        <div className="text-5xl font-bold space-y-4">
          Create your own ERD in a
          <span className="text-brand"> FLASH</span>
          <Button
            onClick={() => navigate("text-diagram")}
            variant="brand"
            className={{
              button: "!w-fit !p-4 !text-xl !font-bold",
            }}
          >
            Try It Now!
          </Button>
        </div>

        <TiltCard />
      </div>
    </div>
  );
};
