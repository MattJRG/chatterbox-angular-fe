// Imports
import { UploadComponent } from './pages/upload/upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

// Pages
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { TrollPageComponent } from './pages/troll-page/troll-page.component';
import { SubmitRhymesComponent } from './pages/submit-rhymes/submit-rhymes.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent, canActivate:[AuthGuard] },
  { path: 'welcome',  component: WelcomePageComponent },
  { path: 'trollbox', component: TrollPageComponent, canActivate:[AuthGuard] },
  // { path: 'rhymes', component: SubmitRhymesComponent, canActivate:[AuthGuard] },
  // { path: 'upload', component: UploadComponent, canActivate:[AuthGuard] },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: '404',
      public: true,
      anchor: 'header',
      breadcrumbs: [
        {
          title: 'Home',
          link: '/home'
        },
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
