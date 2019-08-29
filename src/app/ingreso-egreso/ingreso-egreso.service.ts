import { SetItemsAction } from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import {  AuthService } from '../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingresos-egresos.model';

import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class IngresoEgresoService {

    private ingresoEgresoListenerSub: Subscription = new Subscription();
    private ingresoEgresoItemsSub:    Subscription = new Subscription();

    constructor( 
        private afDB: AngularFirestore,
        public sAuth: AuthService,
        private store:Store<AppState> 
     ) { }

    IngresoEgresoListener(){
        this.ingresoEgresoListenerSub = 
            this.store
                .select('authUser')
                .pipe( 
                    filter( auth => auth.user!=null  )
                )
                .subscribe( auth => this.ingresoEgresoItems(auth.user.uid) )


    }

    private ingresoEgresoItems( uid: string ){
        this.ingresoEgresoItemsSub = this.afDB
            .collection( `${uid}/ingresos-egresos/items` )
            .snapshotChanges()
            .pipe(
                map( docs => {
                    return docs.map( doc =>{
                        return {
                            uid: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                        }
                    } )
                } )
            )
            .subscribe( (userItems:any[]) => {
                this.store.dispatch( new SetItemsAction( userItems ) )
            } )
    }

    cancelarSubs(){ 
        this.ingresoEgresoItemsSub.unsubscribe()
        this.ingresoEgresoListenerSub.unsubscribe()
    }

    crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
        const userUid = this.sAuth.getUser().uid
        
        return  this.afDB.doc( `${userUid}/ingresos-egresos` )
            .collection('items').add( {...ingresoEgreso}  )
            
    }
    borrarIngresoEgreso(uid: string  ) {
        const userUid = this.sAuth.getUser().uid
        this.afDB
            .doc(`${userUid}/ingresos-egresos/items/${uid}`)
            .delete();
            
    }
}

