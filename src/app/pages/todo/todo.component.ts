import { Component} from '@angular/core';
import { TodoService } from '../../services/todo-service.service';
import { Todo } from '../../entities/todo.entity';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  
  todos$ = this.todoSrv.todos$;
  private showCompleted$ = new Subject<boolean>();
  protected showCompleted = false;

  constructor(protected todoSrv: TodoService){}

  ngOnInit(): void {
    this.showCompleted$
    .subscribe((boolValue) => {
      this.todoSrv.fetch(boolValue);
    })

    this.showCompleted$.next(this.showCompleted);
  }

  showCompletedChange() {
    this.showCompleted$.next(this.showCompleted);
  }

  setCompleted(comp: boolean, todo: Todo) {
    console.log(todo.id); 
    this.todoSrv.updateCompleted(comp, todo.id);
    this.showCompleted$.next(this.showCompleted);
  }


}
