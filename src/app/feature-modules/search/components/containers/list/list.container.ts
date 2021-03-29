import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchStore } from '../../../component-store/search.store';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-container-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  providers: [SearchStore],
})
export class ListContainerComponent implements OnInit, OnDestroy {
  startCursor = '';
  endCursor = '';

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
    this.searchStore.getSearchRepositories({ first: 10, query: keyword });
  }
}
