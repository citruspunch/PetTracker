import useUser from '@/hooks/useUser'
import CompleteProfileCard from './CompleteProfileCard'
import { useEffect, useState } from 'react'

const CompleteProfileView = () => {
  const user = useUser()!
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])
  return (
    <>
      {!loading && <CompleteProfileCard userId={user.id} />}
    </>
  )
}

export default CompleteProfileView
