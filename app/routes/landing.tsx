import LandingView from '@/features/landing/LandingView'
import type { MetaDescriptor } from 'react-router'

export const meta = (): MetaDescriptor[] => [{ title: 'Pet Tracker' }]

export default function LandingRoute() {
  return <LandingView />
}
