import { Component, isStandalone, TemplateRef } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../../services/todo-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})
export class AddModalComponent {

	addTodoForm = this.fb.group({
		title: ['', Validators.required],
		dueDate: [null],
	});
	isSubmitted = false;

	constructor(
		protected modalService: NgbModal,
		protected todoService: TodoService,
		protected fb: FormBuilder) { }

	ngOnInit(): void {
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
			this.todoService.add(title, dueDate);

		}
		
		
	}

	convertToDate(dueDate: NgbDate | null): Date | null {
		if (!dueDate) {
			return null;
		}
		return new Date(dueDate.year, dueDate.month - 1, dueDate.day);
	}

}
