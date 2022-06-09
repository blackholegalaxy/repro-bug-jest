import { AuthService } from './auth/auth.service';
import { WindowRefService } from './window-ref/window-ref.service';

export const coreServices: any[] = [
  AuthService,
  WindowRefService,
];

export * from './auth/auth.service';
export * from './window-ref/window-ref.service';
