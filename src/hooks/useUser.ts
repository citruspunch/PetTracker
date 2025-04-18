import supabase from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'

const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  // This property avoids an infinite loop of reloads due to `setUser`
  const wasPageReloaded = useRef(true)

  useEffect(() => {
    const fetchPreviousUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error !== null) {
        setUser(null)
        wasPageReloaded.current = false
        return
      }
      setUser(data.user)
      wasPageReloaded.current = false
    }

    if (wasPageReloaded.current) fetchPreviousUser()
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(`New auth state -> ${event}`)
      switch (event) {
        case 'SIGNED_IN':
          setUser(session?.user as User)
          break
        case 'SIGNED_OUT':
          setUser(null)
          break
        default:
          break
      }
    })
  })
  return user
}

export default useUser
