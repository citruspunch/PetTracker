import supabase from '@/lib/supabase/supabase'
import { format } from '@formkit/tempo'
import { User } from '@supabase/supabase-js'
import { fetchedPetType } from '../models/fetchedPetType'
import { petType } from '../models/petType'

export const fetchUserPet = async (
  user: User | null,
  petId: string
): Promise<petType | null> => {
  if (!user) {
    console.error('User is not logged in')
    return null
  }
  const petsQuery = supabase
    .from('pet')
    .select('*')
    .eq('owner', user!.id)
    .eq('id', petId)
    .single()

  const { data, error } = await petsQuery

  console.log('User Pet data:', data)

  if (error) {
    console.error('Error fetching pets:', error.message)
    return null
  }

  if (!data) {
    return null
  }

  const userPet = data as fetchedPetType

  return {
    id: userPet.id,
    created_at: format(new Date(userPet.created_at), 'dd/MM/yyyy'),
    name: userPet.name,
    image: userPet.image,
    owner: userPet.owner,
    sex: userPet.sex,
    species: userPet.animal_type,
    breed: userPet.breed,
    spayed_or_neutered: userPet.spayed_or_neutered,
    notes: userPet.notes,
    age: userPet.birth_date ? calculateAge(userPet.birth_date) : null,
  }
}

const calculateAge = (birthDate: string): string => {
  const today = new Date()
  const birth = new Date(birthDate)
  const ageInMilliseconds = today.getTime() - birth.getTime()
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24))

  if (ageInDays < 30) {
    return `${ageInDays} dias`
  } else if (ageInDays < 365) {
    return Math.floor(ageInDays / 30) === 1
      ? `${Math.floor(ageInDays / 30)} mes`
      : `${Math.floor(ageInDays / 30)} meses`
  } else {
    return `${Math.floor(ageInDays / 365)} años`
  }
}
