import Navbar from '@/components/navbar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import RegisterPetForm from './RegisterPetForm'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { routes } from '@/routes'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import Loader from '@/components/Loader'
import { AnimalSex } from '@/lib/animalSex'

const EditPetDetailsView = ({
  className,
  ...props
}: React.ComponentProps<typeof Card>) => {
  const { petId } = useParams()
  const navigate = useNavigate()
  const [isLoadingPet, setIsLoadingPet] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pet, setPet] = useState<Tables<'pet'> | null>(null)

  const onPetRegistered = () => {
    toast.success('Tu mascota ha sido registrada')
    navigate(routes.myPets)
  }

  useEffect(() => {
    const loadPet = async () => {
      setIsLoadingPet(true)
      if (!petId) {
        setIsLoadingPet(false)
        return
      }
      const { data, error } = await supabase
        .from('pet')
        .select('*')
        .eq('id', petId)
        .single()
      if (error !== null) {
        setError('Mascota no encontrada')
        return
      }
      setPet(data)
      setIsLoadingPet(false)
    }

    loadPet()
  }, [petId])

  return (
    <>
      <Navbar />
      {isLoadingPet && (
        <div className="flex flex-col items-center mt-10">
          <Loader className="mb-3" />
          <p>Cargando...</p>
        </div>
      )}
      {!isLoadingPet && (
        <Card className={cn('m-3', className)} {...props}>
          <CardHeader>
            <CardTitle className='text-2xl'>Editar Información</CardTitle>
            <CardDescription>
              Edita la información de tu mascota. Asegúrate de que todos los
              detalles sean correctos.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <RegisterPetForm
              petId={petId!}
              onRegisterUpdated={onPetRegistered}
              previousValues={{
                name: pet?.name || '',
                birthDate: pet?.birth_date ? new Date(pet.birth_date) : undefined,
                sex: pet?.sex as AnimalSex,
                animalType: pet?.animal_type ?? undefined, 
                breed: pet?.breed ?? undefined,
                spayedOrNeutered: pet?.spayed_or_neutered ?? undefined,
                image: pet?.image ?? undefined,
                notes: pet?.notes,
              }}
              isUpdate = {true}
            />
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default EditPetDetailsView
