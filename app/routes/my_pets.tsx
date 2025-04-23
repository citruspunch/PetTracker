import MyPetsView from '@/features/myPets/pages/MyPetsView'

export function meta() {
  return [{ title: 'Mis mascotas' }]
}

export default function MyPetsRoute() {
  return <MyPetsView />
}
