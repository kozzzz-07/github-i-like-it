import { Injectable } from '@angular/core';
import {
  ApolloQueryResult,
  QueryOptions,
  WatchQueryOptions,
} from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(private apollo: Apollo) {}

  query<T, V = EmptyObject>(
    options: QueryOptions<V>
  ): Observable<ApolloQueryResult<T>> {
    return this.apollo.query(options);
  }

  watchQuery<TData, TVariables = EmptyObject>(
    options: WatchQueryOptions<TVariables>
  ): Observable<ApolloQueryResult<unknown>> {
    return this.apollo.watchQuery(options).valueChanges;
  }
}
