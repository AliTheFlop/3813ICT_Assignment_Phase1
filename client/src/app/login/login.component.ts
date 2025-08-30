import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  currentUser!: User | null;
  title: string = 'Log In';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.title = 'Logging in...';
    const loggedIn = this.auth.login(this.email, this.password);
    this.currentUser = this.auth.getUser();
    if (loggedIn) {
      console.log('Logged in as ' + this.currentUser?.username);
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Login unsuccessful...');
    }
  }
}
