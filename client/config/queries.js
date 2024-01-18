import { gql } from "@apollo/client";

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

export const GETSERVICES = gql`
    query Query {
        services {
            _id
            title
            description
            price
            clinic
        }
    }
`;

export const REGISTER = gql`
    mutation Mutation($payload: RegisterInput) {
        register(payload: $payload) {
            _id
            username
            password
            email
            birthdate
            weight
            height
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
    }
`;

export const ADDFAMILY = gql`
    mutation Mutation($payload: ChildInput) {
        createChild(payload: $payload) {
            _id
            username
            birthdate
            address
            commorbidity
            userId
        }
    }
`;
