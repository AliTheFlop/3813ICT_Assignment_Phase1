import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    const result = this.auth.register(this.username, this.email, this.password);
    if (result.success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = result.message || 'Registration failed';
    }
  }
}
