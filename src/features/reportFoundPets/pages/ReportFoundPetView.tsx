import { Tables } from '@/lib/supabase-types'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '@/routes'
import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import useUser from '@/hooks/useUser'
import { z } from 'zod'
import { Loader } from 'lucide-react'
import ReportFoundPetForm from './ReportFoundPetForm'
import EmptyState from '@/features/reportLostPets/components/EmptyState'
import { reportFoundPetSchema } from '../models/formSchemas'

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
    const result = await supabase
      .from('lost_pet_report')
      .update({ found_date: new Date().toISOString() })
      .eq('pet', pet!.id)

    setIsLoading(false)
    if (error || result.error) {
      toast.error(
        'Ocurrió un error al reportar tu mascota como perdida. Inténtalo de nuevo.'
      )
      console.error(error)
      return
    } else {
      toast.success(`Gracias por reportar a ${pet!.name} como encontrada.`)
    }

    navigate(`${routes.petDetails}/${pet!.id}`, { replace: true })
  }

  return (
    <>
      <Navbar />
      {isLoadingPet && <Loader className="mx-auto mt-5" />}
      {!isLoadingPet && !pet && <EmptyState url={routes.home} />}
      {!isLoadingPet && pet && (
        <div className="p-5">
          <h2 className="font-bold text-3xl mb-8">
            Reportar a {pet.name} como{' '}
            {pet.sex === 'male' ? 'encontrado' : 'encontrada'}
          </h2>
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
