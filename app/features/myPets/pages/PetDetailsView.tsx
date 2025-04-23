import Loader from '@/components/Loader'
import Navbar from '@/components/navbar'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { isPetDataAlreadyFilled } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import ErrorView from './ErrorView'
import FilledPetDataView from './FilledPetDataView'
import RegisterPetIntroductionView from './RegisterPetIntroductionView'

const PetDetailsView = () => {
  const { petId } = useParams()
  const [queryParameters] = useSearchParams()
  const [isLoadingPet, setIsLoadingPet] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pet, setPet] = useState<Tables<'pet'> | null>(null)
  const [activeLostReport, setActiveLostReport] =
    useState<Tables<'lost_pet_report'> | null>(null)

  const encryptedPetId = queryParameters.get('pet')
  const wasScannedFromTag = encryptedPetId !== null && encryptedPetId === petId

  const onRegisteredPet = (pet: Tables<'pet'>) => {
    setPet(pet)
    toast.success('Tu mascota ha sido registrada')
  }

  const onMarkPetAsFound = () => {
    setActiveLostReport(null)
    toast.success('Tu mascota ha sido marcada como encontrada. ¡Felicidades!')
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
      loadPetActiveLostReports(data)
    }

    const loadPetActiveLostReports = async (pet: Tables<'pet'>) => {
      const result = await supabase
        .from('lost_pet_report')
        .select('*')
        .eq('pet', pet.id)
      setIsLoadingPet(false)
      if (result.error !== null) {
        setError('Mascota no encontrada')
        return
      }
      const reports = result.data
      const activeReports = reports.filter(
        (report) => report.found_date === null
      )
      if (activeReports.length >= 1) setActiveLostReport(activeReports.at(0)!)
    }

    loadPet()
  }, [petId])

  return (
    <>
      <Navbar />
      {isLoadingPet && (
        <div className="flex flex-col items-center mt-10">
          <Loader className="mb-3" />
          <p>Cargando mascota...</p>
        </div>
      )}
      {error && (
        <div className="p-3">
          <ErrorView message={error} />
        </div>
      )}
      {!isLoadingPet && pet && isPetDataAlreadyFilled(pet) && (
        <FilledPetDataView
          pet={pet}
          activeLostReport={activeLostReport}
          onMarkPetAsFound={onMarkPetAsFound}
          wasScannedFromTag={wasScannedFromTag}
        />
      )}
      {!isLoadingPet && pet && !isPetDataAlreadyFilled(pet) && (
        <RegisterPetIntroductionView
          petId={petId!}
          onPetRegistered={onRegisteredPet}
        />
      )}
    </>
  )
}

export default PetDetailsView
