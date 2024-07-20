import { MAX_COLS, MAX_ROWS } from "../../../utils/constents";
import { isEqualTile, Shape } from "../../../utils/helper";
import { GridType, TileType } from "../../../utils/types";
export function getNeighbors(grid: GridType, tile: TileType) {
  const { row, col } = tile;
  const neighbors: TileType[] = [];
  for (const move of Shape) {
    const [mRow, mCol] = [move.row + row, move.col + col];
    if (
      mRow >= 0 &&
      mRow <= MAX_ROWS - 1 &&
      mCol >= 0 &&
      mCol <= MAX_COLS - 1
    ) {
      if (!grid[mRow][mCol].isTraversed && !grid[mRow][mCol].isWall)
        neighbors.push(grid[mRow][mCol]);
    }
  }
  return neighbors;
}
export default function bfs(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) {
  const queue: TileType[] = [startTile];
  startTile.distance = 0;
  const traversedArr = [];
  while (queue.length >= 1) {
    const tile = queue.shift() as TileType;
    if (isEqualTile(endTile, tile)) {
      endTile.parent = tile;
      break;
    }
    if (tile.distance === Infinity) break;
    tile.isTraversed = true;
    traversedArr.push(tile);
    const neighbors = getNeighbors(grid, tile);
    for (const nTile of neighbors) {
      if (!nTile.isTraversed && nTile.distance === Infinity) {
        nTile.distance = tile.distance! + 1;
        nTile.parent = tile;
        queue.push(nTile);
      }
    }
  }
  const pathArr = [];
  let tile: TileType | null = endTile;
  while (tile != null) {
    pathArr.unshift(tile);
    tile.isPath = true;
    tile = tile.parent;
  }
  return { traversedArr, pathArr };
}
