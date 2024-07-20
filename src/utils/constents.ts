import { AlgorithmType, SpeedType, TileType } from "./types";

export const MAX_ROWS = 35;
export const MAX_COLS = 45;
export const START_TILE_CONFIGURATION: TileType = {
  row: 1,
  col: 1,
  isEnd: false,
  isPath: false,
  isStart: false,
  isWall: false,
  isTraversed: false,
  parent: null,
  distance: 0,
};
export const END_TILE_CONFIGURATION: TileType = {
  ...START_TILE_CONFIGURATION,
  row: MAX_ROWS - 2,
  col: MAX_COLS - 2,
};

export const MAZES: { name: string; value: string }[] = [
  { name: "No Maze", value: "NONE" },
  { name: "Binary Tree", value: "BINARY_TREE" },
  { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];
export const SPEEDS: { name: string; value: SpeedType }[] = [
  { name: "Slow", value: 2 },
  { name: "Medium", value: 1 },
  { name: "Fast", value: 0.5 },
];
export const ALGORITHMS: { name: string; value: AlgorithmType }[] = [
  { name: "Dijkstra ", value: "DIJKSTRA" },
  { name: "A-Start", value: "A_STAR" },
  { name: "Dept Frist Search ", value: "DFS" },
  { name: "Bredth Frist Search ", value: "BFS" },
];
export const SLEEP = 8;
