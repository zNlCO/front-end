import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './pages/todo/todo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { AuthInterceptor } from './utils/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { NavUserComponent } from './components/nav-user/nav-user.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SingleTodoComponent,
    AddModalComponent,
    LoginComponent,
    IfAuthenticatedDirective,
    NavUserComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
