import { ActionReducerMap } from '@ngrx/store';

import { authReducer, AuthState } from './auth.reducer';

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
};
