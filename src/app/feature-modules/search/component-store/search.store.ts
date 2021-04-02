import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import {
  AddStarMutationVariables,
  RemoveStarMutationVariables,
  SearchRepositoriesQueryVariables,
} from 'src/app/models/graphql';
import {
  Edges,
  PageInfo,
  Repository,
  RepositoryCount,
} from 'src/app/models/search.model';
import { ErrorMessage } from 'src/app/shared/components/collapsible-error-area/collapsible-error-area.component';
import { SearchService } from '../services/search.service';

export interface SearchState {
  pageInfo: PageInfo;
  repositoryCount: RepositoryCount;
  edges: Edges;
}

type EdgesState = Pick<SearchState, 'edges'>;

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  private readonly updateSearchState = this.updater(
    (state, newState: SearchState) => ({
      ...state,
      ...newState,
    })
  );

  private readonly updateEdgesState = this.updater(
    (state, newState: EdgesState) => ({
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

  readonly addStar = this.effect(
    (
      input$: Observable<{
        mutationVariables: AddStarMutationVariables;
        searchVariables: SearchRepositoriesQueryVariables;
      }>
    ) => {
      return input$.pipe(
        switchMap(({ mutationVariables, searchVariables }) =>
          this.searchService.addStar(mutationVariables, searchVariables).pipe(
            tap((ret) => {
              console.log('addStar()', ret);
              this.updateEdgesState(
                this.mutationSuccess(mutationVariables.input.starrableId)
              );
            }),
            catchError((error: ApolloError) => {
              console.error('addStar()', error.graphQLErrors);
              this.updateEdgesState(
                this.mutationtarFailure(
                  mutationVariables.input.starrableId,
                  error.message
                )
              );
              return of(error.message);
            })
          )
        )
      );
    }
  );

  readonly removeStar = this.effect(
    (input$: Observable<RemoveStarMutationVariables>) => {
      return input$.pipe(
        switchMap((args) =>
          this.searchService.removeStar(args).pipe(
            tap((ret) => {
              console.log('removeStar()', ret);
              this.updateEdgesState(
                this.mutationSuccess(args.input.starrableId)
              );
            }),
            catchError((error: ApolloError) => {
              console.error('removeStar()', error.graphQLErrors);
              this.updateEdgesState(
                this.mutationtarFailure(args.input.starrableId, error.message)
              );
              return of(error.message);
            })
          )
        )
      );
    }
  );

  private mutationtarFailure(
    id: Repository['id'],
    errorMessage: string | null = null
  ): Observable<EdgesState> {
    return combineLatest([
      this.select((state) => state.edges),
      of(errorMessage),
    ]).pipe(
      take(1),
      map(
        ([edges = [], message]) =>
          ({
            edges: edges?.map((edge) => {
              if (!edge) {
                return { edges: [] };
              }

              const errorMessages: ErrorMessage[] =
                message == null ? [] : [{ message }];

              return {
                ...edge,
                node: {
                  ...edge.node,
                  errorMessages:
                    edge.node?.id === id
                      ? errorMessages
                      : edge.node?.errorMessages,
                },
              };
            }),
          } as EdgesState)
      )
    );
  }
  private mutationSuccess(id: Repository['id']): Observable<EdgesState> {
    return combineLatest([this.select((state) => state.edges)]).pipe(
      take(1),
      map(
        ([edges = []]) =>
          ({
            edges: edges?.map((edge) => {
              if (!edge) {
                return { edges: [] };
              }

              return {
                ...edge,
                node: {
                  ...edge.node,
                  errorMessages:
                    edge.node?.id === id ? [] : edge.node?.errorMessages,
                },
              };
            }),
          } as EdgesState)
      )
    );
  }

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

  selectRepositoryCount(): Observable<RepositoryCount> {
    return this.select((state) => state.repositoryCount);
  }
}
