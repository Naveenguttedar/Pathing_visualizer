import { SPEEDS } from "./constents";
import { getTileElement, sleep } from "./helper";
import { Direction, GridType, SpeedType } from "./types";

export const distroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  direction: Direction,
  speed: SpeedType,
) => {
  const distroyTile = async (row: number, col: number) => {
    getTileElement(row, col)!.className = "_tile-style animate-wall";
    await sleep(20 * SPEEDS.find((s) => s.value == speed)!.value - 5);
  };
  if (direction == "RIGHT" && grid[row][col + 1]) {
    grid[row][col + 1].isWall = false;
    await distroyTile(row, col + 1);
  } else if (direction == "BOTTOM" && grid[row + 1]) {
    grid[row + 1][col].isWall = false;
    await distroyTile(row + 1, col);
  } else {
    grid[row][col].isWall = false;
    await distroyTile(row, col);
  }
};
