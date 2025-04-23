import { Button } from '@/components/ui/button'
import { appRoutes } from '@/routes'
import { MdPets } from 'react-icons/md'
import { useNavigate } from 'react-router'

const NoLostPets = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <MdPets className="h-16 w-16 mb-4" />
      <p className="text-lg font-semibold ">No hay mascotas perdidas</p>
      <p className="text-sm text-muted-foreground w-5/6">
        Parece que no hay reportes de mascotas perdidas en este momento.
      </p>
      <Button
        variant="destructive"
        onClick={() => navigate(appRoutes.reportLostPet)}
        className="mt-6 mb-30 bg-red-700 text-white "
      >
        Reportar una mascota perdida
      </Button>
    </div>
  )
}

export default NoLostPets
