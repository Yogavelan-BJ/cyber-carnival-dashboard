import { AppProvider } from "./context";
import Event from "./Event";
import Home from "./Home";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
