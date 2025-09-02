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
    errorMessage: string = '';

    constructor(private auth: AuthService, private router: Router) {}

    onLogin() {
        const loggedIn = this.auth.login(this.email, this.password);
        this.currentUser = this.auth.getUser();
        if (loggedIn) {
            this.router.navigate(['/dashboard']);
        } else {
            this.errorMessage = 'Incorrect username or password!';
        }
    }
}
