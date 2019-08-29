import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingresos-egresos.model';


export enum IgresoEgresoActionTypes {
    SET_ITEMS = '[Ingreso Egreso] set intems de ingreso y egreso',
    UNSET_ITEMS = '[Ingreso Egreso] Borrar items de usuario'
};


export class SetItemsAction implements Action {
    readonly type = IgresoEgresoActionTypes.SET_ITEMS;

    constructor(public items: IngresoEgreso[] ) { }
}

export class UnsetItemsAction implements Action {
    readonly type = IgresoEgresoActionTypes.UNSET_ITEMS;
}


export type IngresoEgresoActions
                        = SetItemsAction
                        | UnsetItemsAction;
