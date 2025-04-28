import type { Tables } from '@/lib/supabase/types'

export type PetOperation = {
  operation: 'delete' | 'reportAsLost' | 'markAsFound' | 'edit'
  pet: Tables<'pet'>
}
