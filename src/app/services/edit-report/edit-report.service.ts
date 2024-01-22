import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from '../alert/alert.model';

@Injectable({
  providedIn: 'root'
})
export class EditReportService {

  constructor() { }

  private message = '';

  invokeEdit = new EventEmitter();
  subsVar: Subscription | undefined;

  
  onCallEdit(data: any) {
    console.log(data);
    
    this.invokeEdit.emit(data);
  }

}
