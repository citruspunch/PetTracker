import Loader from '@/components/Loader'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import EmptyState from '@/features/reportLostPets/components/EmptyState'
import useUser from '@/hooks/useUser'
import { formatAnimalType } from '@/lib/animalTypes'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { routes } from '@/routes'
import { ArrowRight } from '@solar-icons/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const MyPetsView = () => {
  const [isLoadingPets, setIsLoadingPets] = useState(true)
  const [pets, setPets] = useState<Tables<'pet'>[]>([])
  const user = useUser()!

  useEffect(() => {
    const loadPets = async () => {
      if (!user) {
        return
      }
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
      <section className="py-15">
        <div className="container mx-auto">
          <div className="mx-auto max-w-5/6 md:max-w-screen-lg">
            <div className="text-center lg:text-left">
              <h1 className="text-left text-3xl font-medium md:text-4xl">
                Mis mascotas
              </h1>
            </div>
            <div className="mx-auto mt-6 flex flex-col md:mt-14">
              {isLoadingPets && <Loader />}
              {!isLoadingPets && pets.length === 0 && (
                <EmptyState
                  url={routes.myPets}
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
                      <Button variant="outline">
                        <Link
                          to={`${routes.petDetails}/${pet.id}`}
                          className="flex items-center gap-2"
                        >
                          <span className="text-xs">Ver</span>
                          <ArrowRight />
                        </Link>
                      </Button>
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
