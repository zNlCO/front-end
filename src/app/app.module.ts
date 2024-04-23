import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './pages/todo/todo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SingleTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
