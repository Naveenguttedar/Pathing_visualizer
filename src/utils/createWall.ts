import { MAX_COLS, MAX_ROWS, SPEEDS } from "./constents";
import { getTileElement, isRowColEqualTile } from "./helper";
import { SpeedType, TileType } from "./types";

export const createWall = (
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType,
) => {
  const deley = 6 * SPEEDS.find((s) => s.value === speed)!.value - 1;
  console.log(deley);
  for (let row = 0; row < MAX_ROWS; row++) {
    setTimeout(
      () => {
        for (let col = 0; col < MAX_COLS; col++) {
          if (row % 2 == 0 || col % 2 == 0) {
            if (
              !isRowColEqualTile(row, col, startTile) &&
              !isRowColEqualTile(row, col, endTile)
            ) {
              setTimeout(() => {
                getTileElement(row, col)!.className =
                  "_wall-tile-style animate-wall ";
              }, deley * col);
            }
          }
        }
      },
      deley * (MAX_ROWS / 2) * row,
    );
  }
};
