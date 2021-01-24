import { Injectable } from '@angular/core';
import { ApolloQueryResult, QueryOptions } from '@apollo/client/core';
import { ApolloService } from 'src/app/core/services/apollo.service';
import { STARRED_REPOSITORIES } from '../gql/list.query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarsService {
  constructor(private apolloService: ApolloService) {}

  getMyStarredRepositories(): Observable<ApolloQueryResult<unknown>> {
    const options: QueryOptions = {
      query: STARRED_REPOSITORIES,
    };

    return this.apolloService.query(options);
  }
}
