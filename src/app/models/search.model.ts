import { ErrorMessage } from '../shared/components/collapsible-error-area/collapsible-error-area.component';
import { Maybe, SearchRepositoriesQuery } from './graphql';
import { PopArray, RemoveNull, Weaken } from './util';

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
interface SearchRepositoryEdges
  extends Weaken<SearchRepositoriesQuery['search'], 'edges'> {
  edges?: Maybe<Array<Maybe<NodeAndNoseState>>>;
}

// NodeをRepository型で指定し直す
export interface SearchRepositories
  extends Weaken<SearchRepositoriesQuery, 'search'> {
  search: SearchRepositoryEdges;
}

export type PageInfo = SearchRepositoryEdges['pageInfo'];
export type RepositoryCount = SearchRepositoryEdges['repositoryCount'];
export type Edges = SearchRepositoryEdges['edges'];

export type Repository = Extract<
  RemoveNull<PopArray<Edges>[0]>['node'],
  { __typename?: 'Repository' }
>;
