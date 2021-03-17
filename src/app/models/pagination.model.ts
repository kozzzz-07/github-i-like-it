import { PageEvent } from '@angular/material/paginator';

export type FirstPage = {
  first: number;
  after?: undefined;
  last?: undefined;
  before?: undefined;
};

export type LastPage = {
  first?: undefined;
  after?: undefined;
  last: number;
  before?: undefined;
};

export type NextPage = {
  first: number;
  after: string;
  last?: undefined;
  before?: undefined;
};

export type PreviousPage = {
  last: number;
  before: string;
  first?: undefined;
  after?: undefined;
};

export type Pagination = FirstPage | LastPage | NextPage | PreviousPage;

export interface PageChangeEvent extends PageEvent {
  isNext: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  requestedLastSize: number;
  isChangingPageSize: boolean;
}
