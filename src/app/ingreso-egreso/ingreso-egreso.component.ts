import { AppStateIE } from './ingreso-egreso.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingresos-egresos.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {

  formIgresoEgreso: FormGroup
  tipo = 'ingreso'
  loadingSub: Subscription = new Subscription()
  loading: boolean
  
  constructor( 
    private store: Store<AppStateIE>,
    public sIngresoEgreso: IngresoEgresoService,
    public iziToast:Ng2IzitoastService
   ) { }

  ngOnDestroy(){ this.loadingSub.unsubscribe() }

  ngOnInit() {
    this.store.select('ui')
      .subscribe( ui => this.loading = ui.isLoading )

    this.buildFormIgresoEgreso()
  }

  buildFormIgresoEgreso(){
    this.formIgresoEgreso = new FormGroup({
      description: new FormControl( '', Validators.required ),
      monto: new FormControl(0 , Validators.min(0) ),

    })

  }

  cambiarTipoIngresoEgreso(){
    if (this.tipo === 'ingreso') {this.tipo = 'egreso'}
    else {this.tipo = 'ingreso'}
  }
 
  agregarIngresoEgreso(){
    this.store.dispatch( new ActivarLoadingAction() )
    
    const ingresoEgreso = new IngresoEgreso( {
      ...this.formIgresoEgreso.value, tipo: this.tipo  } )
    
    this.sIngresoEgreso.crearIngresoEgreso( ingresoEgreso )
      .then( _ => {
        this.store.dispatch( new DesactivarLoadingAction() )
        this.formIgresoEgreso.reset({ monto: 0 })
        this.iziToast.success( {
          title: `${ingresoEgreso.tipo} guardado`,
          message: ingresoEgreso.description
        } )
      })
      .catch( err => this.store.dispatch( new DesactivarLoadingAction() ) )

  }

}