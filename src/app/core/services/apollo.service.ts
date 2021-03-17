import { Injectable } from '@angular/core';
import {
  ApolloQueryResult,
  FetchResult,
  MutationOptions,
  QueryOptions,
  WatchQueryOptions,
} from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
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

  watchQuery<T, V = EmptyObject>(
    options: WatchQueryOptions<V>
  ): Observable<ApolloQueryResult<T>> {
    return this.apollo.watchQuery<T, V>(options).valueChanges;
  }

  mutate<T, V = EmptyObject>(
    options: MutationOptions<T, V>
  ): Observable<FetchResult<T>> {
    return this.apollo.mutate(options);
  }
}
