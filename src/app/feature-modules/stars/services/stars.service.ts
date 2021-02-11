import { ADD_STAR, REMOVE_STAR } from './../gql/list.mutation';
import { Injectable } from '@angular/core';
import {
  ApolloQueryResult,
  FetchResult,
  MutationOptions,
  QueryOptions,
} from '@apollo/client/core';
import { ApolloService } from 'src/app/core/services/apollo.service';
import { STARRED_REPOSITORIES } from '../gql/list.query';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/pagination.model';
import {
  StarredMyRepositoriesQuery,
  MutationRemoveStarArgs,
  MutationAddStarArgs,
} from 'src/app/models/graphql';

@Injectable({
  providedIn: 'root',
})
export class StarsService {
  constructor(private apolloService: ApolloService) {}

  getMyStarredRepositories(
    variables: Pagination
  ): Observable<ApolloQueryResult<StarredMyRepositoriesQuery>> {
    const options: QueryOptions = {
      query: STARRED_REPOSITORIES,
      variables,
    };

    return this.apolloService.query(options);
  }

  addStar(input: MutationAddStarArgs): Observable<FetchResult<unknown>> {
    const options: MutationOptions = {
      mutation: ADD_STAR,
      variables: input,
    };

    return this.apolloService.mutate(options);
  }

  removeStar(input: MutationRemoveStarArgs): Observable<FetchResult<unknown>> {
    const options: MutationOptions = {
      mutation: REMOVE_STAR,
      variables: input,
    };

    return this.apolloService.mutate(options);
  }
}
