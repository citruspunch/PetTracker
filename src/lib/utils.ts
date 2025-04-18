import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Tables } from './supabase-types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isPetDataAlreadyFilled = (pet: Tables<'pet'>) => {
  return pet.name && pet.owner && pet.sex && pet.animal_type
}
