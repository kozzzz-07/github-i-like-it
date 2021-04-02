import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class SubheaderPresenter {
  private searchQuery = new Subject<string>();

  searchQuery$ = this.searchQuery.pipe(
    map(
      (keyword) => keyword.trim(),
      filter((keyword) => !!keyword)
    )
  );

  destroy(): void {
    this.searchQuery.complete();
  }

  search(keyword: string): void {
    this.searchQuery.next(keyword);
  }
}
