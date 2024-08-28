import { EntityProperty } from "@src/interfaces";

interface RowTooltipProps {
  data?: EntityProperty;
}

export const RowTooltip = ({ data }: RowTooltipProps) => {
  return (
    <div className="min-w-64 max-w-80 rounded-md divide-y-1 divide-solid divide-primaryHover">
      <div className="w-full border-0 font-bold break-words py-2">
        {data?.name}
      </div>
      <div className="py-2">
        <p className="uppercase text-orange-500">{data?.dataType}</p>
        <p className=" ">{data?.constrains}</p>
      </div>
      <div className="py-2">
        {data?.comment ? (
          <p className=" ">{data.comment}</p>
        ) : (
          <p className="text-primaryHover">No any comment here</p>
        )}
      </div>
    </div>
  );
};
