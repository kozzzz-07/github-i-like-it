import { tap } from 'rxjs/operators';
import { StarsStore } from '../../../component-store/stars.store';
import {
  LastPage,
  NextPage,
  PreviousPage,
} from './../../../../../models/pagination.model';
import { Component, OnInit } from '@angular/core';
import { FirstPage, PageChangeEvent } from 'src/app/models/pagination.model';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/components/pagination/consts/pagination';

@Component({
  selector: 'app-container-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  providers: [StarsStore],
})
export class ListContainerComponent implements OnInit {
  startCursor = '';
  endCursor = '';

  startCursor$ = this.starsStore.selectStartCursor().pipe(
    tap(() => {
      console.log('++startCursor++');
    })
  );
  endCursor$ = this.starsStore.selectEndCursor().pipe(
    tap(() => {
      console.log('++endCursor++');
    })
  );
  edges$ = this.starsStore.selectEdges().pipe(
    tap(() => {
      console.log('++edges++');
    })
  );
  totalCount$ = this.starsStore.selectTotalCount().pipe(
    tap(() => {
      console.log('++totalCount++');
    })
  );

  constructor(private readonly starsStore: StarsStore) {}

  ngOnInit(): void {
    const page: FirstPage = {
      first: DEFAULT_PAGE_SIZE,
    };
    this.starsStore.getMyStarredRepositories(page);

    // TODO: unsubscribe
    this.startCursor$.subscribe((startCursor) => {
      console.log({ startCursor });
      this.startCursor = startCursor || '';
    });

    this.endCursor$.subscribe((endCursor) => {
      console.log({ endCursor });
      this.endCursor = endCursor || '';
    });
  }

  onPagenate(event: Readonly<PageChangeEvent>): void {
    console.log(event);
    if (event.isFirstPage) {
      this.goFirst(event);
    } else if (event.isLastPage) {
      this.goLast(event);
    } else if (event.isNext) {
      this.goNext(event);
    } else {
      this.goPrevious(event);
    }
  }

  private goFirst(event: PageChangeEvent): void {
    const page: FirstPage = {
      first: event.pageSize,
    };
    console.log('FirstPage', page);
    this.starsStore.getMyStarredRepositories(page);
  }

  private goLast(event: PageChangeEvent): void {
    const page: LastPage = {
      last: event.requestedLastSize,
    };
    console.log('LastPage', page);
    this.starsStore.getMyStarredRepositories(page);
  }

  private goNext(event: PageChangeEvent): void {
    const page: NextPage = {
      first: event.pageSize,
      after: this.endCursor,
    };

    console.log('NextPage', page);
    this.starsStore.getMyStarredRepositories(page);
  }

  private goPrevious(event: PageChangeEvent): void {
    const page: PreviousPage = {
      last: event.pageSize,
      before: this.startCursor,
    };

    console.log('PreviousPage', page);
    this.starsStore.getMyStarredRepositories(page);
  }
}
