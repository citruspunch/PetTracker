import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar";
import MyPetsPage from "@/features/myPets/pages/MyPetsPage";
import ExploreLostPets from "@/features/exploreLostPets/pages/ExploreLostPetsPage";
import HomePage from "./home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route path="/explore-lost-pets" element={<ExploreLostPets />} />
      </Routes>
    </Router>
  );
}

export default App;
