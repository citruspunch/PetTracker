import Loader from '@/components/Loader'
import supabase from '@/lib/supabase/supabase'
import { appRoutes } from '@/routes'
import type { User } from '@supabase/supabase-js'
import { Outlet, redirect, useOutletContext } from 'react-router'
import type { Route } from './+types/authorized_layout'

type ContextType = { user: User }

export async function clientLoader(_: Route.ClientLoaderArgs) {
  const userResult = await supabase.auth.getUser()
  if (userResult.error) {
    return redirect(appRoutes.logIn)
  }
  return userResult.data.user
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center pt-7">
      <Loader />
    </div>
  )
}

export default function AuthorizedLayout({
  loaderData: user,
}: Route.ComponentProps) {
  return <Outlet context={{ user } satisfies ContextType} />
}

export function useUser() {
  return useOutletContext<ContextType>()
}
