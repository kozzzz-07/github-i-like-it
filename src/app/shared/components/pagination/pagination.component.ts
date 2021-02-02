import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PageChangeEvent } from 'src/app/models/pagination.model';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from './consts/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalCount = 0;
  @Input() pageSize = DEFAULT_PAGE_SIZE;
  @Output() paginate = new EventEmitter<Readonly<PageChangeEvent>>();

  lastPageIndex = 0;

  readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  constructor() {}

  ngOnInit(): void {}

  private isNext(pageIndex: number): boolean {
    return this.lastPageIndex < pageIndex;
  }

  pageEvent(event: PageEvent): void {
    const isNext = this.isNext(event.pageIndex);
    const isFirstPage = event.pageIndex === 0;

    const changeEvent: PageChangeEvent = {
      ...event,
      isNext,
      isFirstPage,
    };

    this.paginate.emit(changeEvent);
  }
}
