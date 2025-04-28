import Navbar from '@/components/navbar'
import RegisterPetIntroductionView from '@/features/myPets/pages/RegisterPetIntroductionView'
import { appRoutes } from '@/routes'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import type { Route } from './+types/register_pet'

const Component = ({ params: { petId } }: Route.ComponentProps) => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <RegisterPetIntroductionView
        petId={petId}
        onPetRegistered={(pet) => {
          toast.success('Tu mascota ha sido registrada ')
          navigate(`${appRoutes.petDetails}/${pet.id}`)
        }}
      />
    </>
  )
}

export default Component
