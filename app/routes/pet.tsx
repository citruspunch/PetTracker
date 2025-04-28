import Loader from '@/components/Loader'
import type { PetOperation } from '@/features/myPets/models/petOperations'
import PetDetailsView, {
  type PetDetailsViewProps,
} from '@/features/myPets/pages/PetDetailsView'
import generateSignature from '@/lib/signatureGeneration'
import supabase from '@/lib/supabase'
import { isPetDataAlreadyFilled } from '@/lib/utils'
import { appRoutes } from '@/routes'
import { redirect } from 'react-router'
import { toast } from 'sonner'
import type { Route } from './+types/pet'

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({
  params: { petId },
  request: { url },
}: Route.LoaderArgs) => {
  const receivedPetIdSignature = new URL(url).searchParams.get('hash')
  const generatedPetIdSignature = generateSignature(petId)
  console.log(generatedPetIdSignature)
  return receivedPetIdSignature === generatedPetIdSignature
}

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = async ({
  params: { petId },
  serverLoader,
}: Route.ClientLoaderArgs): Promise<Response | PetDetailsViewProps> => {
  const { data: pet, error } = await supabase
    .from('pet')
    .select('*')
    .eq('id', petId)
    .single()

  // Pet doesn't exist
  if (error !== null)
    return { pet: null, wasScannedFromTag: false, activeLostReport: null }

  if (!isPetDataAlreadyFilled(pet))
    return redirect(`${appRoutes.registerPet}/${petId}`)

  // Pet exists and its data is fulfilled
  const wasScannedFromTag = await serverLoader()

  const { data: lostReport } = await supabase
    .from('lost_pet_report')
    .select('*')
    .eq('pet', pet.id)
    .is('found_date', null)
    .single()

  return {
    pet,
    wasScannedFromTag: wasScannedFromTag,
    activeLostReport: lostReport,
  }
}

// Shows [HydrateFallback] while [clientLoader] runs and assigns type to [loaderData] to match
// return type of [clientLoader] only.
clientLoader.hydrate = true as const

export const HydrateFallback = () => (
  <div className="flex flex-col items-center mt-10">
    <Loader className="mb-3" />
    <span>Cargando mascota...</span>
  </div>
)

// eslint-disable-next-line react-refresh/only-export-components
export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const { operation, pet } = (await request.clone().json()) as PetOperation
  switch (operation) {
    case 'edit':
      return redirect(`${appRoutes.editPet}/${pet.id}`)

    case 'markAsLost':
      return redirect(`${appRoutes.reportLostPet}/${pet.id}`)

    case 'markAsFound': {
      const reportResult = await supabase
        .from('lost_pet_report')
        .select('*')
        .eq('pet', pet.id)
        .is('found_date', null)
        .single()
      if (reportResult.error !== null) {
        toast.error('Ocurrió un error. Inténtalo de nuevo.')
        return
      }
      const result = await supabase
        .from('lost_pet_report')
        .update({ found_date: new Date().toISOString() })
        .eq('id', reportResult.data.id)
      if (result.error !== null) {
        toast.error('Ocurrió un error. Inténtalo de nuevo.')
        return
      }
      toast.success(
        `${pet.name} ha sido marcada como encontrada. ¡Felicidades!`
      )
      return { activeLostReport: null }
    }

    case 'delete': {
      const result = await supabase.from('pet').delete().eq('id', pet.id)
      if (result.error !== null) {
        toast.error('Ocurrió un error. Inténtalo de nuevo.')
        return
      }
      toast.success(`La mascota ${pet.name} ha sido eliminada.`)
      break
    }
  }
}

const PetRoute = ({ loaderData, actionData }: Route.ComponentProps) => (
  <PetDetailsView
    {...loaderData}
    activeLostReport={
      actionData ? actionData.activeLostReport : loaderData.activeLostReport
    }
  />
)

export default PetRoute
