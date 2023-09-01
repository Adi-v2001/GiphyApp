'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuth} from './Context/AuthContext';

const ProtectedRoute = ({ children }) => {

  const {user} = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if(!user){
      router.push('/Login');
    }
  },[user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;