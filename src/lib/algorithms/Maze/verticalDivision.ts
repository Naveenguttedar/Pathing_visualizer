import { SPEEDS } from "../../../utils/constents";
import { getRandomInt, isEqualTile, sleep } from "../../../utils/helper";
import recursiveDivision, { RecDivisionMazeType } from "./recursiveDivision";

export async function verticalDivision({
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
  const makeWallAt = col + getRandomInt(0, width - 1) * 2 + 1; // Determine the column to place the wall
  const makePassageAt = row + getRandomInt(0, height) * 2; // Determine the row to leave a passage

  for (let i = 0; i < 2 * height - 1; i += 1) {
    // Create the vertical wall
    if (makePassageAt !== row + i) {
      if (
        !isEqualTile(grid[row + i][makeWallAt], startTile) && // Check if the current tile is not the start tile
        !isEqualTile(grid[row + i][makeWallAt], endTile) // Check if the current tile is not the end tile
      ) {
        grid[row + i][makeWallAt].isWall = true; // Set the current tile as a wall

        document.getElementById(`${row + i}-${makeWallAt}`)!.className =
          `_wall-tile-style animate-wall`; // Add wall style and animation
        await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5); // Wait for animation
      }
    }
  }

  // Recursively divide the sections to the left and right of the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width: (makeWallAt - col + 1) / 2,
    setIsDisabled,
    speed,
  });
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col: makeWallAt + 1,
    height,
    width: width - (makeWallAt - col + 1) / 2,
    setIsDisabled,
    speed,
  });
}
