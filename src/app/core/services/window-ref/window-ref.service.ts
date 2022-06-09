import { Injectable } from '@angular/core';

declare let window;

@Injectable()
export class WindowRefService {
  constructor() { }

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
}
