import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass: TokenInterceptor , multi:true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
