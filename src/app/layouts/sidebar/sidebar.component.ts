import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  host: { '(document:click)': 'falseAll($event)' },
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebarElm!: ElementRef;
  @ViewChild('toggleButton') toggleElm!: ElementRef;
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
    // console.log(this.toggleSidebar);
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

  falseAll(event: any) {
    // console.log(this.sidebar.nativeElement);
    // console.log(event.target);
    // console.log(this.toggleSidebar);
    
    if (!this.sidebarElm.nativeElement.contains(event.target) && !this.toggleElm.nativeElement.contains(event.target) && this.toggleSidebar) {
      this.toggleSidebar = false;
    }
    // if (
    //   !this.onAuthCheck() &&
    //   !this.inputList.nativeElement.contains(event.target) &&
    //   this.dropdownInput
    // ) {
    //   this.dropdownInput = false;
    // }
  }
}
