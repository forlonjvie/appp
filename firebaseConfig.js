import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByygOL0FKz5py3ujLOxM_VCX2_FdiIsCI",
  authDomain: "neighborease-announcement.firebaseapp.com",
  projectId: "neighborease-announcement",
  storageBucket: "neighborease-announcement.appspot.com",
  messagingSenderId: "780080096839",
  appId: "1:780080096839:web:98be095b312f5ceb583362",
  databaseURL: "https://neighborease-announcement-default-rtdb.firebaseio.com/"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };