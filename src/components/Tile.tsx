import { twMerge } from "tailwind-merge";
import { MAX_ROWS } from "../utils/constents";
import { TileType } from "../utils/types";
import { useEffect, useRef } from "react";

export function Tile({ _tile }: { _tile: TileType }) {
  let TILESTYLE;
  if (_tile.isStart) {
    TILESTYLE = "_start-tile-style";
  } else if (_tile.isEnd) {
    TILESTYLE = "_end-tile-style";
  } else if (_tile.isWall) {
    TILESTYLE = "_wall-tile-style animate-wall";
  } else if (_tile.isPath) {
    TILESTYLE = "_path-tile-style";
  } else if (_tile.isTraversed) {
    TILESTYLE = "_traversed-tile-style";
  } else TILESTYLE = "_tile-style";
  const borderStyle =
    _tile.row === MAX_ROWS - 1 ? "border-b" : _tile.col === 0 ? "border-l" : "";
  const edgeStyle =
    _tile.row === MAX_ROWS - 1 && _tile.col === 0 ? "border-l" : "";

  const reRenderCount = useRef(1);
  useEffect(() => {
    reRenderCount.current += 1;
    console.log(reRenderCount.current);
  });
  return (
    <div
      className={twMerge(TILESTYLE, borderStyle, edgeStyle)}
      id={`${_tile.row}-${_tile.col}`}
      data-row={_tile.row}
      data-col={_tile.col}
    ></div>
  );
}
