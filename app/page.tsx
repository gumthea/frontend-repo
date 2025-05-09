'use client';

import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/main');
    } else {
      setCheckedAuth(true);
    }
  }, [router]);

  if (!checkedAuth) return null;

  return <LoginForm />;
}
