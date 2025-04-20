import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Link } from 'react-router-dom'
import { petType } from '../../myPets/models/petType'
import { ArrowRight } from 'lucide-react'
import { routes } from '@/routes'
import { MdPets } from 'react-icons/md'
import { CarouselItem } from '@/components/ui/carousel'

const CarouselItemCard = ({ userPet }: { userPet: petType }) => (
  <CarouselItem key={userPet.id} className="pl-4 md:max-w-[452px]">
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="group flex flex-col justify-between">
          <div>
            <div className="flex aspect-[3/2] overflow-clip rounded-xl">
              <div className="flex-1">
                <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                  {userPet.image ? (
                    <img
                      src={userPet.image}
                      alt={userPet.name ?? 'Mascota'}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <MdPets className="h-full w-full p-10 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
            {userPet.name}
          </div>
          <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
            {userPet.breed
              ? `${userPet.species} - ${userPet.breed}`
              : userPet.species}
            <br />
            {userPet.sex}
          </div>
          <div className="flex items-center text-sm">
            Reportar como perdida{' '}
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='leading-6'>
            ¿Estás seguro de marcar a {userPet.name} como perdido?
          </AlertDialogTitle>
          <AlertDialogDescription className='leading-5'>
            Esto marcará a tu mascota como perdida. Será visible en la sección
            de mascotas reportadas y otras personas podrán ayudarte a
            encontrarla.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link to={`${routes.reportLostPet}/${userPet.id}`}>Continuar</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </CarouselItem>
)

export default CarouselItemCard