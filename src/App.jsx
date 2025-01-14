import { AppProvider } from "./context";
import Event from "./Event";
import Header from "./Header";
import Home from "./Home";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
