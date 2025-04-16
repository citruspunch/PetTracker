import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPetsPage from "@/features/myPets/pages/MyPetsPage";
import ExploreLostPets from "@/features/exploreLostPets/pages/ExploreLostPetsPage";
import HomePage from "./home";
import Dashboard from "./Dashboard";
import { useState } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { routes } from "./routes";
import ResetPassword from "./auth/ResetPassword";

function App() {
  // TODO - Implement authentication logic
  const [user, setUser] = useState<String | null>(null);

  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.dashboard} element={user ? <Dashboard /> : <Login />} />
        <Route path={routes.signIn} element={<Login />} />
        <Route path={routes.signUp} element={<Signup />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />
        <Route path={routes.myPets} element={<MyPetsPage />} />
        <Route path={routes.exploreLostPets} element={<ExploreLostPets />} />
      </Routes>
    </Router>
  );
}

export default App;
