import { MAX_COLS, MAX_ROWS, SLEEP } from "./constents";
import { getTileElement, isEqualTile, sleep } from "./helper";
import { GridType, TileType } from "./types";

export const constructBorder = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  let row = 0,
    col = 0;
  const shape = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: -1, col: 0 },
  ];
  for (let i = 0; i < 4; i++) {
    const direction = shape[i];
    while (
      row + direction.row >= 0 &&
      row + direction.row < MAX_ROWS &&
      col + direction.col >= 0 &&
      col + direction.col < MAX_COLS
    ) {
      row += direction.row;
      col += direction.col;
      if (
        !isEqualTile(grid[row][col], startTile) &&
        !isEqualTile(grid[row][col], endTile)
      ) {
        grid[row][col].isWall = true;
        getTileElement(row, col)!.classList.add(
          "_wall-tile-style",
          "animate-wall",
        );
        await sleep(SLEEP);
      }
    }
    // if (row < 0) row = 0;
    // if (row >= MAX_ROWS) row = MAX_ROWS - 1;
    // if (col < 0) col = 0;
    // if (col >= MAX_COLS) col = MAX_COLS - 1;
  }
};
