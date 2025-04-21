export type fetchedLostPetType = {
  id: string
  created_at: string
  last_seen_date: string
  found_date: string | null
  last_seen_address: string
  contact_number: string | null
  pet: {
    id: string
    name: string | null
    image: string | null
    owner: string | null
    sex: string | null
    animal_type: string | null
    breed: string | null
    spayed_or_neutered: boolean | null
    notes: string
    birth_date: string | null
  }
}
