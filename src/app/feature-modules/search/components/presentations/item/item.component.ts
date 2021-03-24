import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { StarredMyRepositoryEdge } from 'src/app/models/stars.model';
import { Node } from 'src/app/models/stars.model';
@Component({
  selector: 'app-presentational-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
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
