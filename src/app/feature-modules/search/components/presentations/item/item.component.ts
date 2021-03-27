import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Repository } from 'src/app/models/search.model';
@Component({
  selector: 'app-presentational-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  @Input() isLastItem: boolean | undefined;
  @Input() node: Repository | undefined;
  @Output() addStarEvent = new EventEmitter<Repository['id']>();
  @Output() removeStarEvent = new EventEmitter<Repository['id']>();

  constructor() {}

  ngOnInit(): void {}

  addStar(id: Repository['id']): void {
    this.addStarEvent.emit(id);
  }

  removeStar(id: Repository['id']): void {
    this.removeStarEvent.emit(id);
  }
}
