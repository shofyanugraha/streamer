import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCdpk-1XHEaakmPjhoW7PxRt_L1PH4Pzww',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'https://streamer-3959d.firebaseio.com/',
  projectId: 'streamer-3959d',
  storageBucket: 'YOUR_STORAGE_BUCKET',
};
firebase.initializeApp(config);

export default firebase;
