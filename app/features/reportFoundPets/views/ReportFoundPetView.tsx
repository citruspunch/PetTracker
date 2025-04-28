import Navbar from '@/components/navbar'
import { Separator } from '@/components/ui/separator'
import EmptyState from '@/features/reportLostPets/components/EmptyState'
import useUser from '@/hooks/useUser'
import supabase from '@/lib/supabase'
import type { Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { Loader, SearchCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFetcher, useParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { type FoundPetReportData } from '../models/FoundPetReportData'
import foundPetReportFormSchema from '../models/foundPetReportFormSchema'
import ReportFoundPetForm from './ReportFoundPetForm'

const ReportFoundPetView = () => {
  const petId = useParams().petId!
  const fetcher = useFetcher({ key: 'found-pet-report' })
  const [isLoadingPet, setIsLoadingPet] = useState(true)
  const [pet, setPet] = useState<Tables<'pet'> | null>(null)

  useEffect(() => {
    // Fetch pet with active lost report
    (async () => {
      setIsLoadingPet(true)
      const result = await supabase
        .from('lost_pet_report')
        .select('pet(*)')
        .eq('pet', petId)
        .is('found_date', null)
      setIsLoadingPet(false)
      if (result.error !== null) {
        toast.error('Ocurrió un error. Inténtalo de nuevo.')
        return
      }
      if (result.data.length === 0) {
        toast.error(
          'La mascota que intentas reportar como encontrada no existe o no ha sido reportada como perdida.'
        )
        return
      }
      setPet(result.data.at(0)!.pet)
    })()
  }, [petId])

  const handleSubmit = async (
    values: z.infer<typeof foundPetReportFormSchema>
  ) =>
    fetcher.submit(
      {
        ...values,
        pet: pet!,
        finderName: 'Samuel',
        ownerEmail: 'pettracker.gt@gmail.com',
      } satisfies FoundPetReportData,
      { method: 'post', encType: 'application/json' }
    )

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
          <ReportFoundPetForm petName={pet.name!} onReport={handleSubmit} />
        </div>
      )}
    </>
  )
}

export default ReportFoundPetView
