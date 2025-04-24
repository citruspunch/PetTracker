import { useEffect, useState } from 'react'

import Navbar from '@/components/navbar'
import LostPetsList from '../components/LostPetsList'
import NoLostPets from '../components/NoLostPets'
import SkeletonExploreLostPets from '../components/SkeletonExploreLostPets'
import { type LostPetType } from '../models/lostPetType'
import { fetchLostPets } from '../useCases/fetchLostPets'

const ExploreLostPets = ({ heading = 'Mascotas Perdidas' }) => {
  const [lostPets, setLostPets] = useState<LostPetType[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch lost pets data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLostPets()
        setLostPets(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching lost pets:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      {loading && (
        <section className="py-8">
          <div className="container mx-auto">
            <h1 className="text-center md:text-start mb-8 px-4 text-3xl font-semibold md:text-4xl">
              {heading}
            </h1>
            <SkeletonExploreLostPets />
          </div>
        </section>
      )}
      {!loading && lostPets.length === 0 && <NoLostPets />}
      {!loading && lostPets.length > 0 && (
        <LostPetsList heading={heading} lostPets={lostPets} />
      )}
    </>
  )
}

export default ExploreLostPets
