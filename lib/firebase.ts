// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAwY3HJsqgBDA3bwRHp0EZlIhunQ6naVrw',
  authDomain: 'secret-santa-2ca01.firebaseapp.com',
  databaseURL:
    'https://secret-santa-2ca01-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'secret-santa-2ca01',
  storageBucket: 'secret-santa-2ca01.appspot.com',
  messagingSenderId: '307011939179',
  appId: '1:307011939179:web:febbee36850991e6477a2e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { app, firestore };
