import { gql } from '@apollo/client/core';

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $query: String
  ) {
    search(
      first: $first
      after: $after
      last: $last
      before: $before
      query: $query
      type: REPOSITORY
    ) {
      codeCount
      issueCount
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            nameWithOwner
            createdAt
            updatedAt
            pushedAt
            stargazerCount
            openGraphImageUrl
            forkCount
            viewerHasStarred
            issues {
              totalCount
            }
            watchers {
              totalCount
            }
            primaryLanguage {
              name
              color
            }
            url
            description
            licenseInfo {
              name
              nickname
            }
          }
        }
      }
    }
  }
`;
