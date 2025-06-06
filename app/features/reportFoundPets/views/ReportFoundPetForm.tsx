import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
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
import { departmentsGuatemalaForDropdown } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useFetcher } from 'react-router'
import { z } from 'zod'
import CitiesGuatemalaDropdown from '../components/dropdownMenu'
import foundPetReportFormSchema from '../models/foundPetReportFormSchema'

type Props = {
  petName: string
  submitButtonText?: string
  onReport: (values: z.infer<typeof foundPetReportFormSchema>) => Promise<void>
}

const ReportFoundPetForm = ({
  petName,
  submitButtonText = 'Reportar',
  onReport,
}: Props) => {
  const form = useForm<z.infer<typeof foundPetReportFormSchema>>({
    resolver: zodResolver(foundPetReportFormSchema),
    defaultValues: {
      city: 'Guatemala',
      location: '',
      contactNumber: '',
      notes: '',
    },
  })

  const fetcher = useFetcher({ key: 'found-pet-report' })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onReport)} className="space-y-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departamento</FormLabel>
              <FormControl>
                <CitiesGuatemalaDropdown
                  departments={departmentsGuatemalaForDropdown}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Indica la dirección donde encontraste a {petName}. Ej: Calle
                1-23, Zona 1
              </FormDescription>
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
                <Input type="tel" {...field} />
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
              <FormLabel>Notas adicionales</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={3}
                  className="w-full rounded-md border border-gray-200 p-2"
                />
              </FormControl>
              <FormDescription>
                Si tienes alguna información adicional sobre {petName}, puedes
                incluirla aquí.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {fetcher.state !== 'idle' ? (
            <Loader />
          ) : (
            <>
              <CircleAlert /> {submitButtonText}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ReportFoundPetForm
