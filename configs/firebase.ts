import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDlOub_SxM0lqXBme-GqyJh0-tMIqU4ueE",
  authDomain: "backend-repo-5f2b7.firebaseapp.com",
  projectId: "backend-repo-5f2b7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
