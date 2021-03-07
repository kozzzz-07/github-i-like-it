import { ErrorMessage } from '../shared/components/collapsible-error-area/collapsible-error-area.component';
import { Maybe, StarredMyRepositoriesQuery } from './graphql';

export type StarredMyRepositoryConnection = StarredMyRepositoriesQuery['viewer']['starredRepositories'];
export type PageInfo = StarredMyRepositoryConnection['pageInfo'];
export type Edges = StarredMyRepositoryConnection['edges'];

// TODO: 一旦Node型を取り出す、綺麗にしたい
type PopArray<T> = T extends unknown[] ? T : never;
type RemoveNull<T> = T extends null ? never : T;
type Tmp = PopArray<Edges>;
export type Node = RemoveNull<RemoveNull<Tmp[0]>>['node'];

// StarredMyRepositoryConnectionのNodeをStarredNode型に置き換えたStarredMyRepositoryConnection型をつくる
// TODO: いい感じにできる型定義方法を知りたい
type NodeState = {
  errorMessages?: ErrorMessage[];
  isClicked?: boolean;
};

// see: https://github.com/Microsoft/TypeScript/issues/3402#issuecomment-385975990
type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};

// StarredMyRepositoryConnectionのNodeをStarredNodeに置換する
export interface StarredMyRepositoryEdge
  extends Weaken<RemoveNull<Tmp[0]>, 'node'> {
  node: Node & NodeState;
}

// StarredMyRepositoriesQueryのedegesを復元
export interface StarredMyRepositoryConnectionWithNodeState
  extends Weaken<StarredMyRepositoryConnection, 'edges'> {
  edges?: Maybe<Array<Maybe<StarredMyRepositoryEdge>>>;
}
