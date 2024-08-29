import { Button } from "@src/components/common";
import { DBTypes } from "@src/consts";
import { Dropdown, DropdownProps, MenuProps } from "antd";
import { useState } from "react";
import { SQLPreviewModal } from "./SQLPreviewModal";

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
    setOpen(false);
  };
  return (
    <>
      <Dropdown
        menu={{
          items: [{ label: DBTypes.MYSQL, key: DBTypes.MYSQL }],
          onClick,
        }}
        placement="bottomLeft"
        arrow
        onOpenChange={handleOpenChange}
        open={open}
        trigger={["click"]}
      >
        <div>
          <Button onClick={() => setOpen(!open)} variant="secondary">
            Export
          </Button>
        </div>
      </Dropdown>
      <SQLPreviewModal
        dbType={selectedDB}
        onClose={() => setSelectedDB(undefined)}
      />
    </>
  );
};
