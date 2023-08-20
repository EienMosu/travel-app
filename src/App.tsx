import { TravelDataProvider } from "./context/TravelContext";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <TravelDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </TravelDataProvider>
  );
};

export default App;
