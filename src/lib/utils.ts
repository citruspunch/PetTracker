import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Tables } from './supabase-types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isPetDataAlreadyFilled = (pet: Tables<'pet'>) => {
  return pet.name && pet.owner && pet.sex && pet.animal_type
}

type Age = { years: number; months: number; days: number }

export const calculateAge = (birthDate: string): Age => {
  const today = new Date()
  const birth = new Date(birthDate)
  const ageInMilliseconds = today.getTime() - birth.getTime()
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24))
  const daysPerMonth = 30
  const daysPerYear = 365

  const years = Math.floor(ageInDays / daysPerYear)
  const remainingDays = ageInDays - years * daysPerYear
  const months = Math.floor(remainingDays / daysPerMonth)
  const days = remainingDays - months * daysPerMonth
  return { years: years, months: months, days: days }
}

export const formatAge = ({ days, months, years }: Age): string => {
  if (years === 1) return '1 año'
  if (years !== 0) return `${years} años`
  if (months === 1) return '1 mes'
  if (months !== 0) return `${months} meses`
  return `${days} días`
}

export const formatAnimalSex = (sex: string): string => {
  switch (sex) {
    case 'male':
      return 'Macho'
    case 'female':
      return 'Hembra'
    default:
      throw new Error('Unexpected sex value')
  }
}
