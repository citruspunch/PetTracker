import Navbar from '@/components/navbar'
import { Separator } from '@/components/ui/separator'
import SendPetFoundNotification from '@/features/emails/SendPetFoundNotification'
import EmptyState from '@/features/reportLostPets/components/EmptyState'
import useUser from '@/hooks/useUser'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { routes } from '@/routes'
import { Loader, SearchCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { reportFoundPetSchema } from '../models/formSchemas'
import ReportFoundPetForm from './ReportFoundPetForm'
type Profile = {
  first_name: string | null
  last_name: string | null
}

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

    const ownerEmail = await supabase
      .from('profiles')
      .select('email')
      .eq('id', pet!.owner!)
      .single()

    const existingProfile = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single()

    if (existingProfile.error) {
      console.error('Error fetching profile:', existingProfile.error.message)
      toast.error(
        'Ocurrió un error al obtener tu información de perfil. Inténtalo de nuevo.'
      )
      setIsLoading(false)
      return
    }

    if (ownerEmail.error) {
      console.error('Error fetching owner email:', ownerEmail.error.message)
      toast.error(
        'Ocurrió un error al obtener la información del propietario de la mascota. Inténtalo de nuevo.'
      )
      setIsLoading(false)
      return
    }

    const ownerEmailAddress = ownerEmail.data.email
    const first_name: string = existingProfile.data.first_name!
    const last_name: string | null = existingProfile.data.last_name

    setIsLoading(false)
    if (error) {
      toast.error(
        'Ocurrió un error al reportar tu mascota como perdida. Inténtalo de nuevo.'
      )
      console.error(error)
      return
    }
    await SendPetFoundNotification({
      petName: pet!.name!,
      petSex: pet!.sex!,
      finderName: first_name,
      finderLastName: last_name ? last_name : ' ',
      city: values.city,
      location: values.location,
      contactNumber: values.contactPhone,
      notes: values.notes,
      link: `${routes.petDetails}/${pet!.id}`,
      ownerEmail: ownerEmailAddress!,
    })
    toast.success(`Gracias por reportar a ${pet!.name} como encontrada.`)

    navigate(`${routes.petDetails}/${pet!.id}`, { replace: true })
  }

  return (
    <>
      <Navbar />
      {isLoadingPet && <Loader className="mx-auto mt-5" />}
      {!isLoadingPet && !pet && <EmptyState url={routes.home} />}
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
