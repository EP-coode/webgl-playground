export function resizeToCaontainerSize(canvas: HTMLCanvasElement) {
  const boundingRect = canvas.getBoundingClientRect();
  canvas.width = boundingRect.width;
  canvas.height = boundingRect.height;
}