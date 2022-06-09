import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { AppCustomPreloader } from './preloader';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    // Router module
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: true,
      preloadingStrategy: AppCustomPreloader,
      relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
