export type LostPetType = {
  id: string
  created_at: string
  is_active: boolean
  last_seen_date: string
  found_date: string | null
  last_seen_address: string
  contact_number: string | null
  petId: string
  name: string | null
  image: string | null
  owner: string | null
  species: string | null    
  breed: string | null
  spayed_or_neutered: boolean | null
  notes: string
  age: string | null
}
