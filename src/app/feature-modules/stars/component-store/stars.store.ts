import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface StarsState {
  startCursor: string;
  endCursor: string;
}

@Injectable()
export class StarsStore extends ComponentStore<StarsState> {
  readonly startCursor$: Observable<StarsState['startCursor']> = this.select(
    (state) => state.startCursor
  );

  readonly endCursor$: Observable<StarsState['endCursor']> = this.select(
    (state) => state.endCursor
  );

  readonly updateStartCursor = this.updater((state, startCursor: string) => ({
    ...state,
    startCursor,
  }));

  readonly updateEndCursor = this.updater((state, endCursor: string) => ({
    ...state,
    endCursor,
  }));

  constructor() {
    super({ startCursor: '', endCursor: '' });
  }
}
