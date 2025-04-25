import Loader from '@/components/Loader'
import supabase from '@/lib/supabase'
import { appRoutes } from '@/routes'
import { Outlet, redirect } from 'react-router'
import type { Route } from './+types/protected_layout'

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = async ({ request }: Route.ClientLoaderArgs) => {
  const userResult = await supabase.auth.getUser()
  if (new URL(request.url).pathname.includes(appRoutes.petDetails))
    return userResult.data.user
  if (userResult.error) return redirect(appRoutes.login)
  return userResult.data.user
}

export const HydrateFallback = () => {
  return (
    <div className="flex flex-col items-center pt-7">
      <Loader />
    </div>
  )
}

const ProtectedLayoutRoute = ({ loaderData: user }: Route.ComponentProps) => (
  <Outlet context={user} />
)

export default ProtectedLayoutRoute
