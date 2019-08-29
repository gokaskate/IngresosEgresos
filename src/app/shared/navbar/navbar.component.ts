import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../../auth/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  user:User
  userSub: Subscription = new Subscription()

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.userSub = this.store
      .select('authUser')
      .subscribe( auth => this.user = auth.user )
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

}
