import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SearchRepositoriesQueryVariables } from 'src/app/models/graphql';
import { Edges, PageInfo, RepositoryCount } from 'src/app/models/search.model';
import { SearchService } from '../services/search.service';

export interface SearchState {
  pageInfo: PageInfo;
  repositoryCount: RepositoryCount;
  edges: Edges;
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  private readonly updateSearchState = this.updater(
    (state, newState: SearchState) => ({
      ...state,
      ...newState,
    })
  );

  // effects

  readonly getSearchRepositories = this.effect(
    (req$: Observable<SearchRepositoriesQueryVariables>) => {
      return req$.pipe(
        switchMap((req) =>
          this.searchService.watchQuerySearchRepositories(req).pipe(
            tapResponse(
              (ret) => {
                console.log('ret', ret);
                this.updateSearchState({
                  pageInfo: ret.data.search.pageInfo,
                  repositoryCount: ret.data.search.repositoryCount,
                  edges: ret.data.search.edges || [],
                });
              },
              (error) => {
                console.error(error);
              }
            )
          )
        )
      );
    }
  );

  constructor(private searchService: SearchService) {
    super({
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
      repositoryCount: 0,
      edges: [],
    });
  }

  // selectors

  selectStartCursor(): Observable<PageInfo['startCursor']> {
    return this.select((state) => state.pageInfo.startCursor);
  }

  selectEndCursor(): Observable<PageInfo['endCursor']> {
    return this.select((state) => state.pageInfo.endCursor);
  }

  selectEdges(): Observable<Edges> {
    return this.select((state) => state.edges);
  }
}
