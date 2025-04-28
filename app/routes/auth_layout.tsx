import Loader from '@/components/Loader'
import supabase from '@/lib/supabase'
import { appRoutes } from '@/routes'
import { Outlet, redirect } from 'react-router'

export const clientLoader = async () => {
  const userResult = await supabase.auth.getUser()
  if (userResult.data.user) {
    return redirect(appRoutes.dashboard)
  } else {
    return
  }
}

export const HydrateFallback = () => (
  <div className="flex flex-col items-center pt-7">
    <Loader />
  </div>
)

const LoginRegisterLayout = () => {
  return <Outlet />
}

export default LoginRegisterLayout
