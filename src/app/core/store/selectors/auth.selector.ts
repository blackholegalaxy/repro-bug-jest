import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@core/store/reducers/auth.reducer';

/**
 * Selectors
 */

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading,
);

export const getLoggedIn = createSelector(
  getAuthState,
  (state: AuthState) => state.loggedIn,
);
