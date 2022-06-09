import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { ORIGIN } from '@angular/fire/compat/functions';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// Store
import { effects, reducers } from './core/store';

// Vendors modules
import { rootVendorsModules } from './vendors';

// Template Components
import { coreComponents, AppComponent } from './core/components';

// Services
import { coreServices, AuthService } from './core/services';
import { AppCustomPreloader } from './preloader';

// Translation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    // Routing
    AppRoutingModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    // Translate module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    // Store modules
    StoreModule.forRoot(reducers, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument(),

    // Shared module
    ToastrModule.forRoot(),

    // Third party
    ...rootVendorsModules,
  ],
  declarations: [
    ...coreComponents,
  ],
  providers: [
    ...coreServices,
    AppCustomPreloader,

    // firebase emulator for functions
    environment.production ? [] : { provide: ORIGIN, useValue: 'http://localhost:5001' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
  ) {
    this.authService.listenToUserEvents();
  }

  registerProviderIcons() {
    this.iconRegistry
      .addSvgIcon('google', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/mdi/google.svg'))
      .addSvgIcon('apple', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/mdi/apple.svg'))
      .addSvgIcon('google-colored', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/google.svg'))
      .addSvgIcon('facebook', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/mdi/facebook.svg'))
      .addSvgIcon('twitter', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/mdi/twitter.svg'))
      .addSvgIcon('github', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/mdi/github-circle.svg'))
      .addSvgIcon('microsoft', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/mdi/microsoft.svg'))
      .addSvgIcon('yahoo', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/providers/mdi/yahoo.svg'));
  }
}
