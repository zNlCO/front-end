import { ChangeDetectorRef, Component} from '@angular/core';
import { TodoService } from '../../services/todo-service.service';
import { Todo } from '../../entities/todo.entity';
import { Subject } from 'rxjs';
import { clearScreenDown } from 'readline';
import { AuthService, User } from '../../services/auth.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  
  todos$ = this.todoSrv.todos$;
  users$ = this.authSrv.users$;

  protected showCompleted = false;

  constructor(protected todoSrv: TodoService,
    protected authSrv: AuthService
  ){}

  ngOnInit(): void {
    this.authSrv.fetchUsers();
  }

  showCompletedChange() {
    this.todoSrv.fetch(this.showCompleted);
  }

  setCompleted(comp: boolean, todo: Todo) {
    this.todoSrv.updateCompleted(comp, todo.id);
  }

  getUserById(users: User[], userId: string): User | undefined {
    return users.find(user => user.id === userId);
  }

}
