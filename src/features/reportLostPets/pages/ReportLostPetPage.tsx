'use client'

import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from '@/components/ui/carousel'
import { petType } from '@/features/myPets/models/petType'
import { fetchAllUserPets } from '@/features/myPets/useCases/fetchAllUserPets'
import useUser from '@/hooks/useUser'
import Navbar from '@/components/navbar'
import CarouselCard from '../components/CarouselCard'
import CarouselControls from '../components/CarouselControls'
import EmptyState from '../components/EmptyState'
import SkeletonLoader from '../components/SkeletonLoaderLostPets'
import { routes } from '@/routes'

const ReportLostPetPage = ({ heading = 'Reportar Mascota' }) => {
  const user = useUser()
  const [userPets, setUserPets] = useState<petType[]>([])
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      try {
        const data = await fetchAllUserPets(user)
        setUserPets(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user pets:', error)
      }
    }
    fetchData()
  }, [user])

  useEffect(() => {
    if (!carouselApi) return

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }
    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  return (
    <>
      <Navbar />
      {loading && <SkeletonLoader />}
      {!loading && userPets.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto">
            <div className="mb-8 ml-7 lg:ml-15 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
              <div>
                <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl">
                  {heading}
                </h2>
                <div className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg">
                  Mascotas que puedes reportar como perdidas
                </div>
              </div>
              <CarouselControls
                carouselApi={carouselApi}
                canScrollPrev={canScrollPrev}
                canScrollNext={canScrollNext}
              />
            </div>
          </div>
          <div className="w-full">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                breakpoints: {
                  '(max-width: 768px)': {
                    dragFree: true,
                  },
                },
              }}
              className="relative left-[-1rem]"
            >
              <CarouselContent className="-mr-4 ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))] 2xl:ml-[max(8rem,calc(50vw-700px+1rem))]">
                {userPets.map((userPet) => (
                  <CarouselCard key={userPet.id} userPet={userPet} />
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      )}
      {!loading && userPets.length === 0 && (
        <EmptyState heading="No tienes mascotas" description="Adquiere tu tag NFC en nuestros puntos de venta y registra a tu mascota!" url={routes.home} />
      )}
    </>
  )
}

export default ReportLostPetPage
