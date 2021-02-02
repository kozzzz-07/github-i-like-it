import { gql } from '@apollo/client/core';

export const STARRED_REPOSITORIES = gql`
  query($first: Int, $after: String, $last: Int, $before: String) {
    viewer {
      id
      login
      starredRepositories(
        first: $first
        after: $after
        last: $last
        before: $before
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          cursor
          node {
            id
            name
            nameWithOwner
            createdAt
            updatedAt
            pushedAt
            stargazerCount
            openGraphImageUrl
            forkCount
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
            repositoryTopics(first: 10) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
          starredAt
        }
      }
    }
  }
`;
