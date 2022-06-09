import { createAction } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] login',
  LOGIN_SUCCESS = '[Auth] login success',
}

export const login = createAction(
  AuthActionTypes.LOGIN,
  ({ token, redirectToRoot }: { token: string, redirectToRoot?: boolean }
    = { token: null, redirectToRoot: false }) => ({ redirectToRoot, token }),
);

export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
)

