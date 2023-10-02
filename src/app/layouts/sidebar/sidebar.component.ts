import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  //Tools
  scalesBool = false;
  transactionBool = false;
  toggleSidebar = false;
  userBool = false
  employee:any

  constructor(public router: Router, private authService:AuthService,private alertService:AlertService) {
    this.employee = authService.getUser()
  }
  changeScales() {
    this.scalesBool = !this.scalesBool;
  }
  changeTransaction() {
    this.transactionBool = !this.transactionBool;
  }
  changeToggleSidebar() {
    this.toggleSidebar = !this.toggleSidebar;
    console.log(this.toggleSidebar);
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
    this.alertService.onCallAlert('Log Out Sucessful!', AlertType.Success)
    this.router.navigate(['/login']);
  }
}
