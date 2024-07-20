export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export type TileType = {
  row: number;
  col: number;
  isEnd: boolean;
  isStart: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number | undefined;
  parent: TileType | null;
};

export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;
export type Direction = "RIGHT" | "BOTTOM" | "NONE";

export interface MazeAlgorithmType {
  maze?: MazeType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  speed: SpeedType;
  setIsDisabled: (isDisabled: boolean) => void;
}
export interface PathAlgorithmType {
  algorithm: AlgorithmType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  speed: SpeedType;
}
