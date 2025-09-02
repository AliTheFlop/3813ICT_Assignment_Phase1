import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    username = '';
    email = '';
    password = '';

    constructor(private auth: AuthService, private router: Router) {}

    onRegister() {
        if (this.auth.register(this.username, this.email, this.password)) {
            this.router.navigate(['/dashboard']);
        } else {
            console.log('Registration failed');
        }
    }
}
