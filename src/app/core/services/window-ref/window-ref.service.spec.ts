import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { WindowRefService } from '@core/services';

declare let window: Window;

describe('WindowRefService', () => {
  let service: WindowRefService;
  let angularFirestore = jest.fn().mockReturnValue(() => ({
    doc: jest.fn(),
  }) as any);

  let angularFireAuth = jest.fn().mockReturnValue(() => ({
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
  }) as any);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WindowRefService,
        { provide: AngularFirestore, useValue: angularFirestore },
        { provide: AngularFireAuth, useValue: angularFireAuth },
      ],
    });

    service = TestBed.inject(WindowRefService);
  });

  describe('getNativeWindow', () => {
    it('should return window', () => {
      const nativeWindow = service.nativeWindow;

      expect(nativeWindow).toEqual(window);
    });
  });
});
