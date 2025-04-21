import ExploreLostPets from '@/features/exploreLostPets/pages/ExploreLostPetsPage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './auth/Login'
import ResetPassword from './auth/ResetPassword'
import Signup from './auth/Signup'
import Dashboard from './Dashboard'
import LostPetDetails from './features/exploreLostPets/pages/LostPetDetailsView'
import MyPetsView from './features/myPets/pages/MyPetsView'
import PetDetailsView from './features/myPets/pages/PetDetailsView'
import ReportLostPetView from './features/reportLostPets/pages/ReportLostPetForm'
import ReportLostPetPage from './features/reportLostPets/pages/ReportLostPetPage'
import HomePage from './home'
import useUser from './hooks/useUser'
import { routes } from './routes'
import ReportFoundPetView from './features/reportFoundPets/pages/ReportFoundPetView'
import EditPetDetailsView from './features/myPets/pages/EditPetDetailsView'

function App() {
  const user = useUser()

  return (
    <Router>
      <Routes>
        <Route
          path={routes.home}
          element={
            user ? (
              <Dashboard
                heading={'Panel de Control'}
                feature1={feature1}
                feature2={feature2}
                feature3={feature3}
                feature4={feature4}
              />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path={routes.dashboard}
          element={
            user ? (
              <Dashboard
                heading={'Panel de Control'}
                feature1={feature1}
                feature2={feature2}
                feature3={feature3}
                feature4={feature4}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path={routes.logIn} element={<Login />} />
        <Route path={routes.signUp} element={<Signup />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />
        <Route path={routes.myPets} element={<MyPetsView />} />
        <Route path={routes.exploreLostPets} element={<ExploreLostPets />} />
        <Route path={routes.LostPetDetails} element={<LostPetDetails />} />
        <Route
          path={`${routes.petDetails}/:petId`}
          element={<PetDetailsView />}
        />
        <Route path={routes.reportLostPet} element={<ReportLostPetPage />} />
        <Route path={routes.reportFoundPet} element={<ReportFoundPetView />} />
        <Route
          path={`${routes.reportLostPet}/:petId`}
          element={<ReportLostPetView />}
        />
        <Route path={`${routes.editPet}/:petId`} element={<EditPetDetailsView  />} />
      </Routes>
    </Router>
  )
}

const feature1 = {
  title: 'Resumen general',
  description:
    'Consulta el estado actual de tus mascotas registradas. Aquí verás cuántas están activas, si alguna ha sido reportada como perdida, y el estado de tus placas NFC.',
  image: 'src/assets/Resumen.png',
}

const feature2 = {
  title: 'Estadísticas rápidas',
  description:
    'Visualiza datos clave como escaneos recientes, mascotas recuperadas y actividad mensual. Obtén una idea clara del movimiento en tu cuenta y del impacto de PetTracker.',
  image: 'src/assets/Estadisticas.png',
}

const feature3 = {
  title: 'Tus Puntos',
  description:
    'Gana puntos por registrar mascotas, mantener actualizados sus perfiles o ayudar a otros usuarios a encontrar mascotas. Acumúlalos y canjéalos próximamente por recompensas o beneficios exclusivos.',
  image: 'src/assets/Puntos.png',
}

const feature4 = {
  title: 'Comunidad',
  description:
    'Conoce historias de reencuentros, ayuda a otros usuarios reportando mascotas encontradas en tu zona y forma parte de una red que protege a los que no pueden hablar.',
  image: 'src/assets/Comunidad.png',
}

export default App
