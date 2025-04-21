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
import { citiesGuatemalaForDropdown } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CitiesGuatemalaDropdown from '../components/dropdownMenu'
import { reportFoundPetSchema } from '../models/formSchemas'


type Props = {
  petName: string
  submitButtonText?: string
  onReport: (values: z.infer<typeof reportFoundPetSchema>) => Promise<void>
  isLoading: boolean
}

const ReportFoundPetForm = ({
  petName,
  submitButtonText = 'Reportar mascota encontrada',
  onReport,
  isLoading,
}: Props) => {
  const form = useForm<z.infer<typeof reportFoundPetSchema>>({
    resolver: zodResolver(reportFoundPetSchema),
    defaultValues: {
      city: undefined,
      location: undefined,
      contactPhone: undefined,
      notes: undefined,
    },
  })

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
                  cities={citiesGuatemalaForDropdown}
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
                {`Indica la dirección donde encontraste a ${petName}.`}
                <br /> Ejemplo: Calle 1-23, Zona 1
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono de contacto</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormDescription>
                {`Número de teléfono donde podemos contactarte para coordinar la entrega de ${petName}.`}
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
              <CircleAlert /> {submitButtonText}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ReportFoundPetForm
