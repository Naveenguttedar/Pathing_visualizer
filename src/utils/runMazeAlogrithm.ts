import { getbinaryTreeMaze } from "../lib/algorithms/Maze/binaryTree";
import recursiveDivison from "../lib/algorithms/Maze/recursiveDivision";
import { MAX_COLS, MAX_ROWS } from "./constents";
import { constructBorder } from "./constructBorder";
import { MazeAlgorithmType } from "./types";

export const runMazeAlgorithm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed,
}: MazeAlgorithmType) => {
  if (maze == "BINARY_TREE") {
    await getbinaryTreeMaze(grid, startTile, endTile, speed);
  } else if (maze == "RECURSIVE_DIVISION") {
    await constructBorder(grid, startTile, endTile);
    await recursiveDivison({
      grid,
      startTile,
      endTile,
      row: 1,
      col: 1,
      height: Math.floor((MAX_ROWS - 1) / 2),
      width: Math.floor((MAX_COLS - 1) / 2),
      setIsDisabled,
      speed,
    });
  }
  setIsDisabled(false);
};
