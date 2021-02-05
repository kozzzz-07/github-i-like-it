import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/app/models/graphql';
import { Edge } from 'src/app/models/stars.model';

@Component({
  selector: 'app-presentational-item',
  templateUrl: './item.presentational.html',
  styleUrls: ['./item.presentational.scss'],
})
export class ItemPresentationalComponent implements OnInit {
  @Input() edge: any;
  constructor() {}

  ngOnInit(): void {}
}
