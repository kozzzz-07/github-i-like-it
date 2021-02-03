import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentational-item',
  templateUrl: './item.presentational.html',
  styleUrls: ['./item.presentational.scss'],
})
export class ItemPresentationalComponent implements OnInit {
  @Input() repository: any;
  constructor() {}

  ngOnInit(): void {}
}
