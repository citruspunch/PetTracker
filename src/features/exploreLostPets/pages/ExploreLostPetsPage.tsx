import { ArrowRight } from 'lucide-react'
import { MdPets } from 'react-icons/md'
import { MapPinned } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Navbar from '@/components/navbar'
import { useNavigate } from 'react-router-dom'
import { fetchLostPets } from '../useCases/fetchLostPets'
import { LostPetType } from '../models/lostPetType'
import { Skeleton } from '@/components/ui/skeleton'

const ExploreLostPets = ({ heading = 'Mascotas Perdidas' }) => {
  const [lostPets, setLostPets] = useState<LostPetType[]>([])
  const navigate = useNavigate()
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
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </section>
      )}
      {!loading && lostPets.length === 0 && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-semibold">No hay mascotas perdidas</p>
        </div>
      )}
      {!loading && lostPets.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto">
            <h1 className="text-center md:text-start mb-8 px-4 text-3xl font-semibold md:text-4xl">
              {heading}
            </h1>
            <div className="flex flex-col">
              <Separator />
              {lostPets.map((lostPet, index) => (
                <React.Fragment key={index}>
                  <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-6">
                    <div className="order-2 flex items-center gap-2 md:order-none md:col-span-2">
                      <span className="flex mr-2 h-20 w-22 shrink-0 items-center justify-center rounded-md bg-muted">
                        {lostPet.image ? (
                          <img
                            src={lostPet.image}
                            alt={lostPet.name ?? 'Mascota perdida'}
                            loading="lazy"
                            className="h-full w-full rounded-md object-cover"
                          />
                        ) : (
                          <MdPets className="h-9 w-9 text-muted-foreground" />
                        )}
                      </span>
                      <div className="flex flex-col w-full ">
                        <h3 className="text-[18px] font-semibold">
                          {lostPet.name}
                        </h3>
                        <span className="text-[15px] text-muted-foreground">
                          {lostPet.species}
                        </span>
                        <span className="text-[15px] font-semibold text-muted-foreground text-red-400">
                          {lostPet.created_at}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 md:order-none md:col-span-3">
                      <MapPinned />
                      <p className="order-1 text-2xl font-semibold md:order-none md:col-span-2 line-clamp-2">
                        {lostPet.last_seen_address}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(`/mascotas-perdidas/${lostPet.id}`)
                      }
                      className="order-3 ml-auto w-fit gap-2 md:order-none"
                    >
                      <span>Ver más</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Separator />
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
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
