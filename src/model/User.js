import { Firebase } from "../utils/Firebase";
import Model from "./Model";

export default class User extends Model
{
    constructor(id)
    {
        super();

        if(id) this.getById(id);

    }

    get name(){ return this._data.name; }
    set name(name){ this._data.name = name }

    get email(){ return this._data.email; }
    set email(email){ this._data.email = email }

    get photo(){ return this._data.photo; }
    set photo(photo){ this._data.photo = photo }

    getById(id)
    {
        return new Promise((resolve, reject) => {
            User.findByEmail(id).onSnapshot(document => {
                this.fromJSON(document.data());
    
                resolve(document);
            });
        });
    }

    save()
    {
        return User.findByEmail(this.email).set(this.toJSON());
    }

    static getRef()
    {
        return Firebase.db().collection('/users');
    }
    static findByEmail(email)
    {
        return User.getRef().doc(email);
    }
}