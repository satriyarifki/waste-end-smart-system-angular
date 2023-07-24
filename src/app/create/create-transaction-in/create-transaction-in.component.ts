import { Component } from '@angular/core';

@Component({
  selector: 'app-create-transaction-in',
  templateUrl: './create-transaction-in.component.html',
  styleUrls: ['./create-transaction-in.component.css'],
})
export class CreateTransactionInComponent {
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
