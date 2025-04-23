import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import ReportFoundPetAlertDialog from '@/features/reportLostPets/components/ReportFoundPetAlertDialog'
import ReportLostPetAlertDialog from '@/features/reportLostPets/components/ReportLostPetAlertDialog'
import useUser from '@/hooks/useUser'
import { formatAnimalType } from '@/lib/animalTypes'
import supabase from '@/lib/supabase/supabase'
import type { Tables } from '@/lib/supabase/types'
import { calculateAge, cn, formatAge, formatAnimalSex } from '@/lib/utils'
import { appRoutes } from '@/routes'
import {
  ClipboardHeart,
  DangerCircle,
  Flag,
  MenuDotsCircle,
  Paw,
  Pen,
  TrashBinTrash,
} from '@solar-icons/react'
import React, { type ComponentProps } from 'react'
import { Link } from 'react-router'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import LostPetAlert from './LostPetAlert'

type Attribute = {
  label: string
  value: string
}

type TabContent = {
  title: string
  attributes: Attribute[]
}

type Tab = {
  id: string
  icon: React.ReactNode
  label: string
  content: TabContent
}

type Props = {
  tabs?: Tab[]
  wasScannedFromTag: boolean
} & OptionsProps

const FilledPetDataView = ({ pet, wasScannedFromTag, ...props }: Props) => {
  const tabs: Tab[] = [
    {
      id: 'tab-1',
      icon: <Paw size={18} weight="Linear" />,
      label: 'Perfil',
      content: {
        title: 'Perfil',
        attributes: [
          {
            label: 'Edad',
            value: formatAge(calculateAge(pet.birth_date!)),
          },
          { label: 'Sexo', value: formatAnimalSex(pet.sex!) },
          {
            label: 'Especie',
            value: formatAnimalType(pet.animal_type!),
          },
          { label: 'Raza', value: pet.breed ?? 'No especificada' },
          { label: 'Notas', value: pet.notes },
        ],
      },
    },
    {
      id: 'tab-2',
      icon: <ClipboardHeart size={18} weight="Linear" />,
      label: 'Información médica',
      content: {
        title: 'Ficha médica',
        attributes: [
          {
            label: 'Castrado/Esterilizada',
            value: pet.spayed_or_neutered ? 'Sí' : 'No',
          },
          { label: 'Alergias', value: 'No especificadas' },
        ],
      },
    },
  ]
  const petImageUrl = pet.image
    ? supabase.storage.from('pets-portraits').getPublicUrl(pet.image!).data
        .publicUrl
    : null
  const user = useUser()
  const isOwner = user?.id === pet.owner
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          {wasScannedFromTag && props.activeLostReport !== null && (
            <LostPetAlert pet={pet} className="mb-5" />
          )}
          <div className="flex flow-row items-baseline justify-center mx-2">
            {isOwner && <Options pet={pet} {...props} className="mr-1" />}
            <h1
              className={cn(
                'max-w max-w-5/6 md:max-w-2xl text-3xl font-semibold md:text-4xl',
                isOwner && 'mr-7'
              )}
            >
              {pet.name}
            </h1>
          </div>
          {petImageUrl && (
            <div className="relative h-[200px] w-full lg:h-[400px] sm:hidden px-5 sm:px-0">
              <img
                src={petImageUrl}
                alt="Foto de la mascota"
                className="h-full w-full rounded-xl object-contain"
                width={600}
                height={400}
              />
            </div>
          )}
        </div>
        <Tabs defaultValue={tabs[0].id} className="mt-6">
          <TabsList className="container flex flex-col items-center justify-center gap-2 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-5 md:mt-8 max-w-5/6 md:max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            <div className="relative">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="grid place-items-start gap-7 lg:grid-cols-2 lg:gap-10"
                >
                  <div className="flex flex-col gap-5 w-full lg:w-4/5 h-full justify-center">
                    <h3 className="text-3xl font-semibold lg:text-5xl">
                      {tab.content.title}
                    </h3>
                    <ul className="text-muted-foreground lg:text-lg">
                      <Separator className="my-2" />
                      {tab.content.attributes.map((attribute, index) => (
                        <React.Fragment key={index}>
                          <li className="flex">
                            <span className="font-medium w-2/5">
                              {attribute.label}:
                            </span>
                            <span className="w-3/5 text-right">
                              {attribute.value}
                            </span>
                          </li>
                          <Separator className="my-2" />
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-[300px] w-full lg:h-[400px] hidden sm:block">
                    {petImageUrl && (
                      <div className="relative h-[300px] w-full lg:h-[400px] ">
                        <img
                          src={petImageUrl}
                          alt="Foto de la mascota"
                          className="h-full w-full rounded-xl object-cover"
                          width={600}
                          height={400}
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

type OptionsProps = {
  pet: Tables<'pet'>
  activeLostReport: Tables<'lost_pet_report'> | null
  onMarkPetAsFound: () => void
}

const Options = ({
  pet,
  activeLostReport,
  onMarkPetAsFound,
  className,
  ...props
}: OptionsProps & ComponentProps<typeof Button>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex text-muted-foreground data-[state=open]:bg-muted',
            className
          )}
          size="icon"
          {...props}
        >
          <MenuDotsCircle weight="Linear" size={52} />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-40">
        <DropdownMenuItem onSelect={(event) => event.preventDefault()} asChild>
          <Link to={`${appRoutes.editPet}/${pet.id}`} className="flex w-full">
            <Pen />
            Editar
          </Link>
        </DropdownMenuItem>
        <ConfirmDeleteDialog pet={pet}>
          <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
            <TrashBinTrash />
            Eliminar
          </DropdownMenuItem>
        </ConfirmDeleteDialog>
        {activeLostReport !== null && (
          <ReportFoundPetAlertDialog
            pet={pet}
            report={activeLostReport}
            onMarked={onMarkPetAsFound}
          >
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              <Flag weight="Linear" />
              Reportar como encontrada
            </DropdownMenuItem>
          </ReportFoundPetAlertDialog>
        )}
        {activeLostReport === null && (
          <ReportLostPetAlertDialog pet={pet}>
            <DropdownMenuItem
              variant="destructive"
              onSelect={(event) => event.preventDefault()}
            >
              <DangerCircle weight="Linear" />
              Reportar como perdido
            </DropdownMenuItem>
          </ReportLostPetAlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilledPetDataView
