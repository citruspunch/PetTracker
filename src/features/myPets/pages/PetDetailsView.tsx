import Navbar from '@/components/navbar'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { isPetDataAlreadyFilled } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorView from './ErrorView'
import FilledPetDataView from './FilledPetDataView'

const PetDetailsView = () => {
  const { petId } = useParams()
  const [isLoadingPet, setIsLoadingPet] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pet, setPet] = useState<Tables<'pet'> | null>(null)

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
      setIsLoadingPet(false)
      if (error !== null) setError('Mascota no encontrada')
      setPet(data)
    }
    loadPet()
  }, [petId])

  return (
    <>
      <Navbar />
      {isLoadingPet && (
        <div className="flex flex-col items-center mt-10">
          <Loader2 className="animate-spin mb-3" />
          <p>Cargando mascota...</p>
        </div>
      )}
      {error && (
        <div className="p-3">
          <ErrorView message={error} />
        </div>
      )}
      {pet && isPetDataAlreadyFilled(pet) && <FilledPetDataView pet={pet} />}
      {pet && !isPetDataAlreadyFilled(pet) && (
        <div>Crear formulario para registrar una mascota</div>
      )}
    </>
  )
}

export default PetDetailsView
