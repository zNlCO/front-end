import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {


  signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  isSubmitted = false;
  registrationError = '';

  constructor(
		protected modalService: NgbModal,
    protected authSrv: AuthService,
		protected fb: FormBuilder) { }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    this.isSubmitted = true;
		if (this.signUpForm.valid) {
			
      const { firstName, lastName, imageUrl, username, password } = this.signUpForm.value;
      this.authSrv.register(firstName!, lastName!, imageUrl!, username!, password!)
      .pipe(
        catchError(err => {
          this.registrationError = err.error.message || 'Username already in use';  
          return throwError(() => err);  
        })
      )
      .subscribe(user => {
        console.log("C");
        if (user) {
          console.log("d");
          this.modalService.dismissAll();
        }
      });


		}
  }
}
