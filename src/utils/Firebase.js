const firebase = require('firebase/app');
require('firebase/firebase-storage');
require('firebase/firestore');
require('firebase/auth');

export class Firebase
{
    constructor()
    {
        this._config = {
            apiKey: "AIzaSyAP-m9GBk99G_ImOYH4qTu4ypxUoBKUaLU",
            authDomain: "whatsapp-clone-3f506.firebaseapp.com",
            projectId: "whatsapp-clone-3f506",
            storageBucket: "whatsapp-clone-3f506.appspot.com",
            messagingSenderId: "727669451102",
            appId: "1:727669451102:web:5ed6acfca1b221e5d787cf",
            measurementId: "G-VNE8TDS27Y"
          };
        this.init();
    }

    init()
    {
        if(!window._initializedFirebase)
        {
            firebase.initializeApp(this._config);
            
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }
    }

    static db()
    {
        return firebase.firestore();
    }

    static hd()
    {
        return firebase.storage();
    }

    initAuth()
    {
        return new Promise((resolve, reject) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth()
                .signInWithPopup(provider)
                .then(resp => {
                    let token = resp.credential.accessToken;
                    let user = resp.user;
                    resolve({ user, token });
                })
                .catch(err => {
                    reject(err);
            });
        });
    }
}