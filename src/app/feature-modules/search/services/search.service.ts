import { Injectable } from '@angular/core';
import { ApolloQueryResult, WatchQueryOptions } from '@apollo/client/core';
import { ApolloService } from 'src/app/core/services/apollo.service';
import {
  AddSearchStarMutation,
  AddSearchStarMutationVariables,
  RemoveStarMutation,
  RemoveStarMutationVariables,
  SearchRepositoriesQueryVariables,
} from 'src/app/models/graphql';
import { SEARCH_REPOSITORIES } from '../gql/search.query';
import { Observable } from 'rxjs';
import { MySearchRepositoriesQuery } from 'src/app/models/search.model';
import { FetchResult } from '@apollo/client/core';
import { MutationOptions } from '@apollo/client/core';
import { ADD_STAR, REMOVE_STAR } from '../gql/search.mutation';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apolloService: ApolloService) {}

  watchQuerySearchRepositories(
    variables: SearchRepositoriesQueryVariables
  ): Observable<ApolloQueryResult<MySearchRepositoriesQuery>> {
    const options: WatchQueryOptions = {
      query: SEARCH_REPOSITORIES,
      variables,
      fetchPolicy: 'cache-and-network',
    };

    console.log(options);

    return this.apolloService.watchQuery<MySearchRepositoriesQuery>(options);
  }

  addStar(
    mutationVariables: AddSearchStarMutationVariables,
    searchVariables: SearchRepositoriesQueryVariables
  ): Observable<FetchResult<AddSearchStarMutation>> {
    const options: MutationOptions<AddSearchStarMutation> = {
      mutation: ADD_STAR,
      variables: mutationVariables,
      update: (cache, { data }) => {
        // キャッシュに更新をかけたい時の例
        console.log('update', data);
        const cacheData = cache.readQuery<MySearchRepositoriesQuery>({
          query: SEARCH_REPOSITORIES,
          variables: searchVariables,
        });

        // ここでcacheDataをコネこねしてwriteQueryに渡す

        cache.writeQuery({
          query: SEARCH_REPOSITORIES,
          data: cacheData,
        });
      },
    };

    return this.apolloService.mutate(options);
  }

  removeStar(
    input: RemoveStarMutationVariables
  ): Observable<FetchResult<RemoveStarMutation>> {
    const options: MutationOptions = {
      mutation: REMOVE_STAR,
      variables: input,
    };

    return this.apolloService.mutate(options);
  }
}
