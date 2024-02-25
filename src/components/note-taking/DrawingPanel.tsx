import { Excalidraw, useHandleLibrary } from "@excalidraw/excalidraw";
import {
  AppState,
  ExcalidrawImperativeAPI,
  PointerDownState as ExcalidrawPointerDownState,
  PointerDownState,
} from "@excalidraw/excalidraw/types/types";
import {
  viewportCoordsToSceneCoords,
  withBatchedUpdates,
  withBatchedUpdatesThrottled,
} from "@excalidraw/excalidraw/types/utils";
import { useState } from "react";

const DrawingPanel = () => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [comment, setComment] = useState<Comment | null>(null);

  const onPointerDown = (
    activeTool: AppState["activeTool"],
    pointerDownState: ExcalidrawPointerDownState
  ) => {
    if (activeTool.type === "custom" && activeTool.customType === "comment") {
      const { x, y } = pointerDownState.origin;
      setComment({ x, y, value: "" });
    }
  };

  const onPointerMoveFromPointerDownHandler = (
    pointerDownState: PointerDownState
  ) => {
    return withBatchedUpdatesThrottled((event) => {
      if (!excalidrawAPI) {
        return false;
      }
      const { x, y } = viewportCoordsToSceneCoords(
        {
          clientX: event.clientX - pointerDownState.hitElementOffsets.x,
          clientY: event.clientY - pointerDownState.hitElementOffsets.y,
        },
        excalidrawAPI.getAppState()
      );
      setCommentIcons({
        ...commentIcons,
        [pointerDownState.hitElement.id!]: {
          ...commentIcons[pointerDownState.hitElement.id!],
          x,
          y,
        },
      });
    });
  };
  const onPointerUpFromPointerDownHandler = (
    pointerDownState: PointerDownState
  ) => {
    return withBatchedUpdates((event) => {
      window.removeEventListener("pointermove", pointerDownState.onMove);
      window.removeEventListener("pointerup", pointerDownState.onUp);
      excalidrawAPI?.setActiveTool({ type: "selection" });
      const distance = distance2D(
        pointerDownState.x,
        pointerDownState.y,
        event.clientX,
        event.clientY
      );
      if (distance === 0) {
        if (!comment) {
          setComment({
            x: pointerDownState.hitElement.x + 60,
            y: pointerDownState.hitElement.y,
            value: pointerDownState.hitElement.value,
            id: pointerDownState.hitElement.id,
          });
        } else {
          setComment(null);
        }
      }
    });
  };

  useHandleLibrary({ excalidrawAPI });

  return (
    <div className="w-full h-full relative bg-secondary">
      <Excalidraw
        excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
        initialData={{
          appState: {
            penMode: true,
            penDetected: true,
          },

          elements: [],
        }}
      />
    </div>
  );
};

export default DrawingPanel;
