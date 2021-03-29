import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { SubheaderPresenter } from './subheader.presenter';

@Component({
  selector: 'app-presentational-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
  providers: [SubheaderPresenter],
})
export class SubheaderComponent implements OnInit, OnDestroy {
  @Output() searchEvent = new EventEmitter<string>();
  value = ''; // memo: これうまいこと隠せないのかな

  constructor(private presenter: SubheaderPresenter) {}

  ngOnInit(): void {
    this.presenter.searchQuery$.subscribe((keyword) =>
      this.searchEvent.emit(keyword)
    );
  }

  ngOnDestroy(): void {
    this.presenter.destroy();
  }

  onSearch(keyword: string): void {
    this.presenter.search(keyword);
  }
}
