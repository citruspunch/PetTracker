import { CarouselItem } from '@/components/ui/carousel'
import { formatAnimalType } from '@/lib/animalTypes'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { formatAnimalSex } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { MdPets } from 'react-icons/md'
import ReportLostPetAlertDialog from './ReportLostPetAlertDialog'

const CarouselItemCard = ({ userPet }: { userPet: Tables<'pet'> }) => {
  const imageUrl = supabase.storage
    .from('pets-portraits')
    .getPublicUrl(userPet.image!).data.publicUrl
  return (
    <CarouselItem key={userPet.id} className="pl-4 md:max-w-[452px]">
      <ReportLostPetAlertDialog pet={userPet}>
        <div className="group flex flex-col justify-between">
          <div>
            <div className="flex aspect-[3/2] overflow-clip rounded-xl">
              <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                {userPet.image ? (
                  <img
                    src={imageUrl}
                    alt={userPet.name!}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <MdPets className="h-full w-full p-10 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
          <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
            {userPet.name}
          </div>
          <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
            {userPet.breed
              ? `${formatAnimalType(userPet.animal_type!)} - ${userPet.breed}`
              : formatAnimalType(userPet.animal_type!)}
            <br />
            {formatAnimalSex(userPet.sex!)}
          </div>
          <div className="flex items-center text-sm">
            Reportar como perdida{' '}
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </ReportLostPetAlertDialog>
    </CarouselItem>
  )
}

export default CarouselItemCard
