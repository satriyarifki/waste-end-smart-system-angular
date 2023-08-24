import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  employee:any
  userBool = false
  constructor(public router: Router, private authService:AuthService){
    console.log(authService.getUser());
    
    this.employee = authService.getUser()
  }
  onAuthCheck() {
    if (this.authService.getToken() != null) {
      return false;
    }
    return true;
  }
  userDropdown(){
    this.userBool = !this.userBool
  }

  signOut() {
    this.authService.signOut();
    // this.alertService.onCallAlert('Log Out Sucess!', AlertType.Success)
    this.router.navigate(['/login']);
  }
}
