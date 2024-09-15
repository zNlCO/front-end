import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //per modificare la lista di todo
  protected _todos$ = new BehaviorSubject<Todo[]>([]);
  //per avere la lista aggiornata all'esterno del service senza possibilità di aggiornarla
  todos$ = this._todos$.asObservable();

  constructor(protected http: HttpClient,
    private authSrv: AuthService) {
      this.authSrv.currentUser$
      .subscribe(user => {
        if (user) {
          this.fetch(false);
        } else {
          this._todos$.next([]);
        }
      })
    }

  fetch(isChecked: boolean) {
    this.http.get<Todo[]>(`/api/todos`, { params: new HttpParams().set('showCompleted', isChecked) })
    .subscribe(todos =>
      this._todos$.next(todos)
    );
  }

  updateCompleted(completed: boolean, id: string | undefined) {
    const checkUncheck = completed ? 'check': 'uncheck';

    this.http.patch<Todo>(`/api/todos/${id}/${checkUncheck}`,{}).
    subscribe( todo => {
      const todos = structuredClone(this._todos$.value);
      const index = todos.findIndex(t => t.id === todo.id);
      
      if (index !== -1) {
        todos[index] = todo;
        this._todos$.next([...todos]);
      }

    });
  }

  add(title: string, dueDate: Date | null, assignTo: string) {
    const data = {
      title,
      assignTo,
      ...(dueDate && { dueDate })
    };

    this.http.post<Todo>(`/api/todos`, data)
    .subscribe(todo => {
      const todos = structuredClone(this._todos$.value);
      todos.push(todo);
      this._todos$.next(todos);
    })
  }
}
