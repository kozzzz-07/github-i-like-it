import { gql } from 'apollo-angular';

export const ME = gql`
  query {
    viewer {
      login
    }
  }
`;
