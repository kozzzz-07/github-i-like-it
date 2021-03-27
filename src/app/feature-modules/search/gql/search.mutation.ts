import { gql } from '@apollo/client/core';

export const ADD_STAR = gql`
  mutation addStar($input: AddStarInput!) {
    addStar(input: $input) {
      clientMutationId
      starrable {
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation removeStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      clientMutationId
      starrable {
        viewerHasStarred
      }
    }
  }
`;
