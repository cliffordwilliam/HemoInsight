import { gql } from "@apollo/client";

export const MAIL = gql`
  mutation Mail($payload: MailInput) {
    mail(payload: $payload)
  }
`;

export const LOGIN = gql`
  mutation Mutation($payload: LoginInput) {
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

export const CREATE_INTENT = gql`
  mutation CreateIntent($payload: IntentInput) {
    createIntent(payload: $payload) {
      paymentIntent
    }
  }
`;
