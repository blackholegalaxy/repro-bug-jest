import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { of, combineLatest } from 'rxjs';
import { map, switchMap, filter, take } from 'rxjs/operators';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { login, loginSuccess } from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private firestore: AngularFirestore,
  ) { }

  public login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    map(({ token, redirectToRoot }) => {
      return { token, redirectToRoot };
    }),
    switchMap(({ token }) => combineLatest([
      this.firestore.doc<any>(`users/${token}`).valueChanges().pipe(
        filter(user => !!user),
      ),
      this.firestore.doc<Partial<any>>(`profiles/${token}`).valueChanges().pipe(
        filter(profile => !!profile && !!profile.name),
      ),
    ])
      .pipe(
        take(1),
        map(([dbUser, profile]: [any, any]) => {
          const user = { ...dbUser, name: profile.name };
          console.log(user);

          return loginSuccess();
        }),
      )
    ),
  ));
}
