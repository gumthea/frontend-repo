import { User } from './user';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/configs/firebase';

const BASE_URL = 'http://localhost:5001/backend-repo-5f2b7/us-central1/api/user';

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user) {
      throw new Error('Login failed');
    }

    return await user.getIdToken();
  } catch (error: any) {
    const firebaseErrorMap: Record<string, string> = {
      'auth/invalid-credential': 'Invalid email or password',
    };

    const message =
      firebaseErrorMap[error.code] ||
      error.message ||
      'An unknown error occurred during login';

    throw new Error(message);
  }
};

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem('token');
  await signOut(auth);
}

export const fetchUserDataApi = async (token: string) => {
  const response = await fetch(`${BASE_URL}/fetch-user-data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export const updateUserDataApi = async (token: string, data: User) => {
  const response = await fetch(`${BASE_URL}/update-user-data`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};