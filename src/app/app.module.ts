import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// main component
import { AppComponent } from './app.component';

//forms
import {  ReactiveFormsModule } from '@angular/forms';


//modules
import { AppRoutingModule } from './app.routing.module';

//modulos personalizados
import { AuthModule } from './auth/auth.module';

//firebase 
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { Ng2IziToastModule } from 'ng2-izitoast';
import { StoreModule } from '@ngrx/store';

//NG RX
import { AppReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //AngularFire2
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    Ng2IziToastModule,
    StoreModule.forRoot( AppReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    //modulos personalizados
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
