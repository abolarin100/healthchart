import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDKMt4KLoKIYXa-EBxBSuQxKJH7i3Wu2Sc",
  authDomain: "fir-9-22ed4.firebaseapp.com",
  projectId: "fir-9-22ed4",
  storageBucket: "fir-9-22ed4.appspot.com",
  messagingSenderId: "1015000857610",
  appId: "1:1015000857610:web:8b48b393dbe68aa2d173f3"
};

// Initialize Firebase
initializeApp(firebaseConfig);


// init firestore service
const db = getFirestore()
export default db