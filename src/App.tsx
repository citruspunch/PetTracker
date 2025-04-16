import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPetsPage from "@/features/myPets/pages/MyPetsPage";
import ExploreLostPets from "@/features/exploreLostPets/pages/ExploreLostPetsPage";
import HomePage from "./home";
import Dashboard from "./Dashboard";
import { useState } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  // TODO - Implement authentication logic
  const [user, setUser] = useState<String | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route path="/explore-lost-pets" element={<ExploreLostPets />} />
      </Routes>
    </Router>
  );
}

export default App;
