import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scales-tps-edit',
  templateUrl: './scales-tps-edit.component.html',
  styleUrls: ['./scales-tps-edit.component.css']
})
export class ScalesTpsEditComponent {
  @Input() dataScales:any
  @Output() editModalEvent = new EventEmitter<Boolean>()

  form = this.formBuilder.group({
    id: 0,
    noBag: '',
    lot: '',
    netto: '',
  })

  constructor(private formBuilder:FormBuilder){
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.form.controls['id'].setValue(this.dataScales?.id)
    this.form.controls['noBag'].setValue(this.dataScales?.global_variable_1)
    this.form.controls['lot'].setValue(this.dataScales?.global_variable_2)
    this.form.controls['netto'].setValue(this.dataScales?.netto)
    console.log(this.form.value);
  }

  closeModal(){
    this.editModalEvent.emit(false)
  }
}
