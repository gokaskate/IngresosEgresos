
import * as fromUIActions from './ui.actions';

export interface State {
    isLoading: boolean
};

const initialState: State = {
    isLoading: false
};

export function UIReducer(
    state = initialState, 
    action: fromUIActions.loadingActions ): State {
    switch (action.type) {
        case fromUIActions.ACTIVAR_LOADING : 
            return {isLoading:true }
        
        case fromUIActions.DESACTIVAR_LOADING : 
            return {isLoading:false }

        default: return state;
    }
}