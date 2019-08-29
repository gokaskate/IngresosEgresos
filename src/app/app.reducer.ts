import { AppState } from './app.reducer';



import * as fromUI from './shared/ui.reducer'
import * as fromAuth from './auth/auth.reducer'
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer'

import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    ui: fromUI.State,
    authUser: fromAuth.State,
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState
}

export const AppReducers: ActionReducerMap<AppState> = {
    ui:fromUI.UIReducer,
    authUser: fromAuth.AuthReducer,
    //ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
}