import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword: Boolean = false;
  changeVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
