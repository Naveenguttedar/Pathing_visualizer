import { MouseEvent } from "react";
import { MAX_COLS, MAX_ROWS } from "./constents";
import { Direction, GridType, TileType } from "./types";

export const createRow = (
  row: number,
  startTile: TileType,
  endTile: TileType,
) => {
  const currentRow: TileType[] = [];
  for (let col = 0; col < MAX_COLS; col++) {
    const tile: TileType = {
      row,
      col,
      isEnd: row === endTile.row && col === endTile.col,
      isStart: row === startTile.row && col === startTile.col,
      isPath: false,
      isWall: false,
      isTraversed: false,
      distance: Infinity,
      parent: null,
    };
    currentRow.push(tile);
  }
  return currentRow;
};
export const createGrid = (startTile: TileType, endTile: TileType) => {
  const grid: GridType = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, startTile, endTile));
  }
  return grid;
};
export const checkIfStartOrEnd = (row: number, col: number) => {
  return (row == 1 && col == 1) || (row == MAX_ROWS - 2 && col == MAX_COLS - 2);
};

export const mouseEventWrapper = (
  event: MouseEvent,
  handler: (row: number, col: number) => void,
) => {
  const element = event.target as HTMLElement;
  const row: number = Number(element?.getAttribute("data-row"));
  const col: number = Number(element?.getAttribute("data-col"));

  handler(row, col);
};

export const addWallTile = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall,
  };
  newGrid[row][col] = newTile;
  return newGrid;
};

export const createNewGrid = (grid: GridType) => {
  const newGrid: TileType[][] = [...grid];
  return newGrid;
};

export const isEqualTile = (tile1: TileType, tile2: TileType) => {
  return tile1.row == tile2.row && tile1.col == tile2.col;
};

export const isRowColEqualTile = (row: number, col: number, tile: TileType) => {
  return row == tile.row && col == tile.col;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
const direactions: Direction[] = ["RIGHT", "BOTTOM"];
export const getRandomDirection = () => {
  return direactions[getRandomInt(0, direactions.length)];
};
export const getTileElement = (row: number, col: number) => {
  return document.getElementById(`${row}-${col}`);
};

export const Shape = [
  { row: 0, col: -1 },
  { row: -1, col: 0 },
  { row: 0, col: 1 },
  { row: 1, col: 0 },
];
