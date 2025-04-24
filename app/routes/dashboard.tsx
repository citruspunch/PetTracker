import Dashboard from '@/features/Dashboard'

export function DashboardRoute() {
  return (
    <Dashboard
      heading="Panel de control"
      feature1={feature1}
      feature2={feature2}
      feature3={feature3}
      feature4={feature4}
    />
  )
}

const feature1 = {
  title: 'Resumen general',
  description:
    'Consulta el estado actual de tus mascotas registradas. Aquí verás cuántas están activas, si alguna ha sido reportada como perdida, y el estado de tus placas NFC.',
  image: '/Resumen.png',
}

const feature2 = {
  title: 'Estadísticas rápidas',
  description:
    'Visualiza datos clave como escaneos recientes, mascotas recuperadas y actividad mensual. Obtén una idea clara del movimiento en tu cuenta y del impacto de PetTracker.',
  image: '/Estadisticas.png',
}

const feature3 = {
  title: 'Tus Puntos',
  description:
    'Gana puntos por registrar mascotas, mantener actualizados sus perfiles o ayudar a otros usuarios a encontrar mascotas. Acumúlalos y canjéalos próximamente por recompensas o beneficios exclusivos.',
  image: '/Puntos.png',
}

const feature4 = {
  title: 'Comunidad',
  description:
    'Conoce historias de reencuentros, ayuda a otros usuarios reportando mascotas encontradas en tu zona y forma parte de una red que protege a los que no pueden hablar.',
  image: '/Comunidad.png',
}
