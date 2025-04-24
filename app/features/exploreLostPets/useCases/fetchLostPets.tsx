import supabase from '@/lib/supabase'
import { format } from '@formkit/tempo'
import type { fetchedLostPetType } from '../models/fetchedLostPetType'
import type { LostPetType } from '../models/lostPetType'

export const fetchLostPets = async (): Promise<LostPetType[]> => {
  // Query to fetch lost pets and the pet's properties from the database
  const lostPetsQuery = supabase
    .from('lost_pet_report')
    .select(
      `
        id,
        created_at,
        last_seen_date,
        found_date,
        last_seen_address,
        contact_number,
        pet (
          id,
          name,
          image,
          owner,
          sex,
          animal_type,
          breed,
          spayed_or_neutered,
          notes,
          birth_date
        )
      `
    )
    .is('found_date', null)
    .order('created_at', { ascending: false })

  const { data, error } = await lostPetsQuery

  console.log('Lost pets data:', data)

  if (error) {
    console.error('Error fetching lost pets:', error.message)
    return []
  }

  if (!data) {
    return []
  }

  const lostPets = data as fetchedLostPetType[]

  return lostPets.map((lostPet) => ({
    id: lostPet.id,
    created_at: format(new Date(lostPet.created_at), 'long', 'es'),
    last_seen_date: lostPet.last_seen_date,
    found_date: lostPet.found_date
      ? format(new Date(lostPet.found_date), 'long', 'es')
      : null,
    last_seen_address: lostPet.last_seen_address,
    contact_number: lostPet.contact_number,
    petId: lostPet.pet?.id,
    name: lostPet.pet?.name ?? '',
    image: lostPet.pet?.image ?? '',
    owner: lostPet.pet?.owner ?? '',
    sex: lostPet.pet?.sex ?? '',
    species: lostPet.pet?.animal_type ?? '',
    breed: lostPet.pet?.breed ?? '',
    spayed_or_neutered: lostPet.pet?.spayed_or_neutered ?? false,
    notes: lostPet.pet.notes,
    age: lostPet.pet?.birth_date ? calculateAge(lostPet.pet.birth_date) : null,
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
