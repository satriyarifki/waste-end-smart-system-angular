import { Component } from '@angular/core';

@Component({
  selector: 'app-create-transaction-out',
  templateUrl: './create-transaction-out.component.html',
  styleUrls: ['./create-transaction-out.component.css'],
})
export class CreateTransactionOutComponent {
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
