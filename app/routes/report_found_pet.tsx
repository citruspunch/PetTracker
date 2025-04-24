import type { FoundPetReportData } from '@/features/reportFoundPets/models/FoundPetReportData'
import FoundPetEmailTemplate from '@/features/reportFoundPets/views/FoundPetEmailTemplate'
import ReportFoundPetView from '@/features/reportFoundPets/views/ReportFoundPetView'
import supabase from '@/lib/supabase'
import { appRoutes } from '@/routes'
import { redirect } from 'react-router'
import { Resend } from 'resend'
import { toast } from 'sonner'
import type { Route } from './+types/report_found_pet'

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: Route.ActionArgs) => {
  const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)
  const formData: FoundPetReportData = await request.clone().json()
  const { data } = await resend.emails.send({
    from: 'Pet Tracker <onboarding@resend.dev>',
    to: 'pettracker.gt@gmail.com',
    subject: `Encontraron a ${formData.pet.name}`,
    react: FoundPetEmailTemplate(formData),
  })
  return data !== null
}

// eslint-disable-next-line react-refresh/only-export-components
export const clientAction = async ({
  serverAction,
  request,
}: Route.ClientActionArgs) => {
  const formData: FoundPetReportData = await request.clone().json()
  const { error } = await supabase.from('found_pet_report').insert({
    pet: formData.pet.id,
    city: formData.city,
    location: formData.location,
    contact_number: formData.contactNumber,
    notes: formData.notes,
  })
  if (error) {
    toast.error(
      'Ocurrió un error al reportar a la mascota. Inténtalo de nuevo.'
    )
    return
  }
  const wasEmailSent = await serverAction()
  if (wasEmailSent) {
    toast.success(
      `Se notificó al dueño de ${formData.pet.name} acerca de tu reporte. ¡Gracias!`
    )
    return redirect(`${appRoutes.petDetails}/${formData.pet.id}`)
  } else
    toast.error(
      'Ocurrió un error al reportar a la mascota. Inténtalo de nuevo.'
    )
}

const Component = () => <ReportFoundPetView />

export default Component
