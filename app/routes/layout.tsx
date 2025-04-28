import Loader from '@/components/Loader'
import supabase from '@/lib/supabase'
import { Outlet } from 'react-router'
import type { Route } from './+types/layout'

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = async () => {
  const userResult = await supabase.auth.getUser()
  return userResult.data.user
}

export const HydrateFallback = () => {
  return (
    <div className="flex flex-col items-center pt-7">
      <Loader />
    </div>
  )
}

const Component = ({ loaderData: user }: Route.ComponentProps) => (
  <Outlet context={user} />
)

export default Component
