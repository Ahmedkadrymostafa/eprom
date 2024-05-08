'use client'
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// const LogoutOnClose = (props: any) => {
//     const router = useRouter();
  
//     useEffect(() => {
//       const handleWindowClose = async () => {
//         try {
//           const response = await axios.put('/api/auth/login/session', { email: props.email });
  
//           if (response.status === 200) {
//             router.push('/');
//           }
//         } catch (error) {
//           console.error('Logout failed:', error);
//         }
//       };
  
//       // Add event listener when component mounts
//       window.addEventListener('beforeunload', handleWindowClose);
  
//       // Remove event listener when component unmounts
//       return () => {
//         window.removeEventListener('beforeunload', handleWindowClose);
//       };
//     }, [props.email, router]);
  
//     return null; // This component doesn't render anything
//   };
  
//   export default LogoutOnClose;

const LogoutOnClose = (props: any) => {
  const router = useRouter();

    useEffect(() => {
    const handleWindowClose = async () => {
        await axios.put('/api/auth/login/session', {email: props.email}).then((response) => {
            if (response.status === 200) {
                router.push('/')
            }
        }).catch((error) => console.log(error));
    };

    // Add event listener when component mounts
    window.addEventListener('beforeunload', handleWindowClose);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default LogoutOnClose;