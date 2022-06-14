import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import '@firebase/auth';

declare let window;

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

@Injectable()
export class WindowRefService {
  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
  ) { }

  public get nativeWindow(): Window {
    return window;
  }

  public getLocalStorageValue(key: string): string {
    return this.nativeWindow.localStorage.getItem(key);
  }

  public setLocalStorageValue(key: string, value: any): void {
    this.nativeWindow.localStorage.setItem(key, value);
  }

  public removeLocalStorageKey(key: string): void {
    this.nativeWindow.localStorage.removeItem(key);
  }

  /**
   * Retrieve user db doc ref by user id
   * @param uid - user unique identifier
   */
  public getUserDocRef(uid: string): AngularFirestoreDocument<firebase.UserInfo> {
    return this.angularFirestore.doc(`users/${uid}`);
  }

  /**
   * Retrieve profile db doc ref by user id
   * @param uid - user unique identifier
   */
  public getProfileDocRef(uid: string): AngularFirestoreDocument<firebase.UserInfo> {
    return this.angularFirestore.doc(`profiles/${uid}`);
  }

  /**
   * Retrieve recent_assets db doc ref by user id
   * @param uid - user unique identifier
   */
  public geUsertRecentAssetsDocRef(uid: string): AngularFirestoreDocument<any> {
    return this.angularFirestore.doc(`recent_assets/${uid}`);
  }

  /**
   * Save user data in firestore at login
   * @param user - user information
   */
  public async updateUserData(user: firebase.UserInfo): Promise<any> {
    const userRef: AngularFirestoreDocument<firebase.UserInfo> = this.getUserDocRef(user.uid);
    const profileRef: AngularFirestoreDocument<any> = this.getProfileDocRef(user.uid);

    const profileData: any = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
    };

    const data: firebase.UserInfo = {
      uid: user.uid,
      email: profileData.email,
      photoURL: profileData.photoURL,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId
    };

    try {
      await userRef.set(data, { merge: true });
      await profileRef.set(profileData, { merge: true });

      const profileAfterUpdate = await profileRef.get().toPromise();

      const { name } = profileAfterUpdate.data() || {};

      if (!name) {
        await profileRef.update({ name: user.displayName });
      }
    } catch (e) {
      console.error('error while updating user data', e);
    }
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
