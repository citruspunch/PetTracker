import LandingView from '@/features/landing/LandingView'
import type { Route } from './+types/landing'

export function meta(_: Route.MetaArgs) {
  return [{ title: 'Pet Tracker' }]
}

export default function LandingRoute() {
  return <LandingView />
}
