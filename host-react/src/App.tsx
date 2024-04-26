import { Suspense, lazy } from "react";
import { geojson } from "./volcanoes";
// @ts-expect-error: Cannot find module 'remoteApp/Button'
const SimpleMap = lazy(() => import("shein/simple-map"));

function App() {
  return (
    <div className="w-screen h-screen p-6">
      <h1 className="text-2xl mb-6 select-none">
        Host Application with Volcano Data
      </h1>
      <div className="h-[calc(100vh-104px)]">
        <Suspense fallback={<div>Loading...</div>}>
          <SimpleMap geojson={geojson} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
