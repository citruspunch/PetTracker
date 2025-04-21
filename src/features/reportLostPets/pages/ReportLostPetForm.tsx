import Loader from '@/components/Loader'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { Textarea } from '@/components/ui/textarea'
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { cn } from '@/lib/utils'
import { routes } from '@/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar as CalendarIcon } from '@solar-icons/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import EmptyState from '../components/EmptyState'

const formSchema = z.object({
  lastSeenDate: z.date({
    required_error:
      'Es importante que indiques la fecha en la que viste por última vez a tu mascota',
  }),
  lastSeenAddress: z
    .string({
      required_error:
        'Es importante que indiques la dirección en la que viste por última vez a tu mascota',
    })
    .trim()
    .min(2),
  contactNumber: z
    .string({
      required_error: 'El teléfono de contacto es requerido',
    })
    .regex(/^\d{8}$/, 'Ingresa un número de teléfono válido'),
  notes: z.string().optional(),
})

const ReportLostPetView = () => {
  const navigate = useNavigate()
  const { petId } = useParams()

  const [isReporting, setIsReporting] = useState(false)
  const [isLoadingPet, setIsLoadingPet] = useState(true)
  const [pet, setPet] = useState<Tables<'pet'> | null>(null)

  useEffect(() => {
    const fetchPet = async () => {
      setIsLoadingPet(true)
      const result = await supabase.from('pet').select('*').eq('id', petId!)
      setIsLoadingPet(false)
      if (result.error !== null) {
        toast.error('Ocurrió un error. Inténtalo de nuevo.')
        return
      }
      if (result.data.length === 0) {
        toast.error('La mascota que intentas reportar como perdida no existe.')
        return
      }
      setPet(result.data.at(0)!)
    }
    if (petId === null) return
    fetchPet()
  }, [petId])

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsReporting(true)
    const result = await supabase.from('lost_pet_report').insert({
      pet: pet!.id,
      last_seen_address: values.lastSeenAddress,
      last_seen_date: values.lastSeenDate.toISOString(),
      contact_number: values.contactNumber,
      notes: values.notes,
    })
    setIsReporting(false)
    if (result.error !== null) {
      toast.error(
        'Ocurrió un error al reportar tu mascota como perdida. Inténtalo de nuevo.'
      )
      console.error(result.error)
      return
    }
    navigate(`${routes.petDetails}/${pet!.id}`, { replace: true })
  }

  return (
    <>
      <Navbar />
      {isLoadingPet && <Loader className="mx-auto mt-5" />}
      {/* TODO: create a proper empty state */}
      {!isLoadingPet && !pet && <EmptyState />}
      {!isLoadingPet && pet && (
        <div className="p-5">
          <h2 className="font-bold text-3xl mb-8">
            Reportar a {pet.name} como{' '}
            {pet.sex === 'male' ? 'perdido' : 'perdida'}
          </h2>
          <ReportLostPetForm
            onReport={handleSubmit}
            isReporting={isReporting}
          />
        </div>
      )}
    </>
  )
}

const ReportLostPetForm = ({
  onReport,
  isReporting,
}: {
  onReport: (values: z.infer<typeof formSchema>) => Promise<void>
  isReporting: boolean
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastSeenDate: undefined,
      lastSeenAddress: undefined,
      contactNumber: undefined,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onReport)} className="space-y-6">
        <FormField
          control={form.control}
          name="lastSeenDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Última fecha en la que fue vista tu mascota</FormLabel>
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
                      <CalendarIcon className="ml-auto h-4 w-4" />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastSeenAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Dirección donde fue vista tu mascota por última vez
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ej.: Zona 10, Ciudad Capital" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono de contacto</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ej.: 12345678" />
              </FormControl>
              <FormDescription>
                Indica un número de teléfono en donde la persona que encuentre a
                tu mascota pueda contactarte. Este número solo será visible si
                la persona escanea el tag físico de tu mascota. Ingrésalo sin
                guiones ni espacios.
              </FormDescription>
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
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Puedes mencionar datos como cuidados especiales, medicamentos
                que está tomando actualmente u otra información para que la
                persona que encuentre a tu mascota la tome en cuenta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isReporting}>
          {isReporting ? <Loader /> : <span>Reportar</span>}
        </Button>
      </form>
    </Form>
  )
}

export default ReportLostPetView
