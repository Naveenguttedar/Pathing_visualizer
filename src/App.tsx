import { useRef } from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import { PathFindingProvider } from "./context/pathfindingcontext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import "./index.css";
import Navbar from "./components/Navbar";
function App() {
  const isVisualizationRunningRef = useRef(false);
  return (
    <>
      <PathFindingProvider>
        <TileProvider>
          <SpeedProvider>
            <div className=" h-screen w-screen flex-col bg-black text-white ">
              <Navbar isVisualizationRunningRef={isVisualizationRunningRef} />
              <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
            </div>
          </SpeedProvider>
        </TileProvider>
      </PathFindingProvider>
    </>
  );
}

export default App;
