import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
