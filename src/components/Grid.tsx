import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_ROWS } from "../utils/constents";
import { Tile } from "./Tile";
import { MutableRefObject, useEffect, useRef } from "react";
import {
  checkIfStartOrEnd,
  addWallTile,
  mouseEventWrapper,
} from "../utils/helper";
import { TileType } from "../utils/types";

export function Grid({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
  const { grid, setGrid } = usePathfinding();
  console.log(grid);
  const isMouseDown = useRef(false);
  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }
    isMouseDown.current = true;
    const newGrid = addWallTile(grid, row, col);
    setGrid(newGrid);
  };
  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }
    isMouseDown.current = false;
  };
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isVisualizationRunningRef.current || !isMouseDown.current) {
      return;
    }
    const target = event.target as HTMLElement;
    const [row, col] = target.id.split("-").map(Number);
    if (!checkIfStartOrEnd(row, col)) {
      const newGrid = addWallTile(grid, row, col);
      setGrid(newGrid);
    }
  };
  const reRenderCount = useRef(1);
  useEffect(() => {
    reRenderCount.current += 1;
    console.log(reRenderCount.current);
  }, [grid]);
  return (
    <div
      className={twMerge(
        //base classes for structure of grid
        "flex items-center flex-col justify-center ",
        //Setting Grid height for responsivness
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
        //Setting Grid width for responsivness
        `lg:w-[${MAX_ROWS * 17}px] md:w-[${MAX_ROWS * 15}px] xs:w-[${MAX_ROWS * 8}px] w-[${MAX_ROWS * 7}px]`,
      )}
    >
      <div
        onMouseDown={(e) => mouseEventWrapper(e, handleMouseDown)}
        onMouseUp={(e) => mouseEventWrapper(e, handleMouseUp)}
        onMouseOver={handleMouseOver}
      >
        {grid.map((row: TileType[], rowIndex: number) => (
          <div key={rowIndex} className="flex ">
            {row.map((tile: TileType, tileIndex) => {
              return <Tile key={tileIndex} _tile={tile} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
