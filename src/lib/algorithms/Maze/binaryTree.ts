import { createWall } from "../../../utils/createWall";
import { getRandomDirection, isEqualTile, sleep } from "../../../utils/helper";
import { GridType, SpeedType, TileType } from "../../../utils/types";
import { MAX_COLS, MAX_ROWS } from "../../../utils/constents";
import { distroyWall } from "../../../utils/distroyWall";

export const getbinaryTreeMaze = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType,
) => {
  createWall(startTile, endTile, speed);
  await sleep(MAX_ROWS * MAX_COLS);
  for (const ele of grid) {
    for (const tile of ele) {
      if (tile.row % 2 === 0 || tile.col % 2 === 0) {
        if (!isEqualTile(tile, startTile) && !isEqualTile(tile, endTile)) {
          tile.isWall = true;
        }
      } else {
        if (
          tile.isWall &&
          !isEqualTile(tile, startTile) &&
          !isEqualTile(tile, endTile)
        ) {
          tile.isWall = false;
          distroyWall(grid, tile.row, tile.col, "NONE", speed);
        }
      }
    }
  }
  for (let row = 1; row < MAX_ROWS; row += 2) {
    for (let col = 1; col < MAX_COLS; col += 2) {
      if (row == MAX_ROWS - 2 && col == MAX_COLS - 2) continue;
      else if (row == MAX_ROWS - 2) {
        await distroyWall(grid, row, col, "RIGHT", speed);
      } else if (col == MAX_COLS - 2) {
        await distroyWall(grid, row, col, "BOTTOM", speed);
      } else {
        await distroyWall(grid, row, col, getRandomDirection(), speed);
      }
    }
  }
};
