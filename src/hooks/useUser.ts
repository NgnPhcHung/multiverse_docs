import { checkValidJSONString } from "@utils";
import { useEffect, useState } from "react";

interface UserSettings {
  diagramRoom: string;
  drawRoom: string;
}

export const useUser = () => {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    diagramRoom: "default-diagram-editor-room",
    drawRoom: "default-drawing-room",
  });

  useEffect(() => {
    const settings = localStorage.getItem("userSettings");
    const settingsObj: UserSettings = checkValidJSONString(settings ?? "")
      ? JSON.parse(settings ?? "")
      : {};

    setUserSettings({
      diagramRoom: settingsObj.diagramRoom || "default-diagram-editor-room",
      drawRoom: settingsObj.drawRoom || "default-drawing-room",
    });
  }, []);

  return { userSettings, setUserSettings };
};
