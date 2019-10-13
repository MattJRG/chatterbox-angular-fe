import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { TrollPageComponent } from './pages/troll-page/troll-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/trollbox', pathMatch: 'full' },
  { path: 'welcome',  component: WelcomePageComponent },
  { path: 'trollbox', component: TrollPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
