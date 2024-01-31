import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from '../alert/alert.model';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor() { }

  private message = '';

  private type!: AlertType;
  invokeSpinner = new EventEmitter();
  subsVar: Subscription | undefined;

  
  onCallSpinner(show: Boolean) {
    this.invokeSpinner.emit(show);
  }
}
