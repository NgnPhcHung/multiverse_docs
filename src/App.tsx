import { Cursors } from "components";
import { USER_COLORS } from "consts";
import { awareness } from "providers";

export const color =
  USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];

awareness.setLocalState({ color });

const App = () => {
  return <div className=" w-screen h-screen fixed">
    
    <Cursors />
  </div>;
};

export default App;
