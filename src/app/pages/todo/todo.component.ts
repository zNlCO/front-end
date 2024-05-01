import { Component } from '@angular/core';
import { TodoService } from '../../services/todo-service.service';
import { ReplaySubject, Subject, switchMap } from 'rxjs';
import { Todo } from '../../entities/todo.entity';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  protected showCompleted = false;
  protected updateList$ = new ReplaySubject<void>();
  todos$ = this.updateList$
    .pipe(  
      switchMap(() => this.todoSrv.fetch(this.showCompleted))
    )

  constructor(protected todoSrv: TodoService){}

  ngOnInit(): void {
    this.updateList$.next();
  }


  getCompleted(event: any) {
    this.showCompleted = event.target.checked;
    this.updateList$.next();
  }

  setCompleted(comp: boolean, todo: Todo) {
    this.todoSrv.updateCompleted(comp, todo.id)
      .subscribe(() => this.updateList$.next())
  }
}
