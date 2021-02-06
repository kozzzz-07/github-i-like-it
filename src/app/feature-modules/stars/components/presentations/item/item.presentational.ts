import { Component, Input, OnInit } from '@angular/core';
import { Node } from 'src/app/models/stars.model';

@Component({
  selector: 'app-presentational-item',
  templateUrl: './item.presentational.html',
  styleUrls: ['./item.presentational.scss'],
})
export class ItemPresentationalComponent implements OnInit {
  @Input() node: Node | undefined;
  constructor() {}

  ngOnInit(): void {}
}
