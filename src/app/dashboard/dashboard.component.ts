import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private sIngresoEgreso: IngresoEgresoService,
    public sAuth:AuthService) { }

  ngOnInit() {
    this.sAuth.initAuthListener();
    this.sIngresoEgreso.IngresoEgresoListener();

  }

  ngOnDestroy(){
    
  }

}
