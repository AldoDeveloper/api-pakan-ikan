
const { initializeApp }  = require('firebase/app')
const { getFirestore }   = require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyAgo93at2V4Aa3hUdJ-BLZ2pG30G1O8foY",
    authDomain: "pakan-ikan-53b77.firebaseapp.com",
    projectId: "pakan-ikan-53b77",
    storageBucket: "pakan-ikan-53b77.appspot.com",
    messagingSenderId: "887946981391",
    appId: "1:887946981391:web:f32671a631eca55b04b37a",
    measurementId: "G-2404F6B2T7"
  };

const appFirebase  = initializeApp(firebaseConfig)
const appFirestore = getFirestore(appFirebase)

module.exports =  { appFirebase, appFirestore }