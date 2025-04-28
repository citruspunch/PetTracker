import { FileTextIcon } from '@radix-ui/react-icons'
import { Handshake } from 'lucide-react'
import { BellIcon } from 'lucide-react'
import { IoPeopleCircleOutline } from 'react-icons/io5'

import { cn, fetchUserProfile } from '@/lib/utils'
import { Marquee } from 'components/magicui/marquee'
import { AnimatedLisNotification } from './AnimatedList'
import { BentoCard, BentoGrid } from 'components/magicui/bento-grid'
import Navbar from '@/components/navbar'
import AnimatedBeamMultipleOutput from './AnimatedBeam'
import { Globe } from 'components/magicui/globe'
import { TypingAnimation } from 'components/magicui/typing-animation'
import { use, useEffect, useState } from 'react'
import useUser from '@/hooks/useUser'

const pets = [
  {
    name: 'Pancho',
    body: 'Perro de raza Labrador Retriever, macho, 3 años, con historial de vacunación al día y microchip registrado.',
  },
  {
    name: 'Michi',
    body: 'Gata de raza Persa, hembra, 2 años, esterilizada, color blanco con ojos azules. Lleva collar rosado con cascabel.',
  },
  {
    name: 'Rocky',
    body: 'Perro de raza Pastor Alemán, macho, 5 años, entrenado en obediencia básica, con placa de identificación PetTracker.',
  },
  {
    name: 'Luna',
    body: 'Gata de raza Siamés, hembra, 1 año, con chip PetTracker para rastreo en tiempo real. Tiene alergia a ciertos alimentos.',
  },
  {
    name: 'Max',
    body: 'Perro de raza Pug, macho, 4 años, usa un arnés especial debido a problemas respiratorios, siempre bajo supervisión.',
  },
]

const features = [
  {
    Icon: FileTextIcon,
    name: 'Registra a tu mascota',
    description:
      'Guarda y actualiza la información de tu mascota en todo momento.',
    href: '#',
    cta: 'Ver más',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {pets.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
              'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
              'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
              'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: 'Notificaciones',
    description: 'Recibe alertas inmediatas cuando encuentren a tu mascota.',
    href: '#',
    cta: 'Ver más',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <AnimatedLisNotification className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: IoPeopleCircleOutline,
    name: 'Comunidad',
    description:
      'Conéctate con otros dueños de mascotas y comparte experiencias',
    href: '#',
    cta: 'Ver más',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <AnimatedBeamMultipleOutput className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Handshake,
    name: 'Ayuda a encontrar mascotas',
    description:
      'Recibe alertas de mascotas perdidas cerca de ti y apoya en su reencuentro.',

    className: 'col-span-3 lg:col-span-1',
    href: '#',
    cta: 'Learn more',
    background: (
      <Globe className="absolute right-0 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90" />
    ),
  },
]

export function BentoDemo() {
  const user = useUser()
  const [userName, setUserName] = useState('')
  useEffect(() => {
    if (!user) return
    const fetchUserName = async () => {
      const data = await fetchUserProfile(user!.id)
      if (data?.first_name && data?.last_name) {
        setUserName(`${data.first_name} ${data.last_name ?? ''}`)
      } else {
        setUserName('')
      }
    }
    fetchUserName()
  }, [user])
  return (
    <>
      <TypingAnimation className='text-center mt-8 text-4xl font-semibold px-5'>{`¡Hola ${userName}! Bienvenido a PetTracker.`}</TypingAnimation>
      <BentoGrid className="py-10 px-5 ">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </>
  )
}

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <BentoDemo />
    </>
  )
}
