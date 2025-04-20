import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import useUser from '@/hooks/useUser'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { PenNewRound } from '@solar-icons/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

export enum Sex {
  Male = 'male',
  Female = 'female',
}

export const animalTypes = [
  { label: 'Perro', value: 'dog' },
  { label: 'Gato', value: 'cat' },
] as const

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const formSchema = z.object({
  name: z
    .string({ required_error: 'El nombre de tu mascota es requerido.' })
    .trim()
    .min(2, 'El nombre debe contener al menos 2 caracteres.'),
  birthDate: z.date({
    required_error:
      'Es necesaria la fecha de nacimiento/adopción de tu mascota para aproximar su edad.',
  }),
  sex: z.nativeEnum(Sex, {
    required_error: 'Selecciona el sexo de tu mascota.',
  }),
  animalType: z.string({
    required_error: 'La especie de tu mascota es requerida para su registro.',
  }),
  breed: z.string().optional(),
  spayedOrNeutered: z.boolean(),
  portrait: z
    .instanceof(FileList)
    .refine(
      (files) => files?.length === 1,
      'La imagen de tu mascota es requerida.'
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.item(0)?.type ?? ''),
      'Solo archivos en formato .jpg, .jpeg, .png y .webp son aceptados.'
    )
    .refine(
      (files) => (files?.item(0)?.size ?? MAX_FILE_SIZE + 1) <= MAX_FILE_SIZE,
      'El tamaño máximo de la foto es 5MB.'
    ),
  notes: z.string().optional(),
})

type Props = {
  petId: string
  onRegisterUpdated: (pet: Tables<'pet'>) => void
  submitButtonText?: string
}

const RegisterPetForm = ({
  petId,
  onRegisterUpdated,
  submitButtonText = 'Actualizar información',
}: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const user = useUser()!

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      birthDate: undefined,
      sex: undefined,
      animalType: undefined,
      breed: undefined,
      spayedOrNeutered: false,
      notes: undefined,
    },
  })
  const portraitReference = form.register('portrait')

  const uploadPortrait = async (files: FileList): Promise<string | null> => {
    const file = files.item(0)!
    const buffer = await file.arrayBuffer()
    const result = await supabase.storage
      .from('pets-portraits')
      .upload(uuid(), buffer, { contentType: file.type })
    if (result.error !== null) return null
    return result.data.path
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true)
    const uploadedImagePath = await uploadPortrait(values.portrait)
    if (uploadedImagePath === null) {
      toast.error(
        'Ocurrió un error al editar la información de tu mascota. Inténtalo de nuevo.'
      )
      return
    }
    const updateResult = await supabase
      .from('pet')
      .update({
        name: values.name.trim(),
        birth_date: values.birthDate.toISOString(),
        sex: values.sex,
        animal_type: values.animalType,
        breed: values.breed,
        spayed_or_neutered: values.spayedOrNeutered,
        notes: values.notes,
        owner: user.id,
        image: uploadedImagePath,
      })
      .eq('id', petId)
      .select()
      .single()
    setIsUpdating(false)
    if (updateResult.error === null) {
      onRegisterUpdated(updateResult.data)
      return
    }
    toast.error(
      'Ocurrió un error al editar la información de tu mascota. Inténtalo de nuevo.'
    )
    console.error(updateResult.error)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de nacimiento/adopción</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Selecciona la fecha más aproximada de nacimiento o adopción de
                tu mascota. Esto nos servirá para aproximar su edad.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Sex.Male} />
                    </FormControl>
                    <FormLabel>Macho</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Sex.Female} />
                    </FormControl>
                    <FormLabel>Hembra</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="animalType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Especie</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? animalTypes.find((type) => type.value === field.value)
                            ?.label
                        : 'Selecciona la especie de tu mascota'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Busca la especie..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>
                        No está disponible la especie de tu mascota.
                      </CommandEmpty>
                      <CommandGroup>
                        {animalTypes.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue('animalType', type.value)
                            }}
                          >
                            {type.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                type.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raza (opcional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spayedOrNeutered"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Castrado/esterilizada</FormLabel>
                <FormDescription>
                  Si no estás seguro, deja la casilla desmarcada.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portrait"
          render={() => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <Input type="file" {...portraitReference} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Dinos qué hace peculiar y única a tu mascota"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Puedes mencionar datos como apodos a los que responde, rasgos de
                su comportamiento, gustos y observaciones al convivir con tu
                mascota.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isUpdating ? (
            <Loader />
          ) : (
            <>
              <PenNewRound weight="LineDuotone" /> {submitButtonText}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterPetForm
