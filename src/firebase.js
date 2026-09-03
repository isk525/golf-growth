import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
export const firebaseEnabled = Boolean(config.apiKey && config.projectId)
export const app = firebaseEnabled ? initializeApp(config) : null
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export async function ensureUser(){
  if(!auth) return null
  if(auth.currentUser) return auth.currentUser
  await signInAnonymously(auth)
  return new Promise(resolve => { const off=onAuthStateChanged(auth,u=>{if(u){off();resolve(u)}}) })
}
