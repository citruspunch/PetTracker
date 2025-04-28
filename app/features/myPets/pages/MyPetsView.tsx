import Loader from '@/components/Loader'
import Navbar from '@/components/navbar'
import { Separator } from '@/components/ui/separator'
import EmptyState from '@/features/reportLostPets/components/EmptyState'
import useUser from '@/hooks/useUser'
import { formatAnimalType } from '@/lib/animalTypes'
import supabase from '@/lib/supabase'
import type { Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { ArrowRight } from '@solar-icons/react'
import { HoverBorderGradient } from 'components/ui/hover-border-gradient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const MyPetsView = () => {
  const [isLoadingPets, setIsLoadingPets] = useState(true)
  const [pets, setPets] = useState<Tables<'pet'>[]>([])
  const user = useUser()!
  const navigate = useNavigate()

  useEffect(() => {
    const loadPets = async () => {
      setIsLoadingPets(true)
      const result = await supabase.from('pet').select('*').eq('owner', user.id)
      setIsLoadingPets(false)
      if (result.error !== null) {
        toast.error('Ocurrió un error al obtener tus mascotas.')
        return
      }
      setPets(result.data)
    }
    loadPets()
  }, [user])

  return (
    <>
      <Navbar />
      <section className="py-8">
        <div className="container mx-auto">
          <div className="mx-auto max-w-5/6 md:max-w-screen-lg">
            <div className="text-center lg:text-left">
              <h1 className="text-left text-3xl font-semibold font-medium md:text-4xl">
                Mis mascotas
              </h1>
            </div>
            <Separator className="mt-7 sm:mt-10" />
            <div className="mx-auto mt-5 flex flex-col">
              {isLoadingPets && <Loader />}
              {!isLoadingPets && pets.length === 0 && (
                <EmptyState
                  url={appRoutes.myPets}
                  heading="No tienes mascotas"
                  description="Dirígete a un punto de venta y adquiere tu tag para tu mascota"
                  variant="destructive"
                />
              )}
              {!isLoadingPets &&
                pets.length !== 0 &&
                pets.map((pet) => (
                  <div key={pet.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-xl">{pet.name}</h3>
                        <span className="text-sm">
                          {formatAnimalType(pet.animal_type!)}
                        </span>
                      </div>
                      <HoverBorderGradient
                        containerClassName="flex ml-auto w-fit gap-2"
                        as="button"
                        className="dark:bg-black text-xs bg-white text-black dark:text-white flex items-center space-x-2"
                        onClick={() =>
                          navigate(`${appRoutes.petDetails}/${pet.id}`)
                        }
                      >
                        <span>Ver más</span>
                        <ArrowRight className="h-4 w-4" />
                      </HoverBorderGradient>
                    </div>
                    <Separator className="my-5" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MyPetsView
