import Navbar from '@/components/navbar'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
} from '@/components/ui/carousel'
import useUser from '@/hooks/useUser'
import supabase from '@/lib/supabase'
import { type Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import CarouselCard from '../components/CarouselCard'
import CarouselControls from '../components/CarouselControls'
import EmptyState from '../components/EmptyState'
import SkeletonLoader from '../components/SkeletonLoaderLostPets'

const ReportLostPetPage = ({ heading = 'Reportar Mascota' }) => {
  const user = useUser()
  const [petsWithNotActiveLostReports, setPetsWithNotActiveLostReports] =
    useState<Tables<'pet'>[]>([])
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const allUserPetsResult = await supabase
        .from('pet')
        .select('*')
        .eq('owner', user!.id)
      if (allUserPetsResult.error !== null) {
        toast.error(
          'Ocurrió un error al obtener tus mascotas. Inténtalo de nuevo.'
        )
        setLoading(false)
        return
      }

      for (const pet of allUserPetsResult.data) {
        const reportsResult = await supabase
          .from('lost_pet_report')
          .select('*')
          .eq('pet', pet.id)

        if (reportsResult.error !== null) {
          toast.error(
            'Ocurrió un error al obtener tus mascotas. Inténtalo de nuevo.'
          )
          setLoading(false)
          setPetsWithNotActiveLostReports([])
          break
        }

        const reports = reportsResult.data
        if (
          reports.length === 0 ||
          reports.every((report) => report.found_date !== null)
        ) {
          setPetsWithNotActiveLostReports((currentPets) => [
            ...currentPets,
            pet,
          ])
        }
      }
      setLoading(false)
    }
    if (!user) return
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
      {!loading && petsWithNotActiveLostReports.length > 0 && (
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
                {petsWithNotActiveLostReports.map((userPet) => (
                  <CarouselCard key={userPet.id} userPet={userPet} />
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      )}
      {!loading && petsWithNotActiveLostReports.length === 0 && (
        <EmptyState
          heading="No tienes mascotas mascotas para reportar"
          description="Adquiere tu tag NFC en nuestros puntos de venta y registra a tu mascota!"
          url={appRoutes.myPets}
        />
      )}
    </>
  )
}

export default ReportLostPetPage
