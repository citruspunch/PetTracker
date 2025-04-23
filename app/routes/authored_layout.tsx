import supabase from '@/lib/supabase'
import { appRoutes } from '@/routes'
import type { User } from '@supabase/supabase-js'
import { Outlet, redirect, useOutletContext } from 'react-router'
import type { Route } from './+types/authored_layout'

type ContextType = { user: User }

export async function loader(_: Route.LoaderArgs) {
  const userResult = await supabase.auth.getUser()
  if (userResult.error) {
    return redirect(appRoutes.logIn)
  }
  return userResult.data.user
}

export default function AuthoredLayout({
  loaderData: user,
}: Route.ComponentProps) {
  return <Outlet context={{ user } satisfies ContextType} />
}

export function useUser() {
  return useOutletContext<ContextType>()
}
