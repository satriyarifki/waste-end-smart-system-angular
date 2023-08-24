import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  submitted = false;
  submitReq = false
  showPassword: Boolean = false;

  constructor(
    private router:Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      nik: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.submitReq = true;
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }
    // this.spinner.show()
    this.authService
      .login(this.f['nik'].value, this.f['password'].value)
      .subscribe(
        (data) => {
          this.authService.saveToken(data.token);
          this.authService.saveUser(data.user);

          console.log('Sign In Success');
          alert('Sign In Success')
          this.router.navigate(['/']);
          
          //this.alertService.onCallAlert('Login Success', AlertType.Success);

          // this.alertService.onCallAlert('Login Success', AlertType.Success);
          //this.reloadPage();
        },
        (err) => {
          console.log(err);

          if (err.statusText == 'Unauthorized') {
            console.log('NIK or Pass Invalid');
            alert('NIK or Pass Invalid')
            // this.alertService.onCallAlert(
            //   'NIK or Password Invalid',
            //   AlertType.Error
            // );
          } else {
            //this.alertService.onCallAlert('Login Failed', AlertType.Error);
            console.log('Sign In Failed');
          }

          
          this.submitted = false;
          this.submitReq = false;
          this.f['password'].setValue('');
          this.spinner.hide()
        },
        () => {
          this.submitted = false;
          this.submitReq = false;
          this.spinner.hide()
        }
      );
  }

  changeVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
