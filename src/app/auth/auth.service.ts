import { SetUserActions } from './auth.actions';
import { AppState } from '../app.reducer';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Ng2IzitoastService } from 'ng2-izitoast';

import { map } from 'rxjs/operators'
import * as firebase from "firebase";
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import { 
  ActivarLoadingAction, 
  DesactivarLoadingAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User
  private userSubscription : Subscription =  new Subscription()

  constructor( 
    private store:Store<AppState>,
    public  iziToast: Ng2IzitoastService,
    //private sIngresoEgreso: IngresoEgresoService,
    private afAuth:AngularFireAuth,
    private afDB: AngularFirestore,
    private router:Router ) { }

  isAuth() {
    return this.afAuth.authState
      .pipe(map( fbUser => {
        if (fbUser === null) this.router.navigate( ['/login'] )
        return fbUser != null
      } ))
  }
  
  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe( fbUser => {
      if (fbUser){
        this.afDB.doc( `${fbUser.uid}/usuario` ).valueChanges()
          .subscribe( (loadUser:any )=> {
              const newUser = new User( loadUser )
              this.store.dispatch(new SetUserActions( newUser ))
              this.user = newUser
          } )
      } else {
        this.user = null
        this.store.dispatch(new SetUserActions( this.user ))
        this.userSubscription.unsubscribe()
      }
    }  )
  }

  getUser(){ return {...this.user} }

  // metodo para crearUsuario
  guardarUsuarioEnDB(resp: any, nombre){
    const user: User = {
      uid: resp.user.uid,
      nombre: nombre,
      email: resp.user.email
    }

    this.afDB.doc( `${ user.uid }/usuario` )
      .set( user )
      .then( _ => {
        this.router.navigate([ '/' ])
        this.store.dispatch( new DesactivarLoadingAction() )
      }  )
  }

  crearUsuario(  email, password, nombre? ){
    this.store.dispatch( new ActivarLoadingAction() )
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then( resp => {
        
        this.guardarUsuarioEnDB(resp, nombre)

      } )
      .catch ( err => {
        this.store.dispatch( new DesactivarLoadingAction())
        this.iziToast.error({
              title: 'Ups! Fallo el Registro',
              message: err.message ,
          });
      } )
  }

  login( email, password ){
    this.store.dispatch( new ActivarLoadingAction() )
    this.afAuth.auth
      .signInWithEmailAndPassword( email, password )
      .then( resp => {

        this.router.navigate([ '/' ])
        this.store.dispatch( new DesactivarLoadingAction() )

      } )
      .catch ( err => {
        this.store.dispatch( new DesactivarLoadingAction() )
        this.iziToast.error({
              title: 'Ups! Fallo el login',
              message: err.message ,
          });
      } )

  }

  logout(){
    this.router.navigate( ['/login'] )
    this.afAuth.auth
      .signOut()
      .then( _ => {
        //this.sIngresoEgreso.cancelarSubs()
        this.iziToast.show({
              title: 'Hasta luego :D',
          });
      } )

  }


}
