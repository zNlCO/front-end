import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(protected http: HttpClient) {
  }

  fetch(isChecked: boolean) {
    return this.http.get<Todo[]>(`/api/todos`, { params: new HttpParams().set('showCompleted', isChecked) })
  }

  updateCompleted(completed: boolean, id: string | undefined) {
    const checkUncheck = completed ? 'check': 'uncheck';

    return this.http.patch<Todo>(`/api/todos/${id}/${checkUncheck}`,{});
  }
}
