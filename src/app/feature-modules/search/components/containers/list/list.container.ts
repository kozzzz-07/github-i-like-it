import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchStore } from '../../../component-store/search.store';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  FirstPage,
  LastPage,
  NextPage,
  PageChangeEvent,
  PreviousPage,
} from 'src/app/models/pagination.model';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/components/pagination/consts/pagination';
import { Repository } from 'src/app/models/search.model';
import {
  AddStarInput,
  AddStarMutationVariables,
  RemoveStarInput,
  SearchRepositoriesQueryVariables,
} from 'src/app/models/graphql';

@Component({
  selector: 'app-container-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  providers: [SearchStore],
})
export class ListContainerComponent implements OnInit, OnDestroy {
  startCursor = '';
  endCursor = '';
  keyword = '';
  pageSize = DEFAULT_PAGE_SIZE;
  searchVariables: SearchRepositoriesQueryVariables = {
    first: this.pageSize,
    query: this.keyword,
  };

  startCursor$ = this.searchStore.selectStartCursor().pipe(
    tap(() => {
      console.log('++startCursor++');
    })
  );
  endCursor$ = this.searchStore.selectEndCursor().pipe(
    tap(() => {
      console.log('++endCursor++');
    })
  );
  edges$ = this.searchStore.selectEdges().pipe(
    tap((ret) => {
      console.log('++search edges++');
      console.log(ret);
    })
  );
  selectRepositoryCount$ = this.searchStore.selectRepositoryCount().pipe(
    tap(() => {
      console.log('++selectRepositoryCount++');
    })
  );

  private onDestroy$ = new Subject();

  constructor(private readonly searchStore: SearchStore) {}

  ngOnInit(): void {
    this.startCursor$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((startCursor) => {
        console.log({ startCursor });
        this.startCursor = startCursor || '';
      });

    this.endCursor$.pipe(takeUntil(this.onDestroy$)).subscribe((endCursor) => {
      console.log({ endCursor });
      this.endCursor = endCursor || '';
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onSearch(keyword: string): void {
    this.keyword = keyword;

    this.searchVariables = {
      first: this.pageSize,
      query: keyword,
    };

    this.searchStore.getSearchRepositories(this.searchVariables);
  }

  onPaginate(event: Readonly<PageChangeEvent>): void {
    console.log(event);
    this.pageSize = event.pageSize;
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
    this.searchVariables = {
      first: event.pageSize,
      query: this.keyword,
    };
    console.log('FirstPage', this.searchVariables);

    this.searchStore.getSearchRepositories(this.searchVariables);
  }

  private goLast(event: PageChangeEvent): void {
    this.searchVariables = {
      last: event.requestedLastSize,
      query: this.keyword,
    };
    console.log('LastPage', this.searchVariables);

    this.searchStore.getSearchRepositories(this.searchVariables);
  }

  private goNext(event: PageChangeEvent): void {
    this.searchVariables = {
      first: event.pageSize,
      after: this.endCursor,
      query: this.keyword,
    };
    console.log('NextPage', this.searchVariables);

    this.searchStore.getSearchRepositories(this.searchVariables);
  }

  private goPrevious(event: PageChangeEvent): void {
    this.searchVariables = {
      last: event.pageSize,
      before: this.startCursor,
      query: this.keyword,
    };
    console.log('PreviousPage', this.searchVariables);

    this.searchStore.getSearchRepositories(this.searchVariables);
  }

  addStar(id: Repository['id']): void {
    const input: AddStarInput = {
      starrableId: id,
    };

    const mutationVariables: AddStarMutationVariables = {
      input,
    };

    this.searchStore.addStar({
      mutationVariables,
      searchVariables: this.searchVariables,
    });
  }

  removeStar(id: Repository['id']): void {
    const input: RemoveStarInput = {
      starrableId: id,
    };
    this.searchStore.removeStar({ input });
  }
}
