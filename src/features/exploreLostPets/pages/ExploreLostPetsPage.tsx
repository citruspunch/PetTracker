import { useEffect, useState } from 'react'

import Navbar from '@/components/navbar'
import { fetchLostPets } from '../useCases/fetchLostPets'
import { LostPetType } from '../models/lostPetType'
import SkeletonExploreLostPets from '../components/SkeletonExploreLostPets'
import NoLostPets from '../components/NoLostPets'
import LostPetsList from '../components/LostPetsList'

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
      {!loading && lostPets.length === 0 && (
        <NoLostPets />
      )}
      {!loading && lostPets.length > 0 && (
        <LostPetsList heading={heading} lostPets={lostPets} />
      )}
    </>
  )
}

// export const exampleData: LostPet[] = [
//     {
//         image: "https://cdn.sanity.io/images/5vm5yn1d/pro/5cb1f9400891d9da5a4926d7814bd1b89127ecba-1300x867.jpg?fm=webp&q=80",
//         name: "Luna",
//         species: "Perro",
//         date: "2024-10-05",
//         location: "Zona 16, Ciudad de Guatemala",
//         link: "/mascotas-perdidas/luna"
//     },
//     {
//         image: "https://th.bing.com/th/id/OIP.FKIgrS0iXezi-H_jKdemIwHaHa?w=172&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
//         name: "Michi",
//         species: "Gato",
//         date: "2024-10-01",
//         location: "Mixco, El Milagro",
//         link: "/mascotas-perdidas/michi"
//     },
//     {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFqSGu35kbVqLXJXC-dC4TGmEvtZpFTfl2g&s",
//         name: "Kira",
//         species: "Perro",
//         date: "2024-09-28",
//         location: "Antigua Guatemala",
//         link: "/mascotas-perdidas/kira"
//     },
//     {
//         image: "https://img.freepik.com/foto-gratis/perro-pug-aislado-fondo-blanco_2829-11416.jpg",
//         name: "Rambo",
//         species: "Perro",
//         date: "2024-10-03",
//         location: "Zona 5, Ciudad de Guatemala",
//         link: "/mascotas-perdidas/rambo"
//     },
//     {
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/220px-Cat_November_2010-1a.jpg",
//         name: "Coco",
//         species: "Gato",
//         date: "2024-10-06",
//         location: "Villa Nueva, Bárcenas",
//         link: "/mascotas-perdidas/coco"
//     }
// ];

export default ExploreLostPets
