import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
        if(!this._initialized)
        {
            this._app = initializeApp(this._config);
            this._db = getFirestore(this._app);
            this._storage = getStorage(this._app);
            
            this._db.settings({
                timestampsInSnapshots: true,
            });

            this._initialized = true;
        }
    }

    static db()
    {
        return this._db;
    }

    static hd()
    {
        return this._storage
    }
}