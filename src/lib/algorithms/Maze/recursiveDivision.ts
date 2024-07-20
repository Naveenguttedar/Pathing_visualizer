import { getRandomInt } from "../../../utils/helper";
import { MazeAlgorithmType } from "../../../utils/types";
import { horizontalDivision } from "./horizontalDivison";
import { verticalDivision } from "./verticalDivision";

export interface RecDivisionMazeType extends MazeAlgorithmType {
  row: number;
  col: number;
  height: number;
  width: number;
}
function chooseOrientation(width: number, height: number) {
  if (width < height) return "HORIZONTAL";
  else if (height < width) return "VERTICAL";
  else {
    const flag = getRandomInt(0, 2);
    return flag ? "HORIZONTAL" : "VERTICAL";
  }
}
export default async function recursiveDivision({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  setIsDisabled,
  speed,
}: RecDivisionMazeType) {
  if (width <= 1 || height <= 1) return; // Base case: stop recursion if the section is too small
  const direction = chooseOrientation(width, height);
  if (direction === "HORIZONTAL") {
    await horizontalDivision({
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      setIsDisabled,
      speed,
    });
  } else {
    await verticalDivision({
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      setIsDisabled,
      speed,
    });
  }
}
