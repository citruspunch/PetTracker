import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatAnimalType } from '@/lib/animalTypes'
import supabase from '@/lib/supabase'
import { routes } from '@/routes'
import { ArrowRight, CircleAlert, MapPinned } from 'lucide-react'
import React from 'react'
import { MdPets } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { LostPetType } from '../models/lostPetType'

interface LostPetsListProps {
  heading: string
  lostPets: LostPetType[]
}

const LostPetsList: React.FC<LostPetsListProps> = ({ heading, lostPets }) => {
  const navigate = useNavigate()
  return (
    <section className="py-7 sm:py-12">
      <div className="container mx-auto">
        <div className="flex w-full flex-row items-center justify-center px-3 sm:px-0 sm:justify-between mb-2 md:mb-4 lg:mb-5">
          <h2 className="text-3xl mb-5 font-semibold md:text-4xl text-center">
            {heading}
          </h2>
          <div className="fixed bottom-7 right-6 sm:static">
            <Button
              variant="destructive"
              onClick={() => navigate(routes.reportLostPet)}
              className="bg-red-700 text-white rounded-full p-5 shadow-lg sm:rounded-md sm:p-1"
            >
              <CircleAlert className="h-10 w-10 sm:h-8 sm:w-8" />
              <span className="hidden sm:inline">Reportar mascota perdida</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <Separator />
          {lostPets.map((lostPet, index) => (
            <React.Fragment key={index}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-6">
                <div className="order-2 flex items-center gap-2 md:order-none md:col-span-2">
                  <span className="flex mr-2 h-20 w-22 shrink-0 items-center justify-center rounded-md bg-muted">
                    {lostPet.image ? (
                      <img
                        src={
                          supabase.storage
                            .from('pets-portraits')
                            .getPublicUrl(lostPet.image).data.publicUrl
                        }
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
                      {formatAnimalType(lostPet.species!)}
                    </span>
                    <span className="text-[15px] font-semibold  text-red-400">
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
                    navigate(`${routes.petDetails}/${lostPet.petId}`)
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
  )
}
export default LostPetsList
