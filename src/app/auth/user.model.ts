

export class User {
public nombre:string
public email: string
public uid: string

    constructor ( obj: IUser ) { 
        this.nombre = obj && obj.nombre || null
        this.email = obj && obj.email || null
        this.uid = obj && obj.uid || null
     }
   
}

interface IUser {
    uid:string;
    email:string;
    nombre:string;
}