import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser$ = this.authSrv.currentUser$;
  
  constructor(protected authSrv: AuthService) {
    let country = 'IT';
  }

  logout() {
    this.authSrv.logout();
  }
}
