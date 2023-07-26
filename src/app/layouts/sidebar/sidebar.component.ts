import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  //Tools
  scalesBool=false
  transactionBool=false

constructor(public router: Router){

}
changeScales(){
  this.scalesBool = !this.scalesBool
}
changeTransaction(){
  this.transactionBool = !this.transactionBool
}
}
