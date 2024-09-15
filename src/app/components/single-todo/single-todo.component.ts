import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo-service.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrl: './single-todo.component.css'
})
export class SingleTodoComponent {
  @Input()
  todo: Todo | null = null;   

  @Input()
  createdByUser: User | undefined;

  @Input()
  assignToUser: User | undefined;

  @Output()
  onTodoChange = new EventEmitter<boolean>();

  constructor(){}

  ngOnInit(): void {
  }

  setCompleted() {
    this.onTodoChange.emit(!this.todo!.completed);
  }
}
