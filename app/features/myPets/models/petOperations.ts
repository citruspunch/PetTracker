import type { Tables } from '@/lib/supabase/types'

export type PetOperation = {
  operation: 'delete' | 'markAsLost' | 'markAsFound' | 'edit'
  pet: Tables<'pet'>
}
