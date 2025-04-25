import supabase from '@/lib/supabase'
import type { Tables } from '@/lib/supabase/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

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

export const departmentsGuatemala = [
  'Alta Verapaz',
  'Baja Verapaz',
  'Chimaltenango',
  'Chiquimula',
  'El Progreso',
  'Escuintla',
  'Guatemala',
  'Huehuetenango',
  'Izabal',
  'Jalapa',
  'Jutiapa',
  'Petén',
  'Quetzaltenango',
  'Quiché',
  'Retalhuleu',
  'Sacatepéquez',
  'San Marcos',
  'Santa Rosa',
  'Sololá',
  'Suchitepéquez',
  'Totonicapán',
  'Zacapa',
] as const

export const departmentsGuatemalaForDropdown = departmentsGuatemala.map(
  (city) => ({
    value: city,
    label: city,
  })
)

export const formatPhoneNumber = (contactNumber: string): string => {
  const cleanedNumber = contactNumber.replace(/\D/g, '')
  const formattedNumber = cleanedNumber.replace(/(\d{4})(\d{4})/, '$1-$2')
  return formattedNumber
}

export const MAX_FILE_SIZE = 5000000
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const uploadPortrait = async (
  files: FileList,
  storageBucket: string
): Promise<string | null> => {
  if (!files || files.length === 0) {
    return null
  }
  const file = files.item(0)!
  const result = await supabase.storage
    .from(storageBucket)
    .upload(uuid(), file, { contentType: file.type })
  if (result.error !== null) return null
  return result.data.path
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/

export const numberRegex = /\d/

export const isProfileComplete = (profile: Tables<'profiles'>): boolean => {
  if (!profile) return false
  if (!profile.first_name || !profile.last_name) return false
  return true
}

export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  return data
}