import type { User } from '@supabase/supabase-js'
import { useOutletContext } from 'react-router'

const useUser = () => useOutletContext<User | null>()

export default useUser
