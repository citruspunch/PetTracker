import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes'

export const appRoutes = {
  landing: '/',
  dashboard: '/dashboard',
  myPets: '/my-pets',
  exploreLostPets: '/lost-pets',
  reportLostPet: '/report-lost-pet',
  reportFoundPet: '/report-found-pet',
  petDetails: '/pet',
  editPet: '/edit-pet',
  editUser: '/edit-user',
  resetPassword: '/reset-password',
  login: '/login',
  signUp: '/sign-up',
  logout: '/logout',
}

export default [
  index('routes/landing.tsx'),
  layout('routes/auth_layout.tsx', [
    route(appRoutes.login, 'routes/login.tsx'),
  ]),
  layout('routes/protected_layout.tsx', [
    route(appRoutes.dashboard, 'routes/dashboard.tsx'),
    route(appRoutes.myPets, 'routes/my_pets.tsx'),
    route(`${appRoutes.petDetails}/:petId`, 'routes/pet.tsx'),
    route(`${appRoutes.editPet}/:petId`, 'routes/edit_pet.tsx'),
    route(appRoutes.reportLostPet, 'routes/report_lost_pet.tsx'),
    route(
      `${appRoutes.reportLostPet}/:petId`,
      'routes/report_lost_pet_form.tsx'
    ),
    route(`${appRoutes.reportFoundPet}/:petId`, 'routes/report_found_pet.tsx'),
  ]),
  route(appRoutes.exploreLostPets, 'routes/lost_pets.tsx'),
] satisfies RouteConfig
