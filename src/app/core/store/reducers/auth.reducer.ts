import { createReducer, on } from '@ngrx/store';

import {
  login,
} from '@core/store/actions';

export interface AuthState {
  loading: boolean;
  loggedIn: boolean;
  token: string;
  user: any;
  userWatched: boolean;
  hasUpdatedUserOnce: boolean;
}

export const initialAuthState: AuthState = {
  loading: false,
  loggedIn: false,
  token: null,
  user: null,
  userWatched: false,
  hasUpdatedUserOnce: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, state => ({
    ...state,
    loading: true,
    userWatched: false,
    hasUpdatedUserOnce: false,
  })),
);
