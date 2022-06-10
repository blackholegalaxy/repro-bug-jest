import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat';

declare let window;

@Injectable()
export class WindowRefService {
  constructor(public angularFirestore: AngularFirestore) { }

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
}
