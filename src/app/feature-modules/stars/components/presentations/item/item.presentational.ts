import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Node } from 'src/app/models/stars.model';

@Component({
  selector: 'app-presentational-item',
  templateUrl: './item.presentational.html',
  styleUrls: ['./item.presentational.scss'],
})
export class ItemPresentationalComponent implements OnInit {
  @Input() islastItem: boolean | undefined;
  @Input() node: Node | undefined;
  @Output() addStarEvent = new EventEmitter<Node['id']>();
  @Output() removeStarEvent = new EventEmitter<Node['id']>();

  constructor() {}

  ngOnInit(): void {}

  addStar(id: Node['id']): void {
    this.addStarEvent.emit(id);
  }

  removeStar(id: Node['id']): void {
    this.removeStarEvent.emit(id);
  }
}
