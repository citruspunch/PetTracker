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
  LostPetDetails: '/lost-pet/:petId',
  reportLostPet: '/report-lost-pet',
  reportFoundPet: '/report-found-pet',
  petDetails: '/pet-details',
  editPet: '/edit-pet',
  editUser: '/edit-user',
  resetPassword: '/reset-password',
  logIn: '/login',
  signUp: '/sign-up',
  logout: '/logout',
}

export default [
  index('routes/landing.tsx'),
  layout('routes/authorized_layout.tsx', [
    route(appRoutes.dashboard, 'routes/dashboard.tsx'),
  ]),
  route(appRoutes.logIn, 'routes/login.tsx'),
] satisfies RouteConfig
