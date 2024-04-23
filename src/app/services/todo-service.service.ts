import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  protected _todos$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this._todos$.asObservable();


  constructor(protected http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Todo[]>('/api/todos')
      .subscribe(todos => {
        this._todos$.next(todos);
      });
  }
}
