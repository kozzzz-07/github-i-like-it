import { StarredMyRepositoriesQuery } from './graphql';

export type StarredMyRepositoryConnection = StarredMyRepositoriesQuery['viewer']['starredRepositories'];
export type PageInfo = StarredMyRepositoryConnection['pageInfo'];
export type Edge = StarredMyRepositoryConnection['edges'];
