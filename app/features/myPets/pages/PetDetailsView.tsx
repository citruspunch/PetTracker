import Navbar from '@/components/navbar'
import { type Tables } from '@/lib/supabase/types'
import ErrorView from './ErrorView'
import FilledPetDataView from './FilledPetDataView'
import LostPetAlert from './LostPetAlert'

export type PetDetailsViewProps = {
  pet: Tables<'pet'> | null
  wasScannedFromTag: boolean
  activeLostReport: Tables<'lost_pet_report'> | null
}

const PetDetailsView = ({
  pet,
  wasScannedFromTag,
  activeLostReport,
}: PetDetailsViewProps) => {
  return (
    <>
      <Navbar />
      {!pet && (
        <div className="p-3">
          <ErrorView message="La mascota que buscas no está registrada." />
        </div>
      )}
      {pet && (
        <section className="mx-auto container py-12">
          {wasScannedFromTag && activeLostReport !== null && (
            <LostPetAlert pet={pet} className="mb-5 mx-7" />
          )}
          <FilledPetDataView pet={pet} activeLostReport={activeLostReport} />
        </section>
      )}
    </>
  )
}

export default PetDetailsView
