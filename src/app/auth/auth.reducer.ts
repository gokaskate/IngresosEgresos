import { User } from './user.model';

import * as fromAuthActions from './auth.actions';

export interface State {
    user:User
};

const initialState: State = {
    user:null
};

export function AuthReducer(
    state = initialState, 
    action: fromAuthActions.AuthActions ): State {
    switch (action.type) {
        case fromAuthActions.SET_USER: 
            return {
                user: { ...action.user }
            };
        

        default: return state;
    }
}