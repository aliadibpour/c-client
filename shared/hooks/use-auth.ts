import { useState } from 'react';
import { loginApi, verifyApi } from '../lib/auth-api';

export const useLogin = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (phoneNumber: string) => {
    setIsLoading(true);
    setError('');
    try {
      await loginApi(phoneNumber);//success
    } catch (err: any) {
      setError(err.message || 'خطا در ورود');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleLogin,
  };
};

export const useVerify = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (code: string) => {
    setIsLoading(true);
    setError('');
    try {
      await verifyApi(code);//success
    } catch (err: any) {
      setError(err.message || 'خطا در ورود');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleLogin,
  };
};
