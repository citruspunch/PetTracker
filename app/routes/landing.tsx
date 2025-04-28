import LandingView from '@/features/landing/LandingView'
import useUser from '@/hooks/useUser'
import { appRoutes } from '@/routes'
import { useEffect } from 'react'
import { useNavigate, type MetaDescriptor } from 'react-router'

export const meta = (): MetaDescriptor[] => [{ title: 'Pet Tracker' }]

export default function LandingRoute() {
  const user = useUser()
  const navigate = useNavigate()
  useEffect(()  => {
    if (user) {
      navigate(appRoutes.dashboard, { replace: true })
    }
  }, [user])
  return <LandingView />
}
