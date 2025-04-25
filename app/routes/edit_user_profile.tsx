import Navbar from '@/components/navbar'
import CompleteProfileView from '@/features/profile/views/CompleteProfileView'

const Component = () => (
  <>
  <Navbar />
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <CompleteProfileView />
    </div>
  </>
)

export default Component
