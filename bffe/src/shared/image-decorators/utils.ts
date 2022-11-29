export function normalizeShape({
  height,
  width,
  maximumHeight,
  maximumWidth,
}: {
  width: number;
  height: number;
  maximumWidth: number;
  maximumHeight: number;
}): {
  width: number;
  height: number;
} {
  if (width > height) {
    return { width: maximumWidth, height: maximumWidth * (height / width) };
  }
  return { height: maximumHeight, width: maximumHeight * (width / height) };
}

export function centerInSpace({
  image,
  space,
}: {
  space: { width: number; height: number };
  image: { width: number; height: number };
}): { x: number; y: number } {
  return {
    x: (space.width - image.width) / 2,
    y: (space.height - image.height) / 2,
  };
}
