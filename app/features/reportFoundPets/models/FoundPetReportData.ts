import type { Tables } from '@/lib/supabase/types'
import type { z } from 'zod'
import foundPetReportFormSchema from './foundPetReportFormSchema'

export type FoundPetReportData = z.infer<typeof foundPetReportFormSchema> & {
  pet: Tables<'pet'>
  finderName: string
  ownerEmail: string
}
