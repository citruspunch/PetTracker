import { departmentsGuatemala } from '@/lib/utils'
import { z } from 'zod'

const foundPetReportFormSchema = z.object({
  city: z.enum(departmentsGuatemala, {
    required_error: 'La ciudad es requerida',
  }),
  location: z
    .string({ required_error: 'La ubicación es requerida' })
    .trim()
    .min(5, 'La ubicación debe contener al menos 5 caracteres.'),
  contactNumber: z
    .string({
      required_error: 'El teléfono de contacto es requerido',
      invalid_type_error: 'Ingresa únicamente números',
    })
    .regex(/^\d{8}$/, 'Ingresa un número de teléfono válido'),
  notes: z.string().optional(),
})

export default foundPetReportFormSchema
