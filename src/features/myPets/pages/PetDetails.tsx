import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PawPrint, ClipboardPlus, CircleUserRound } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Navbar from '@/components/navbar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

interface attibutesContent {
  label: string
  value: string
}

interface TabContent {
  title: string
  attributes: attibutesContent[]
  buttonText: string
  imageSrc: string
  imageAlt: string
}

interface Tab {
  value: string
  icon: React.ReactNode
  label: string
  content: TabContent
}

interface MyPetsPageProps {
  badge?: string
  heading?: string
  description?: string
  tabs?: Tab[]
}

const PetDetails = ({
  badge = 'ID de la Mascota',
  heading = 'Nombre de la Mascota',
  description = 'Detalles de la mascota',
  tabs = exampleData,
}: MyPetsPageProps) => {
  return (
    <>
      <Navbar />
      <section className="py-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="outline">{badge}</Badge>
            <h1 className="max-w max-w-5/6 md:max-w-2xl text-3xl font-semibold md:text-4xl">
              {heading}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Tabs defaultValue={tabs[0].value} className="mt-6">
            <TabsList className="container flex flex-col items-center justify-center gap-2 sm:flex-row md:gap-10">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
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
                    key={tab.value}
                    value={tab.value}
                    className="grid place-items-start gap-7 lg:grid-cols-2 lg:gap-10"
                  >
                    <div className="flex flex-col gap-5 w-full lg:w-4/5 h-full justify-center">
                      <h3 className="text-3xl font-semibold lg:text-5xl">
                        {tab.content.title}
                      </h3>
                      <ul className="text-muted-foreground lg:text-lg">
                        <Separator className="my-2" />
                        {tab.content.attributes?.map((attribute, index) => (
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
                        )) || <li>No attributes available</li>}
                      </ul>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="md:mt-2 w-fit gap-2 mx-auto lg:mx-0" size="lg">
                            {tab.content.buttonText}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{tab.content.buttonText}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {tab.content.attributes?.map((attribute) => (
                              <React.Fragment key={attribute.label}>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor={attribute.label}
                                    className="text-right"
                                  >
                                    {attribute.label}
                                  </Label>
                                  <Input
                                    id={attribute.label}
                                    defaultValue={attribute.value}
                                    className="col-span-3"
                                  />
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                          <DialogFooter>
                            <Button type="submit">Guardar cambios</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="relative h-[300px] w-full lg:h-[400px]">
                      <img
                        src={tab.content.imageSrc}
                        alt={tab.content.imageAlt}
                        className="h-full w-full rounded-xl object-cover"
                        width={600}
                        height={400}
                      />
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </>
  )
}

const exampleData: Tab[] = [
  {
    value: 'tab-1',
    icon: <PawPrint className="h-auto w-4 shrink-0" />,
    label: 'Perfil de Mascota',
    content: {
      title: 'Perfil de Mascota',
      attributes: [
        { label: 'Sexo', value: 'Macho' },
        { label: 'Especie', value: 'Perro' },
        { label: 'Raza', value: 'Golden Retriever' },
        { label: 'Edad', value: '3 años' },
      ],
      buttonText: 'Editar Perfil',
      imageSrc:
        'https://cdn.sanity.io/images/5vm5yn1d/pro/5cb1f9400891d9da5a4926d7814bd1b89127ecba-1300x867.jpg?fm=webp&q=80',
      imageAlt: 'Imagen de la mascota',
    },
  },
  {
    value: 'tab-2',
    icon: <ClipboardPlus className="h-auto w-4 shrink-0" />,
    label: 'Información Médica',
    content: {
      title: 'Ficha Médica',
      attributes: [
        { label: 'Castrado', value: 'Sí' },
        { label: 'Alergias', value: 'Polen, Polvo' },
        { label: 'Vacunas', value: 'Rabia, Parvovirus' },
      ],
      buttonText: 'Actualizar Ficha Médica',
      imageSrc:
        'https://www.amapolamunuera.com/wp-content/uploads/2020/06/medicamentos_veterinarios_1-2048x1365.jpg',
      imageAlt: 'Imagen médica',
    },
  },
  {
    value: 'tab-3',
    icon: <CircleUserRound className="h-auto w-4 shrink-0" />,
    label: 'Información de Contacto',
    content: {
      title: 'Información de Contacto',
      attributes: [
        { label: 'Dueño', value: 'Juan Pérez' },
        { label: 'Teléfono', value: '+502 1234-5678' },
        { label: 'Correo', value: 'juan.perez@example.com' },
      ],
      buttonText: 'Editar Contacto',
      imageSrc:
        'https://nosotrasmismas.org/wp-content/uploads/2020/02/contacto.jpg',
      imageAlt: 'Imagen de contacto',
    },
  },
]

export default PetDetails
