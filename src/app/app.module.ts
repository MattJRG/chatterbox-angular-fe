// Imports
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart'

// *** */ Declarations *** //

import { AppComponent } from './app.component';


// Pages
import { HomepageComponent } from './pages/homepage/homepage.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { TrollPageComponent } from './pages/troll-page/troll-page.component';
import { UploadComponent } from './pages/upload/upload.component';
import { SubmitRhymesComponent } from './pages/submit-rhymes/submit-rhymes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component'


// Components
import { AppHeader } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { VerifyComponent } from './components/verify/verify.conponent';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


// Directives
import { HoverClassDirective } from './directives/hover-class.directive';


// Interceptors
import { AuthInterceptor } from './auth/auth.interceptor';


// *** End of Declarations *** //


// Services
import { ApiService } from './services/api.service';
import { ConnectorSerivce } from './services/connector.service';

@NgModule({
  declarations: [
    AppComponent,
    // Pages
    HomepageComponent,
    WelcomePageComponent,
    TrollPageComponent,
    UploadComponent,
    SubmitRhymesComponent,
    NotFoundComponent,
    // Components
    AppHeader,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    SpinnerComponent,
    ResetPasswordComponent,
    // Directives
    HoverClassDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ApiService,
    ConnectorSerivce
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
