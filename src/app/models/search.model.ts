import { ErrorMessage } from '../shared/components/collapsible-error-area/collapsible-error-area.component';
import { Maybe, SearchRepositoriesQuery } from './graphql';
import { PopArray, RemoveNull, RemoveUndefined, Weaken } from './util';

// TODO: 一旦Node型を取り出す、綺麗にしたい
type Tmp = PopArray<SearchRepositoriesQuery['search']['edges']>;
type _Node = RemoveNull<Tmp[0]>['node'];

type NodeState = {
  errorMessages?: ErrorMessage[];
  addable?: boolean;
};

interface NodeAndNoseState extends Weaken<RemoveNull<Tmp[0]>, 'node'> {
  node?: Extract<_Node, { __typename?: 'Repository' }> & NodeState;
}

// edegesを復元
export interface SearchRepositories
  extends Weaken<SearchRepositoriesQuery['search'], 'edges'> {
  edges?: Maybe<Array<Maybe<NodeAndNoseState>>>;
}

export type PageInfo = SearchRepositories['pageInfo'];
export type RepositoryCount = SearchRepositories['repositoryCount'];
export type Edges = SearchRepositories['edges'];

export type Repository = RemoveUndefined<
  RemoveNull<PopArray<Edges>[0]>
>['node'];
