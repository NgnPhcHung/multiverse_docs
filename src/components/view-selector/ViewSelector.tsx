import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import TiltCard from "./TiltCard";

export const ViewSelector = () => {
  const navigate = useNavigate();

  return (
    <div
      key="view-selector"
      className="h-full w-full bg-secondary text-primary lg:p-8 p-4"
    >
      <div className="flex flex-col lg:flex-row space-x-4 justify-center items-center h-full space-y-2">
        <div className="text-4xl lg:!text-5xl font-bold space-y-4 w-11/12 ">
          Create your own ERD in a
          <span className="text-brand"> FLASH</span>
          <Button
            onClick={() => navigate("text-diagram")}
            variant="brand"
            className={{
              button: "!w-fit !p-2 lg:!p-4 !text-xl !font-bold",
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
