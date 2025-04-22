export type fetchedPetType = {
  id: string
  created_at: string
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
