import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap, distinctUntilChanged } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import '@firebase/auth';

import UserCredential = firebase.auth.UserCredential;

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const appleAuthProvider = new firebase.auth.OAuthProvider('apple.com');
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const microsoftAuthProvider = new firebase.auth.OAuthProvider('microsoft.com');
const yahooAuthProvider = new firebase.auth.OAuthProvider('yahoo.com');

enum AuthProvider {
  ALL = 'all',
  EmailAndPassword = 'firebase',
  Google = 'google',
  Apple = 'apple',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Github = 'github',
  Microsoft = 'microsoft',
}

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

  public async signInWith(provider: AuthProvider, credentials?: { email: string; password: string; }) {
    try {
      let signInResult: UserCredential | any;

      switch (provider) {
        case AuthProvider.EmailAndPassword:
          signInResult = await this.angularFireAuth
            .signInWithEmailAndPassword(credentials.email, credentials.password) as UserCredential;
          break;

        case AuthProvider.Google:
          signInResult = await this.angularFireAuth
            .signInWithPopup(googleAuthProvider) as UserCredential;
          break;

        case AuthProvider.Apple:
          signInResult = await this.angularFireAuth
            .signInWithPopup(appleAuthProvider) as UserCredential;
          break;

        case AuthProvider.Facebook:
          signInResult = await this.angularFireAuth
            .signInWithPopup(facebookAuthProvider) as UserCredential;
          break;

        case AuthProvider.Twitter:
          signInResult = await this.angularFireAuth
            .signInWithPopup(twitterAuthProvider) as UserCredential;
          break;

        case AuthProvider.Github:
          signInResult = await this.angularFireAuth
            .signInWithPopup(githubAuthProvider) as UserCredential;
          break;

        case AuthProvider.Microsoft:
          signInResult = await this.angularFireAuth
            .signInWithPopup(microsoftAuthProvider) as UserCredential;
          break;

        default:
          throw new Error(`${AuthProvider[provider]} is not available as auth provider`);
      }

      console.log(signInResult);
    } catch (err) {
      console.error('signin', err);
    }
  }
}
