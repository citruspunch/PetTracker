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
        <Route path={routes.dashboard} element={!user ? <Dashboard heading={"Panel de Control"} feature1={feature1} feature2={feature2} feature3={feature3} feature4={feature4} /> : <Login />} />
        <Route path={routes.signIn} element={<Login />} />
        <Route path={routes.signUp} element={<Signup />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />
        <Route path={routes.myPets} element={<MyPetsPage />} />
        <Route path={routes.exploreLostPets} element={<ExploreLostPets />} />
      </Routes>
    </Router>
  );
}

const feature1 = {
    title: "Resumen general",
    description:
        "Consulta el estado actual de tus mascotas registradas. Aquí verás cuántas están activas, si alguna ha sido reportada como perdida, y el estado de tus placas NFC.",
    image: "src/assets/Resumen.png",
}

const feature2 = {
  title: "Estadísticas rápidas",
  description:
      "Visualiza datos clave como escaneos recientes, mascotas recuperadas y actividad mensual. Obtén una idea clara del movimiento en tu cuenta y del impacto de PetTracker.",
  image: "src/assets/Estadisticas.png",
}

const feature3 = {
  title: "Tus Puntos",
  description:
      "Gana puntos por registrar mascotas, mantener actualizados sus perfiles o ayudar a otros usuarios a encontrar mascotas. Acumúlalos y canjéalos próximamente por recompensas o beneficios exclusivos.",
  image: "src/assets/Puntos.png",
}

const feature4 = {
  title: "Comunidad",
  description:
      "Conoce historias de reencuentros, ayuda a otros usuarios reportando mascotas encontradas en tu zona y forma parte de una red que protege a los que no pueden hablar.",
  image: "src/assets/Comunidad.png",
}

export default App;
