import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { ALGORITHMS, MAZES, SPEEDS } from "../utils/constents";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import Select from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlogrithm";
import { useTile } from "../hooks/useTile";
import { useSpeed } from "../hooks/useSpeed";
import PlayButton from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import animatePath from "../utils/animatePath";

export default function Navbar({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
  const {
    grid,
    maze,
    algorithm,
    setAlgorithm,
    setMaze,
    isGraphVisualized,
    setIsGraphVisualized,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleGenerateMaze = async (maze: MazeType) => {
    setMaze(maze);
    resetGrid({ grid });
    if (maze == "NONE") {
      return;
    }
    setIsDisabled(true);
    await runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      speed,
      setIsDisabled,
    });
  };
  const handleRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }
    const { traversedArr, pathArr } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
      speed,
    })!;
    animatePath(traversedArr, pathArr, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;
    return;
  };
  return (
    <div className=" flex items-center justify-center min-h-[4.3rem] border-b shadow-gray-600 sm:px-5 px-0 mb-4 ">
      <div className="flex items-center lg:justify-between justify-center w-full  ">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1 ">
          Pathfinding Visualizer
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-3 sm:py-0 py-4 sm:space-x-4  ">
          <Select
            lable="Maze"
            value={maze}
            options={MAZES}
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
          />
          <Select
            lable="Graph"
            value={algorithm}
            options={ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          />
          <Select
            lable="Speed"
            value={speed}
            options={SPEEDS}
            onChange={(e) => {
              setSpeed(parseFloat(e.target.value) as SpeedType);
            }}
          />
          <PlayButton
            isDisabled={isDisabled}
            handlerRunVisualizer={handleRunVisualizer}
            isGraphVisualized={false}
          />
        </div>
      </div>
    </div>
  );
}
