import { ErrorMessage } from '../shared/components/collapsible-error-area/collapsible-error-area.component';
import { Maybe, StarredMyRepositoriesQuery } from './graphql';
import { PopArray, RemoveNull, Weaken } from './util';

export type StarredMyRepositoryConnection = StarredMyRepositoriesQuery['viewer']['starredRepositories'];
export type PageInfo = StarredMyRepositoryConnection['pageInfo'];
export type Edges = StarredMyRepositoryConnection['edges'];

// TODO: 一旦Node型を取り出す、綺麗にしたい
type Tmp = PopArray<Edges>;
export type Node = RemoveNull<Tmp[0]>['node'];

// StarredMyRepositoryConnectionのNodeをStarredNode型に置き換えたStarredMyRepositoryConnection型をつくる
// TODO: いい感じにできる型定義方法を知りたい
type NodeState = {
  errorMessages?: ErrorMessage[];
  addable?: boolean; // 自前でボタンの状態を管理してみるパターンを試す
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
