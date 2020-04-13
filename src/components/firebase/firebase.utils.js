import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDoEYivCW1iZmI0df-ZLdSpFlatXs53qTk",
    authDomain: "crw-db-75ad3.firebaseapp.com",
    databaseURL: "https://crw-db-75ad3.firebaseio.com",
    projectId: "crw-db-75ad3",
    storageBucket: "crw-db-75ad3.appspot.com",
    messagingSenderId: "244193800724",
    appId: "1:244193800724:web:b929148bc57c88bd482d01",
    measurementId: "G-RT2XSY2TJV"
  };

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName,email} =userAuth;
        const createdAt = new Date()
        

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating',error.message)
        }
      }

    return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;