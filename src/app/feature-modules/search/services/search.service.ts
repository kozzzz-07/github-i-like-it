import { Injectable } from '@angular/core';
import { ApolloQueryResult, WatchQueryOptions } from '@apollo/client/core';
import { ApolloService } from 'src/app/core/services/apollo.service';
import {
  SearchRepositoriesQuery,
  SearchRepositoriesQueryVariables,
} from 'src/app/models/graphql';
import { SEARCH_REPOSITORIES } from '../gql/search.query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apolloService: ApolloService) {}

  watchQuerySearchRepositories(
    variables: SearchRepositoriesQueryVariables
  ): Observable<ApolloQueryResult<SearchRepositoriesQuery>> {
    const options: WatchQueryOptions = {
      query: SEARCH_REPOSITORIES,
      variables,
      fetchPolicy: 'cache-and-network',
    };

    console.log(options);

    return this.apolloService.watchQuery<SearchRepositoriesQuery>(options);
  }
}
