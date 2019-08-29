import { AppStateIE } from './../ingreso-egreso.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingresos-egresos.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public doughnutChartLabels:string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData:number[];

  ingresos: number
  egresos: number

  conteoIngresos: number
  conteoEgresos: number

  itemsSub:Subscription =  new Subscription();

  constructor(
    private store: Store<AppStateIE>
  ) { }

  ngOnInit() {
    this.itemsSub = this.store
    .select('ingresoEgreso')
    .subscribe( ie => {
      this.contarIngresoEgreso(ie.items)
    } )
  }

  contarIngresoEgreso( items:IngresoEgreso[] ) {
    this.conteoEgresos = 0;
    this.conteoIngresos = 0;

    this.ingresos = 0;
    this.egresos = 0;

    items.forEach( item => {
      if ( item.tipo === 'ingreso' ){
        this.ingresos += item.monto
        this.conteoIngresos++;
      } else {
        this.egresos += item.monto
        this.conteoEgresos++;
      }
      
    } )

    this.doughnutChartData = [this.ingresos, this.egresos]
    
  }

  showGrafica() {
    return (this.ingresos > 0) || (this.egresos > 0)
  }

}
