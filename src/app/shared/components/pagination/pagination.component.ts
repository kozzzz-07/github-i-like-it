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

  lastPageSize = 0;

  readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  constructor() {}

  ngOnInit(): void {}

  private isNext(
    pageIndex: Readonly<number>,
    previousPageIndex: Readonly<number> = 0
  ): boolean {
    return pageIndex > previousPageIndex;
  }

  private isChangingPageSize(
    pageSize: Readonly<number>,
    lastPageSize: Readonly<number>
  ): boolean {
    return pageSize !== lastPageSize;
  }

  pageEvent(event: PageEvent): void {
    const isNext = this.isNext(event.pageIndex, event.previousPageIndex);

    const isChangingPageSize = this.isChangingPageSize(
      event.pageIndex,
      this.lastPageSize
    );
    this.lastPageSize = event.pageIndex;

    // TODO: 関数化
    const isFirstPage = event.pageIndex === 0;
    const startLength = event.pageSize * event.pageIndex;
    const requestedLastSize = event.length - startLength;
    const isLastPage = event.pageSize > requestedLastSize;

    const changeEvent: PageChangeEvent = {
      ...event,
      isNext,
      isFirstPage,
      isLastPage,
      requestedLastSize,
      isChangingPageSize,
    };

    this.paginate.emit(changeEvent);
  }
}
