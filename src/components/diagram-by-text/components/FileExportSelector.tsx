import { Button } from "@src/components/common";
import { DBTypes } from "@src/consts";
import { Dropdown, DropdownProps, MenuProps } from "antd";
import { useState } from "react";
import { SQLPreviewModal } from "./SQLPreviewModal";

const items: MenuProps["items"] = Object.values(DBTypes).map(
  (value) => ({
    key: value,
    label: value,
  })
);

export const FileExportSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedDB, setSelectedDB] = useState<DBTypes>();

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setSelectedDB(key as DBTypes);
    setOpen(false)
  };
  return (
    <>
      <Dropdown
        menu={{ items, onClick }}
        placement="bottomLeft"
        arrow
        onOpenChange={handleOpenChange}
        open={open}
        trigger={["click"]}
      >
        <Button onClick={() => setOpen(!open)}>Export</Button>
      </Dropdown>
      <SQLPreviewModal
        dbType={selectedDB}
        onClose={() => setSelectedDB(undefined)}
      />
    </>
  );
};
