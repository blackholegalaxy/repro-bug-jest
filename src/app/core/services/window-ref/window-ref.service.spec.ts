import { TestBed } from '@angular/core/testing';

import { WindowRefService } from '@core/services';

declare let window: Window;

describe('WindowRefService', () => {
  let service: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WindowRefService,
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
