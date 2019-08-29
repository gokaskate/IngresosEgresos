import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( private sAuth: AuthService  ) { }

  canActivate() { 
    return this.sAuth.isAuth()  
  }

  canLoad( ) { 
    return this.sAuth.isAuth().pipe( take(1) ) 
  }
  
}
