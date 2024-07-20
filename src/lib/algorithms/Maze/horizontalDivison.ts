import { SPEEDS } from "../../../utils/constents";
import { getRandomInt, isEqualTile, sleep } from "../../../utils/helper";
import recursiveDivision, { RecDivisionMazeType } from "./recursiveDivision";

export async function horizontalDivision({
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
  const makeWallAt = row + getRandomInt(0, height - 1) * 2 + 1; // Determine the row to place the wall
  const makePassageAt = col + getRandomInt(0, width) * 2; // Determine the column to leave a passage

  for (let i = 0; i < 2 * width - 1; i += 1) {
    // Create the horizontal wall
    if (makePassageAt !== col + i) {
      if (
        !isEqualTile(grid[makeWallAt][col + i], startTile) && // Check if the current tile is not the start tile
        !isEqualTile(grid[makeWallAt][col + i], endTile) // Check if the current tile is not the end tile
      ) {
        grid[makeWallAt][col + i].isWall = true; // Set the current tile as a wall

        document.getElementById(`${makeWallAt}-${col + i}`)!.className =
          `_wall-tile-style animate-wall`; // Add wall style and animation
        await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5); // Wait for animation
      }
    }
  }

  // Recursively divide the sections above and below the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height: (makeWallAt - row + 1) / 2,
    width,
    setIsDisabled,
    speed,
  });
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row: makeWallAt + 1,
    col,
    height: height - (makeWallAt - row + 1) / 2,
    width,
    setIsDisabled,
    speed,
  });
}
