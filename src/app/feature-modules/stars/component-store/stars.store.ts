import { MutationRemoveStarArgs } from './../../../models/graphql';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MutationAddStarArgs } from 'src/app/models/graphql';
import { Pagination } from 'src/app/models/pagination.model';
import {
  PageInfo,
  StarredMyRepositoryConnection,
} from 'src/app/models/stars.model';
import { StarsService } from '../services/stars.service';

export interface StarsState {
  starredRepositories: StarredMyRepositoryConnection;
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
    (state, starredRepositories: StarredMyRepositoryConnection) => ({
      ...state,
      starredRepositories,
    })
  );

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
              (error) => console.error
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
            },
            // TODO: errorプロパティに含める
            (error) => console.error(error)
          )
        )
      )
    );
  });

  readonly removeStar = this.effect(
    (input$: Observable<MutationRemoveStarArgs>) => {
      return input$.pipe(
        switchMap((input) =>
          this.starsService.removeStar(input).pipe(
            tapResponse(
              (ret) => {
                console.log('ret', ret);
              },
              (error) => console.error(error)
            )
          )
        )
      );
    }
  );

  constructor(private starsService: StarsService) {
    super({
      starredRepositories: {
        totalCount: 0,
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      },
    });
  }

  selectStartCursor(): Observable<PageInfo['startCursor']> {
    return this.select(
      (state) => state.starredRepositories.pageInfo.startCursor
    );
  }

  selectEndCursor(): Observable<PageInfo['endCursor']> {
    return this.select((state) => state.starredRepositories.pageInfo.endCursor);
  }

  selectEdges(): Observable<StarredMyRepositoryConnection['edges']> {
    return this.select((state) => state.starredRepositories.edges);
  }

  selectTotalCount(): Observable<StarredMyRepositoryConnection['totalCount']> {
    return this.select((state) => state.starredRepositories.totalCount);
  }
}
