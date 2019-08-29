import { AppState } from '../../app.reducer';
import { AuthService } from '../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;
  subscripcion: Subscription

  constructor(
    private store:Store<AppState>,
    private sAuth: AuthService ) {  }

  ngOnInit() {
    this.subscripcion = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading )
  }

  onSubmit(data: any  ){
    
    this.sAuth.login( data.email, data.password )


  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe()
  }

}
