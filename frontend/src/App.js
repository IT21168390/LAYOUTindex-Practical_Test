import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bar from "./components/Bar";
import Devices from "./components/Devices";
import Locations from "./components/Locations";
import SingleLocation from "./components/SingleLocation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Bar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Devices />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/view/:id" element={<SingleLocation />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;