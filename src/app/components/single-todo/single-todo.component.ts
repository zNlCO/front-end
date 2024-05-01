import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrl: './single-todo.component.css'
})
export class SingleTodoComponent {
  @Input()
  todo: Todo | null = null;   
  isCheck: boolean = false;

  @Output()
  onTodoChange = new EventEmitter<boolean>();

  constructor(protected todoSrv: TodoService){}

  ngOnInit(): void {
    this.isCheck = this.todo?.completed ? true : false;
  }

  setCompleted() {
    this.onTodoChange.emit(!this.isCheck);
  }
}
