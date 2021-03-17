import { ADD_STAR, REMOVE_STAR } from './../gql/list.mutation';
import { Injectable } from '@angular/core';
import {
  ApolloQueryResult,
  FetchResult,
  MutationOptions,
  QueryOptions,
  WatchQueryOptions,
} from '@apollo/client/core';
import { ApolloService } from 'src/app/core/services/apollo.service';
import { STARRED_REPOSITORIES } from '../gql/list.query';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/pagination.model';
import {
  StarredMyRepositoriesQuery,
  MutationRemoveStarArgs,
  MutationAddStarArgs,
  RemoveStarPayload,
  AddStarPayload,
} from 'src/app/models/graphql';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class StarsService {
  constructor(private apolloService: ApolloService, private apollo: Apollo) {}

  getMyStarredRepositories(
    variables: Pagination,
    cache: boolean = true
  ): Observable<ApolloQueryResult<StarredMyRepositoriesQuery>> {
    console.log({ cache });

    const options: QueryOptions = {
      query: STARRED_REPOSITORIES,
      variables,
      fetchPolicy: cache ? 'cache-first' : 'no-cache',
    };

    return this.apolloService.query(options);
  }

  watchQueryMyStarredRepositories(
    variables: Pagination
  ): Observable<ApolloQueryResult<StarredMyRepositoriesQuery>> {
    const options: WatchQueryOptions = {
      query: STARRED_REPOSITORIES,
      variables,
      fetchPolicy: 'cache-and-network',
    };

    return this.apolloService.watchQuery<StarredMyRepositoriesQuery>(options);
  }

  addStar(input: MutationAddStarArgs): Observable<FetchResult<AddStarPayload>> {
    const options: MutationOptions = {
      mutation: ADD_STAR,
      variables: input,
    };

    return this.apolloService.mutate(options);
  }

  removeStar(
    input: MutationRemoveStarArgs
  ): Observable<FetchResult<RemoveStarPayload>> {
    const options: MutationOptions = {
      mutation: REMOVE_STAR,
      variables: input,
    };

    return this.apolloService.mutate(options);
  }
}
