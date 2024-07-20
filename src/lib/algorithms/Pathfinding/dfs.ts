import { isEqualTile } from "../../../utils/helper";
import { GridType, TileType } from "../../../utils/types";
import { getNeighbors } from "./bfs";

export default function dfs(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) {
  startTile.distance = 0;
  const Stack = [startTile];
  const traversedArr: TileType[] = [];
  while (Stack.length > 0) {
    const tile = Stack.pop();
    if (tile) {
      if (tile.isWall) continue;
      if (tile.distance === Infinity) break;
      tile.isTraversed = true;
      traversedArr.push(tile);
      if (isEqualTile(tile, endTile)) {
        endTile.parent = tile;
        break;
      }
      const neighbors = getNeighbors(grid, tile);
      for (const nTile of neighbors) {
        if (!nTile.isTraversed && nTile.distance === Infinity) {
          nTile.distance = tile.distance! + 1;
          nTile.parent = tile;
          Stack.push(nTile);
        }
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
