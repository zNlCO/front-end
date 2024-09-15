import { Component, Input, isStandalone, TemplateRef } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../../services/todo-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})
export class AddModalComponent {

	@Input()
	users: User[] | null = null;
	user$ = this.authSrv.currentUser$;

	addTodoForm = this.fb.group({
		title: ['', Validators.required],
		dueDate: [null],
		userId: ['', Validators.required],
	});
	isSubmitted = false;

	constructor(
		protected modalService: NgbModal,
		protected todoService: TodoService,
		private authSrv: AuthService,
		protected fb: FormBuilder) { }

	ngOnInit(): void {
		this.authSrv.fetchUsers();
	}

  	//open apre il model
	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
		//questo perchè quando apri e chiudi il modal, se metti una valore non valido sulla data viene perso
		this.addTodoForm.get('dueDate')?.setValue(null, {emitEvent: false});
	}

	onSubmit() {
		this.isSubmitted = true;
		if (this.addTodoForm.valid) {
			this.modalService.dismissAll();
			
			const dueDate = this.convertToDate(this.addTodoForm.get('dueDate')?.value ?? null);
			const title = this.addTodoForm.get('title')?.value ?? '';
			const userId = this.addTodoForm.get('userId')?.value ?? '';
			this.todoService.add(title, dueDate, userId);

		}
		
		
	}

	convertToDate(dueDate: NgbDate | null): Date | null {
		if (!dueDate) {
			return null;
		}
		return new Date(dueDate.year, dueDate.month - 1, dueDate.day);
	}

}
