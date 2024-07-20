import { useContext } from "react";
import { Pathfindingcontext } from "../context/pathfindingcontext";

export const usePathfinding = () => {
  const context = useContext(Pathfindingcontext);
  if (!context) {
    throw new Error(
      "usePathfinding must be used within the PathfindingProvider",
    );
  }
  return context;
};
