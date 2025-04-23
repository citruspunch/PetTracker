import { AnimalSex } from '@/lib/animalSex'
import { animalTypes } from '@/lib/animalTypes'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const formSchemaForUpdate = z.object({
  name: z
    .string({ required_error: 'El nombre de tu mascota es requerido.' })
    .trim()
    .min(2, 'El nombre debe contener al menos 2 caracteres.'),
  birthDate: z.date({
    required_error:
      'Es necesaria la fecha de nacimiento/adopción de tu mascota para aproximar su edad.',
  }),
  sex: z.nativeEnum(AnimalSex, {
    required_error: 'Selecciona el sexo de tu mascota.',
  }),
  animalType: z.enum(animalTypes, {
    required_error: 'La especie de tu mascota es requerida para su registro.',
  }),
  breed: z.string().optional(),
  spayedOrNeutered: z.boolean(),
  portrait: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => files?.length === 0 || files?.length === 1 ,
      'La imagen de tu mascota es requerida.'
    )
    .refine(
      (files) => files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.item(0)?.type ?? ''),
      'Solo archivos en formato .jpg, .jpeg, .png y .webp son aceptados.'
    )
    .refine(
      (files) => files?.length === 0 || (files?.item(0)?.size ?? MAX_FILE_SIZE + 1) <= MAX_FILE_SIZE,
      'El tamaño máximo de la foto es 5MB.'
    ),
  notes: z.string().optional(),
})
