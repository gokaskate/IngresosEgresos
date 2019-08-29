import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean
  subscripcion: Subscription = new Subscription()

  constructor( 
    public sAuth: AuthService,
    public store: Store<AppState> ) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading )
  }

  onSubmit(data:any){
    this.sAuth.crearUsuario(data.email, data.password, data.nombre)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscripcion.unsubscribe()
  }

}
