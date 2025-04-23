import Navbar from '@/components/navbar'
import { Separator } from '@/components/ui/separator'
import EmptyState from '@/features/reportLostPets/components/EmptyState'
import useUser from '@/hooks/useUser'
import supabase from '@/lib/supabase/supabase'
import { type Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { Loader, SearchCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { reportFoundPetSchema } from '../models/formSchemas'
import ReportFoundPetForm from './ReportFoundPetForm'

const ReportFoundPetView = () => {
  const navigate = useNavigate()
  const { petId } = useParams()

  const user = useUser()!

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPet, setIsLoadingPet] = useState(true)
  const [pet, setPet] = useState<Tables<'pet'> | null>(null)

  useEffect(() => {
    const fetchPet = async () => {
      setIsLoadingPet(true)
      const result = await supabase.from('pet').select('*').eq('id', petId!)
      setIsLoadingPet(false)
      if (result.error !== null) {
        toast.error('Ocurrió un error. Inténtalo de nuevo.')
        return
      }
      if (result.data.length === 0) {
        toast.error(
          'La mascota que intentas reportar como encontrada no existe.'
        )
        return
      }
      setPet(result.data.at(0)!)
    }
    if (petId === null) return
    fetchPet()
  }, [petId])

  const handleSubmit = async (values: z.infer<typeof reportFoundPetSchema>) => {
    setIsLoading(true)
    const { error } = await supabase.from('found_pet_report').insert({
      pet: pet!.id,
      found_by: user.id,
      location: values.location,
      contact_number: values.contactPhone,
      notes: values.notes,
      city: values.city.trim(),
    })

    setIsLoading(false)
    if (error) {
      toast.error(
        'Ocurrió un error al reportar tu mascota como perdida. Inténtalo de nuevo.'
      )
      console.error(error)
      return
    } else {
      toast.success(`Gracias por reportar a ${pet!.name} como encontrada.`)
    }

    navigate(`${appRoutes.petDetails}/${pet!.id}`, { replace: true })
  }

  return (
    <>
      <Navbar />
      {isLoadingPet && <Loader className="mx-auto mt-5" />}
      {!isLoadingPet && !pet && <EmptyState url={appRoutes.landing} />}
      {!isLoadingPet && pet && (
        <div className="p-5 mt-5 w-6/7 sm:w-3/4 md:w-2/3 mx-auto">
          <div className="flex items-center mb-5">
            <SearchCheck className="mr-3 h-10 w-10 hidden sm:block" />
            <h2 className="font-bold text-3xl mb-1">
              Reportar a {pet.name} como{' '}
              {pet.sex === 'male' ? 'encontrado' : 'encontrada'}
            </h2>
          </div>

          <Separator className="mb-8" />
          <ReportFoundPetForm
            petName={pet.name!}
            onReport={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  )
}

export default ReportFoundPetView
