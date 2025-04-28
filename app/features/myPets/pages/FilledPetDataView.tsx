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
import supabase from '@/lib/supabase'
import type { Tables } from '@/lib/supabase/types'
import { calculateAge, cn, formatAge, formatAnimalSex } from '@/lib/utils'
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
import { useFetcher } from 'react-router'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import type { PetOperation } from '../models/petOperations'

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
} & OptionsProps

const FilledPetDataView = ({ pet, ...props }: Props) => {
  const user = useUser()
  const isOwner = user !== null && pet.owner === user.id

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
  return (
    <>
      <div className="flex flex-col items-center gap-4 text-center">
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
    </>
  )
}

type OptionsProps = {
  pet: Tables<'pet'>
  activeLostReport: Tables<'lost_pet_report'> | null
}

const Options = ({
  pet,
  activeLostReport,
  className,
  ...props
}: OptionsProps & ComponentProps<typeof Button>) => {
  const lost = pet.sex === 'male' ? 'perdido' : 'perdida'
  const found = pet.sex === 'male' ? 'encontrado' : 'encontrada'
  const fetcher = useFetcher()

  const handleAction = (operation: Pick<PetOperation, 'operation'>) =>
    fetcher.submit(
      {
        operation: operation.operation,
        pet: pet,
      } satisfies PetOperation,
      {
        method: 'post',
        encType: 'application/json',
      }
    )
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
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            handleAction({ operation: 'edit' })
          }}
        >
          <Pen />
          Editar
        </DropdownMenuItem>

        <ConfirmDeleteDialog
          onConfirm={() => handleAction({ operation: 'delete' })}
          petName={pet.name!}
        >
          <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
            <TrashBinTrash />
            Eliminar
          </DropdownMenuItem>
        </ConfirmDeleteDialog>

        {activeLostReport === null ? (
          <ReportLostPetAlertDialog
            petName={pet.name!}
            onConfirm={() => handleAction({ operation: 'markAsLost' })}
          >
            <DropdownMenuItem
              variant="destructive"
              onSelect={(event) => event.preventDefault()}
            >
              <DangerCircle weight="Linear" />
              Reportar como {lost}
            </DropdownMenuItem>
          </ReportLostPetAlertDialog>
        ) : (
          <ReportFoundPetAlertDialog
            petName={pet.name!}
            onConfirm={() => handleAction({ operation: 'markAsFound' })}
          >
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              <Flag weight="Linear" />
              Reportar como {found}
            </DropdownMenuItem>
          </ReportFoundPetAlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilledPetDataView
