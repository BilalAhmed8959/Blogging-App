import { initializeApp  } from "firebase/app";
import { getFirestore,  } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyD2BT6A0yQof9LXHG3-0wUtjGrQ7gbE-2k",
  authDomain: "blogging-app-3ec73.firebaseapp.com",
  projectId: "blogging-app-3ec73",
  storageBucket: "blogging-app-3ec73.firebasestorage.app",
  messagingSenderId: "831566964759",
  appId: "1:831566964759:web:0e17c05d26e2184326d452"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app