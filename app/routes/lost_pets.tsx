import ExploreLostPets from '@/features/exploreLostPets/pages/ExploreLostPetsPage'
import type { MetaDescriptor } from 'react-router'

export const meta = (): MetaDescriptor[] => [{ title: 'Mascotas perdidas' }]

const LostPetsRoute = () => <ExploreLostPets />

export default LostPetsRoute
