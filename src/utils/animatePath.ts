import { SLEEP, SPEEDS } from "./constents";
import { getTileElement, isEqualTile } from "./helper";
import { SpeedType, TileType } from "./types";
export default function animatePath(
  traversedTiles: TileType[],
  pathTiles: TileType[],
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType,
) {
  for (let i = 0; i < traversedTiles.length; i++) {
    const tile = traversedTiles[i];
    setTimeout(
      () => {
        if (!isEqualTile(startTile, tile) && !isEqualTile(tile, endTile)) {
          getTileElement(tile.row, tile.col)!.className =
            "_traversed-tile-style animate-traversed";
        }
      },
      SLEEP * i * SPEEDS.find((s) => s.value === speed)!.value,
    );
  }
  for (let i = 0; i < pathTiles.length; i++) {
    const tile = pathTiles[i];
    setTimeout(
      () => {
        if (!isEqualTile(startTile, tile) && !isEqualTile(tile, endTile)) {
          getTileElement(tile.row, tile.col)!.className =
            "_path-tile-style animate-path";
        }
      },
      SLEEP *
        (i + traversedTiles.length) *
        SPEEDS.find((s) => s.value === speed)!.value,
    );
  }
}
