// import { useEffect, useState } from 'react';
// import supabase from '@/lib/supabase';

// const useProfileStatus = () => {
//   const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

//   useEffect(() => {
//     const fetchProfileStatus = async () => {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('is_profile_complete')
//         .single();

//       if (error) {
//         console.error('Error fetching profile status:', error.message);
//         setIsProfileComplete(false); 
//       } else {
//         setIsProfileComplete(data?.is_profile_complete ?? false);
//       }
//     };

//     fetchProfileStatus();
//   }, []);

//   return isProfileComplete;
// };

// export default useProfileStatus;