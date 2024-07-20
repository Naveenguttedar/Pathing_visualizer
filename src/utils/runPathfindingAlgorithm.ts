import bfs from "../lib/algorithms/Pathfinding/bfs";
import dfs from "../lib/algorithms/Pathfinding/dfs";
import { PathAlgorithmType } from "./types";

export function runPathfindingAlgorithm({
  algorithm,
  grid,
  startTile,
  endTile,
}: PathAlgorithmType) {
  switch (algorithm) {
    case "BFS": {
      return bfs(grid, startTile, endTile);
    }
    case "DFS": {
      return dfs(grid, startTile, endTile);
    }
    default: {
      return bfs(grid, startTile, endTile);
    }
  }
}
