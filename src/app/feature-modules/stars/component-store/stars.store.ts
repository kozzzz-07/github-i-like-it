import { StarredMyRepositoryEdge, Edges } from './../../../models/stars.model';
import {
  Maybe,
  MutationRemoveStarArgs,
  StarredRepositoryEdge,
} from './../../../models/graphql';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, catchError, tap, map, take } from 'rxjs/operators';
import { MutationAddStarArgs } from 'src/app/models/graphql';
import { Pagination } from 'src/app/models/pagination.model';
import {
  PageInfo,
  Node,
  StarredMyRepositoryConnectionWithNodeState,
} from 'src/app/models/stars.model';
import { StarsService } from '../services/stars.service';
import { ApolloError } from '@apollo/client/core';

// TODO: データの持ち方が悪いのでフラットにする
export interface StarsState {
  starredRepositories: StarredMyRepositoryConnectionWithNodeState;
}

@Injectable()
export class StarsStore extends ComponentStore<StarsState> {
  readonly updateStartCursor = this.updater((state, startCursor: string) => ({
    ...state,
    startCursor,
  }));

  readonly updateEndCursor = this.updater((state, endCursor: string) => ({
    ...state,
    endCursor,
  }));

  private readonly updateStarredRepositories = this.updater(
    (
      state,
      starredRepositories: StarredMyRepositoryConnectionWithNodeState
    ) => ({
      ...state,
      starredRepositories,
    })
  );

  // effects

  readonly getMyStarredRepositories = this.effect(
    (page$: Observable<Pagination>) => {
      return page$.pipe(
        switchMap((page) =>
          this.starsService.getMyStarredRepositories(page).pipe(
            tapResponse(
              (ret) => {
                console.log('ret', ret);
                this.updateStarredRepositories(
                  ret.data.viewer.starredRepositories
                );
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

  readonly addStar = this.effect((input$: Observable<MutationAddStarArgs>) => {
    return input$.pipe(
      switchMap((input) =>
        this.starsService.addStar(input).pipe(
          tapResponse(
            (ret) => {
              console.log('ret', ret);
              // TODO: ボタンを押下したフラグを更新する
            },
            // TODO: errorプロパティに含める
            (error: any) => {
              console.log(error);
              // const err: GraphQLError = {
              // }
            }
          )
        )
      )
    );
  });

  readonly removeStar = this.effect(
    (input$: Observable<MutationRemoveStarArgs>) => {
      return input$.pipe(
        switchMap((args) =>
          this.starsService.removeStar(args).pipe(
            tap((ret) => {
              console.log('removeStar()', ret);
              this.updateStarredRepositories(
                this.StarredMyRepositoryConnection(args.input.starrableId, '')
              );
            }),
            catchError((error: ApolloError) => {
              console.error('removeStar()', error.graphQLErrors);
              this.updateStarredRepositories(
                this.StarredMyRepositoryConnection(
                  args.input.starrableId,
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

  constructor(private readonly starsService: StarsService) {
    super({
      starredRepositories: {
        totalCount: 0,
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      },
    });
  }

  // selecters

  selectStartCursor(): Observable<PageInfo['startCursor']> {
    return this.select(
      (state) => state.starredRepositories.pageInfo.startCursor
    );
  }

  selectEndCursor(): Observable<PageInfo['endCursor']> {
    return this.select((state) => state.starredRepositories.pageInfo.endCursor);
  }

  selectEdges(): Observable<
    StarredMyRepositoryConnectionWithNodeState['edges']
  > {
    return this.select((state) => state.starredRepositories.edges);
  }

  selectTotalCount(): Observable<
    StarredMyRepositoryConnectionWithNodeState['totalCount']
  > {
    return this.select((state) => state.starredRepositories.totalCount);
  }

  // private getSelectedNode(id: Node['id']): Observable<Node> {
  //   return this.select((state) => {
  //     const edge = state.starredRepositories.edges?.find((_edge) => {
  //       return _edge?.node.id === id;
  //     });
  //     return edge!.node;
  //   });
  // }

  // Memo: ボタンを押すと再更新がかかる
  // 結果エラー表示エリアが再構築され、メッセージが表示できない

  private StarredMyRepositoryConnection(
    id: Node['id'],
    errorMessage: string
  ): Observable<StarredMyRepositoryConnectionWithNodeState> {
    return combineLatest([
      this.select((state) => state.starredRepositories),
      of(errorMessage),
    ]).pipe(
      take(1),
      map(([starredRepositories, message]) => ({
        ...starredRepositories,
        edges: starredRepositories.edges?.map((edge) => {
          return {
            ...edge,
            node: {
              ...edge?.node,
              errorMessages: [{ message }],
              // errorMessages: edge?.node.id === id ? [{message}] : [],
            },
          } as StarredMyRepositoryEdge;
        }),
      }))
    );
  }
}
