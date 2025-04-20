import Navbar from '@/components/navbar'
import ErrorView from '@/features/myPets/pages/ErrorView'
import FilledPetDataView from '@/features/myPets/pages/FilledPetDataView'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const LostPetDetails = () => {
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
      if (error !== null) setError('Ocurrió un error al cargar la mascota')
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
      {pet && <FilledPetDataView pet={pet} />}
    </>
  )
}

export default LostPetDetails
