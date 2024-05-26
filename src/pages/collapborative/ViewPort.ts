import { ElementRef } from "react";

export class ViewPort {
  private canvas: ElementRef<"canvas">;
  ctx: CanvasRenderingContext2D | null;
  drag: { start: any; end: any; offset: any; active: boolean };

  constructor(canvas: ElementRef<"canvas">) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };

    this.addEventListeners();
  }

  private addEventListeners() {}
  private getMouse() {
    this.canvas
  }
}
