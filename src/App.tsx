import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPetsPage from "@/features/myPets/pages/MyPetsPage";
import ExploreLostPets from "@/features/exploreLostPets/pages/ExploreLostPetsPage";
import HomePage from "./home";
import Dashboard from "./Dashboard";
import { useState } from "react";
import Login from "./Login";

function App() {
  const [user, setUser] = useState<String | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route path="/explore-lost-pets" element={<ExploreLostPets />} />
      </Routes>
    </Router>
  );
}

export default App;
