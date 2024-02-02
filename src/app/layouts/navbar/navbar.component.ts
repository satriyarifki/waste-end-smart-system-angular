import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  employee:any
  userBool = false
  constructor(public router: Router, public authService:AuthService,private alertService:AlertService,private actRoute : ActivatedRoute){
    // console.log(authService.getUser());
    
    
    router.events.subscribe(val=>{
      this.ngOnInit()
      
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.employee = this.authService.getUser()
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
