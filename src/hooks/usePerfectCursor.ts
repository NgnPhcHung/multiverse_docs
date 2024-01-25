import * as React from "react";
import { PerfectCursor } from "perfect-cursors";

interface UsePerfectCursorOptions {
  cb: (points: number[]) => void;
  points?: number[];
}

export function usePerfectCursor({ cb, points }: UsePerfectCursorOptions) {
  const [pc] = React.useState(() => new PerfectCursor(cb));

  React.useLayoutEffect(() => {
    if (points?.length) pc.addPoint(points);
    return () => pc.dispose();
  }, [pc, points]);
  
  const onPointChange = React.useCallback(
    (points: number[]) => pc.addPoint(points),
    [pc]
  );

  return onPointChange;
}
