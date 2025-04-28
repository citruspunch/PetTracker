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
import { AnimalSex } from '@/lib/animalSex'
import { animalTypes, formatAnimalType } from '@/lib/animalTypes'
import supabase from '@/lib/supabase'
import { type Tables } from '@/lib/supabase/types'
import { cn, uploadPortrait } from '@/lib/utils'
import { format } from '@formkit/tempo'
import { zodResolver } from '@hookform/resolvers/zod'
import { PenNewRound } from '@solar-icons/react'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { es } from 'react-day-picker/locale'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { formSchemaForRegister } from '../models/formSchemaForRegister'
import { formSchemaForUpdate } from '../models/formSchemaForUpdate'

type Props = {
  petId: string
  onRegisterUpdated: (pet: Tables<'pet'>) => void
  submitButtonText?: string
  isUpdate?: boolean
  previousValues?: {
    name: string
    birthDate: Date | undefined
    sex: AnimalSex | undefined
    animalType: 'dog' | 'cat' | undefined
    breed: string | undefined
    spayedOrNeutered: boolean | undefined
    image: string | undefined
    notes: string | undefined
  }
}

const RegisterPetForm = ({
  petId,
  onRegisterUpdated,
  submitButtonText = 'Actualizar información',
  previousValues,
  isUpdate = false,
}: Props) => {
  const formSchema = isUpdate ? formSchemaForUpdate : formSchemaForRegister

  const [isLoading, setIsLoading] = useState(false)

  const petImageUrl = previousValues?.image
    ? supabase.storage.from('pets-portraits').getPublicUrl(previousValues.image)
        .data.publicUrl
    : undefined

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    petImageUrl
  )
  const user = useUser()!

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: previousValues?.name || '',
      birthDate: previousValues?.birthDate || undefined,
      sex: previousValues?.sex || undefined,
      animalType: previousValues?.animalType || undefined,
      breed: previousValues?.breed || undefined,
      spayedOrNeutered: previousValues?.spayedOrNeutered || false,
      notes: previousValues?.notes || undefined,
    },
  })
  const portraitReference = form.register('portrait')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const uploadedImagePath = values.portrait?.length
      ? await uploadPortrait(values.portrait, 'pets-portraits')
      : previousValues?.image
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
    setIsLoading(false)
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
                        format(field.value, 'long', 'es')
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
                    autoFocus
                    locale={es}
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
                      <RadioGroupItem value={AnimalSex.Male} />
                    </FormControl>
                    <FormLabel>Macho</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={AnimalSex.Female} />
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
                        ? formatAnimalType(field.value)
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
                            value={formatAnimalType(type)}
                            key={type}
                            onSelect={() => {
                              form.setValue('animalType', type)
                            }}
                          >
                            {formatAnimalType(type)}
                            <Check
                              className={cn(
                                'ml-auto',
                                type === field.value
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
                <div className="flex flex-col items-center space-y-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  )}
                  <Input
                    type="file"
                    {...portraitReference}
                    onChange={(event) => {
                      handleImageChange(event)
                    }}
                  />
                </div>
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
          {isLoading ? (
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
