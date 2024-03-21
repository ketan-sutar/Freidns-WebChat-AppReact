import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import firebase from 'firebase/app'; // Remove this line
import 'firebase/database';
import { getDatabase, ref, onValue, set, update, remove } from 'firebase/database';
import { getStorage, uploadBytes } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCOSDhDLjHqiyj815OOSUE7a78Ib4sTWaU',
  authDomain: 'chat-app-web-4e13c.firebaseapp.com',
  databaseURL: 'https://chat-app-web-4e13c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chat-app-web-4e13c',
  storageBucket: 'chat-app-web-4e13c.appspot.com',
  messagingSenderId: '287271966190',
  appId: '1:287271966190:web:5c725bff19876c98ccaaff',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage, ref, uploadBytes, onValue, set, update, remove,app };