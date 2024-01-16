import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($payload: LoginInput) {
    login(payload: $payload) {
      user {
        _id
        username
        password
        email
        birthdate
        address
        status
        commorbidity
        childs {
          _id
          username
          birthdate
          address
          commorbidity
          userId
        }
      }
      token
    }
  }
`;
