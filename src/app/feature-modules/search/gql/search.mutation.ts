import { gql } from '@apollo/client/core';

export const ADD_STAR = gql`
  mutation addSearchStar($input: AddStarInput!) {
    addStar(input: $input) {
      clientMutationId
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation removeSearchStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      clientMutationId
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;
