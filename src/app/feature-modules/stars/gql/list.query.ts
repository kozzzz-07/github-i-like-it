import { gql } from '@apollo/client/core';

export const STARRED_REPOSITORIES = gql`
  {
    viewer {
      login
      starredRepositories {
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
