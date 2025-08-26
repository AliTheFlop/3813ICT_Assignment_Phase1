import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  title: string = "Ali's Lovely Login Form";

  onLogin() {
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);
    alert(`Logged in as ${this.email}`);
    this.title = "This isn't lovely anymore...";
  }
}
