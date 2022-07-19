import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.scss'],
})
export class ChangeLogComponent implements OnInit {
  currDate: Date = new Date();
  writeDate: string = '';
  constructor() {}

  ngOnInit(): void {
    this.writeDate = this.currDate.toString();
  }

  getCurrDate() {
    return this.writeDate;
  }
}
