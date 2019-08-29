import { User } from './user.model';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] setear el usuario';


export class SetUserActions implements Action {
    readonly type = SET_USER;

    constructor(public user: User) { }
}


export type AuthActions = SetUserActions;