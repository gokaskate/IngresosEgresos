import { AppStateIE } from './../ingreso-egreso.reducer';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../ingresos-egresos.model';
// import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit,OnDestroy {

  items: IngresoEgreso[];
  itemsSub: Subscription = new Subscription();
  constructor( 
    private store: Store<AppStateIE>,
    public sIngresoEgreso: IngresoEgresoService

  ) { }

  ngOnInit() {
    this.itemsSub = this.store
      .select('ingresoEgreso')
      .subscribe( ie => {
        this.items = ie.items
      } )

  }

  borrarItem( uid:string ) {
    
    this.sIngresoEgreso.borrarIngresoEgreso(uid)
    

  }

  ngOnDestroy(){
    this.itemsSub.unsubscribe();
  }

}
