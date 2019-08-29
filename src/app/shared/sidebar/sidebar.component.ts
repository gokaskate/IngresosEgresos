import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  user:User
  userSub: Subscription = new Subscription()

  constructor( 
    private store: Store<AppState>, 
    private  sAuth: AuthService  ) { }

  ngOnInit() {
    this.userSub = this.store
      .select('authUser')
      .pipe( filter( auth => auth != null ))
      .subscribe( auth => this.user = auth.user )
  }

  cerrarSesion(){
    this.sAuth.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
