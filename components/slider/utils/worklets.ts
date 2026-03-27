const THUMB_SIZE = 24;

const getNewPosition = (
  trackLength: number,
  trackStartX: number,
  absoluteX: number,
) => {
  "worklet";
  return Math.max(
    0,
    Math.min(trackLength - THUMB_SIZE, absoluteX - trackStartX),
  );
};

const getSteppedValue = (
  positionX: number,
  trackLength: number,
  minVal: number,
  maxVal: number,
  increments: number,
) => {
  "worklet";
  const percentage = positionX / (trackLength - THUMB_SIZE);
  const newValue = minVal + percentage * (maxVal - minVal);
  return Math.round(newValue / increments) * increments;
};

const valueToPosition = (
  value: number,
  trackLength: number,
  min: number,
  max: number,
): number => {
  "worklet";
  return ((value - min) / (max - min)) * (trackLength - THUMB_SIZE);
};

export { getNewPosition, getSteppedValue, valueToPosition };
