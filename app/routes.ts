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
  registerPet: '/register-pet',
  editPet: '/edit-pet',
  editUserProfile: '/edit-user',
  resetPassword: '/reset-password',
  login: '/login',
  signUp: '/sign-up',
  logout: '/logout',
  updatePassword: 'update-password',
  verifyEmail: 'verify-email',
}

export default [
  layout('routes/layout.tsx', [
    index('routes/landing.tsx'),
    layout('routes/auth_layout.tsx', [
      route(appRoutes.login, 'routes/login.tsx'),
      route(appRoutes.signUp, 'routes/signup.tsx'),
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
      route(
        `${appRoutes.reportFoundPet}/:petId`,
        'routes/report_found_pet.tsx'
      ),
      route(appRoutes.editUserProfile, 'routes/edit_user_profile.tsx'),
      route(appRoutes.updatePassword, 'routes/update_password.tsx'),
      route(appRoutes.verifyEmail, 'routes/verify_email.tsx'),
      route(`${appRoutes.registerPet}/:petId`, 'routes/register_pet.tsx'),
    ]),
    route(appRoutes.exploreLostPets, 'routes/lost_pets.tsx'),
    route(appRoutes.resetPassword, 'routes/reset_password.tsx'),
  ]),
] satisfies RouteConfig
