import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/utils'
import { z } from 'zod'

export const userProfileSchema = z.object({
  first_name: z
    .string({ required_error: 'El nombre es requerido' })
    .trim()
    .nonempty('El nombre no puede estar vacío'),
  last_name: z
    .string({ required_error: 'El apellido es requerido' })
    .trim()
    .nonempty('El apellido no puede estar vacío'),
  image_url: (typeof window === 'undefined' ? z.any() : z.instanceof(FileList))
    .optional()
    .refine(
      (files) =>
        files?.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.item(0)?.type ?? ''),
      'Solo archivos en formato .jpg, .jpeg, .png y .webp son aceptados.'
    )
    .refine(
      (files) =>
        files?.length === 0 ||
        (files?.item(0)?.size ?? MAX_FILE_SIZE + 1) <= MAX_FILE_SIZE,
      'El tamaño máximo permitido de la foto es 5MB.'
    ),
})
