import { Component } from '@angular/core';

@Component({
  selector: 'app-create-passbox',
  templateUrl: './create-passbox.component.html',
  styleUrls: ['./create-passbox.component.css']
})
export class CreatePassboxComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  constructor() {
    this.arrayItem.push('item');
    console.log(this.arrayItem);
  }

  plusItemLoop() {
    // this.itemLoop++;
    this.arrayItem.push('item');
    console.log(this.arrayItem);
  }

  deleteItemLoop(index: number) {
    // this.itemLoop--;
    console.log(index);
    const t = this.arrayItem.splice(index, index);

    console.log(this.arrayItem);
  }
  popItemLoop() {
    // this.itemLoop--;

    const t = this.arrayItem.pop();

    console.log(this.arrayItem);
  }
}
