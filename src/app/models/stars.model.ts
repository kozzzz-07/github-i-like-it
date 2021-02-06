import { StarredMyRepositoriesQuery } from './graphql';

export type StarredMyRepositoryConnection = StarredMyRepositoriesQuery['viewer']['starredRepositories'];
export type PageInfo = StarredMyRepositoryConnection['pageInfo'];
export type Edges = StarredMyRepositoryConnection['edges'];

// TODO: 一旦Node型を取り出す、綺麗にしたい
type PopArray<T> = T extends unknown[] ? T : never;
type RemoveNull<T> = T extends null ? never : T;
type Tmp = PopArray<Edges>;
export type Node = RemoveNull<Tmp[0]>['node'];
