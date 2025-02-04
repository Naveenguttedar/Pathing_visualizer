import {
  END_TILE_CONFIGURATION,
  MAX_COLS,
  MAX_ROWS,
  START_TILE_CONFIGURATION,
} from "./constents";
import { isEqualTile } from "./helper";
import { GridType, TileType } from "./types";

export const resetGrid = ({
  grid,
  startTile = START_TILE_CONFIGURATION,
  endTile = END_TILE_CONFIGURATION,
}: {
  grid: GridType;
  startTile?: TileType;
  endTile?: TileType;
}) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const tile = grid[row][col];
      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.isWall = false;
      tile.parent = null;

      if (!isEqualTile(tile, startTile) && !isEqualTile(tile, endTile)) {
        const tileElement = document.getElementById(`${tile.row}-${tile.col}`);
        if (tileElement) {
          tileElement.className = "_tile-style";
        }
        if (tile.row == MAX_ROWS - 1) {
          tileElement?.classList.add("border-b");
        }
        if (tile.col == 0) {
          tileElement?.classList.add("border-l");
        }
      }
    }
  }
};
