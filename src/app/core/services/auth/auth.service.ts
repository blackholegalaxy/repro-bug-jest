import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap, distinctUntilChanged } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import '@firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public onSuccessEmitter: EventEmitter<any> = new EventEmitter<any>();
  public onErrorEmitter: EventEmitter<any> = new EventEmitter<any>();

  public user$: Observable<firebase.User>;
  public token$: Observable<string>;
  public emailVerified$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public user: firebase.User;
  public token: string;

  constructor(
    public angularFireAuth: AngularFireAuth,
  ) {
  }

  public listenToUserEvents(): void {
    this.user$ = this.angularFireAuth.user.pipe(
      tap(user => {
        this.user = user;
      }),
      distinctUntilChanged(),
    );

    this.token$ = this.angularFireAuth.idToken.pipe(
      tap(token => {
        this.token = token;
      }),
      distinctUntilChanged(),
    );
  }
}
