// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBm5gBvsxRTmNXm421zKVge1IwKRnf_npk",
    authDomain: "wilenvote.firebaseapp.com",
    databaseURL: "https://wilenvote.firebaseio.com",
    projectId: "wilenvote",
    storageBucket: "wilenvote.appspot.com",
    messagingSenderId: "222104883477",
    appId: "1:222104883477:web:157218a36dcbbf5b"
  }
};
