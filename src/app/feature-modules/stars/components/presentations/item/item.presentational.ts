import { StarredMyRepositoryEdge } from './../../../../../models/stars.model';
import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Node } from 'src/app/models/stars.model';

@Component({
  selector: 'app-presentational-item',
  templateUrl: './item.presentational.html',
  styleUrls: ['./item.presentational.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemPresentationalComponent implements OnInit {
  @Input() isLastItem: boolean | undefined;
  @Input() node: StarredMyRepositoryEdge['node'] | undefined;
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
