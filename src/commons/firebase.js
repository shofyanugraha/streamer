import * as firebase from 'firebase';

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: 'YOUR_STORAGE_BUCKET',
};
firebase.initializeApp(config);

export default firebase;
