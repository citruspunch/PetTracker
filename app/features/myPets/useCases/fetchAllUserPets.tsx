import supabase from '@/lib/supabase'
import { format } from '@formkit/tempo'
import { fetchedPetType } from '../models/fetchedPetType'
import { petType } from '../models/petType'
import { User } from '@supabase/supabase-js'

export const fetchAllUserPets = async (user: User | null): Promise<petType[]> => {
  if (!user) {
    console.error('User is not logged in');
    return [];
  }
  const petsQuery = supabase
    .from('pet')
    .select('*')
    .eq('owner', user!.id)

  const { data, error } = await petsQuery

  console.log('Pets data:', data)

  if (error) {
    console.error('Error fetching pets:', error.message)
    return []
  }

  if (!data) {
    return []
  }

  const userPets = data as fetchedPetType[]

  return userPets.map((lostPet) => ({
    id: lostPet.id,
    created_at: format(new Date(lostPet.created_at), 'dd/MM/yyyy'),
    name: lostPet.name,
    image: lostPet.image,
    owner: lostPet.owner,
    sex: lostPet.sex,
    species: lostPet.animal_type,
    breed: lostPet.breed,
    spayed_or_neutered: lostPet.spayed_or_neutered,
    notes: lostPet.notes,
    age: lostPet.birth_date ? calculateAge(lostPet.birth_date) : null,
  }))
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
